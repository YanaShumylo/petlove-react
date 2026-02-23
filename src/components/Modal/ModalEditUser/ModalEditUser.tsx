import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { userApi } from '../../../api/userApi';
import Modal from '../Modal/Modal';
import type { FullUser } from '../../../types/user';
import { useState, useEffect } from 'react';
import { uploadAvatarToCloudinary } from '../../../utils/cloudinary';
import css from './ModalEditUser.module.css';

interface ModalEditUserProps {
  onClose: () => void;
}

interface ModalEditUserFormValues {
  name: string;
  email: string;
  phone: string;
}

const schemaModalEditUser: Yup.ObjectSchema<ModalEditUserFormValues> = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email'
    ),
  phone: Yup.string()
    .required()
    .matches(/^\+38\d{10}$/, 'Phone must be in format +380XXXXXXXXX'),
});

export default function ModalEditUser({ onClose }: ModalEditUserProps) {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<FullUser>(['currentUser']);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    currentUser?.avatar ?? null
  );
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModalEditUserFormValues>({
    resolver: yupResolver(schemaModalEditUser),
    mode: 'onBlur',
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
      phone: currentUser?.phone ?? '',
    },    
  });

const mutation = useMutation<
  FullUser,
  AxiosError<{ message?: string }>,
  Partial<FullUser>
>({
  mutationFn: (data) => userApi.updateCurrent(data),
  onSuccess: (updatedUser) => {
    queryClient.setQueryData(['currentUser'], updatedUser);  
    toast.success('Profile updated successfully');
    onClose();
  },
  onError: (error) => {
    toast.error(error.response?.data?.message || 'Update failed');
  },
});  

  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setSelectedFile(file);

  const objectUrl = URL.createObjectURL(file);
  setPreview(objectUrl);
};

  const onSubmit = async (data: ModalEditUserFormValues) => {
  try {
  const filteredData:  Partial<FullUser> = {};

  if (data.name) filteredData.name = data.name;
  if (data.email) filteredData.email = data.email;
  if (data.phone) filteredData.phone = data.phone;
    
  if (selectedFile) {
        setIsUploading(true);
      const avatarUrl = await uploadAvatarToCloudinary(selectedFile);
      filteredData.avatar = avatarUrl;
      setIsUploading(false);
    }

    mutation.mutate(filteredData);
  } catch {
      setIsUploading(false);
      toast.error('Image upload failed');
    }
  };

  return (
    <Modal onClose={onClose}>

      <div className={css.wrapperModal}>
        <h4 className={css.title}>Edit information</h4>

     <div className={css.avatarWrapper}>
  {preview  ? (
    <img
      src={preview }
      alt="Avatar"
      className={css.avatar}
    />
  ) : (
    <div className={css.avatarPlaceholder}>
      <svg width="94" height="94">
        <use href="/svg-sprite.svg#icon-user"  />
      </svg>
    </div>
          )}
        </div>
        
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrapper}>
          <div className={css.fileUploadWrapper}>
            <input type="text" readOnly value={selectedFile?.name || ''} placeholder="Enter URL" className={css.input}/>
    
            <label className={css.uploadButton}>
            <input type="file" accept="image/*" onChange={handleFileChange} className={css.hiddenFileInput}/> Upload photo
              <svg width="16" height="16">
              <use href="/svg-sprite.svg#icon-cloud" />
              </svg>
            </label>
          </div>
          </div>          

          <div className={css.inputWrapper}>
            <input {...register('name')} className={css.input} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.inputWrapper}>
            <input {...register('email')} className={css.input} />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>

          <div className={css.inputWrapper}>
            <input {...register('phone')} className={css.input}  />
            {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || isUploading}
            className={css.submitButton}
          >
            {mutation.isPending  || isUploading ? 'Saving...' : 'Go to profile'}
          </button>
        </form>
      </div>
    </Modal>
  );
}