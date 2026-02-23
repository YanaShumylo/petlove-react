import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addPet } from "../../api/petsApi";
import type { Pet } from "../../types/pet";
import type { FullUser } from "../../types/user";
import { USER_QUERY_KEY } from "../../hooks/useCurrentUser";
import css from "./AddPetForm.module.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { uploadAvatarToCloudinary } from "../../utils/cloudinary";

export interface AddPetFormValues {
  name: string;
  title: string;
  species: string;
  birthday: string;
  sex: string;
}

const schemaAddPetForm = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be YYYY-MM-DD"),
  sex: Yup.string().required("Sex is required"),
});

const defaultValues: AddPetFormValues = {
  name: "",
  title: "",
  species: "",
  birthday: "",
  sex: "",
};

export default function AddPetForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
   useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddPetFormValues>({
    resolver: yupResolver(schemaAddPetForm),
    defaultValues,
    mode: "onBlur",
  });

  const mutation = useMutation<FullUser, Error, Pet>({
    mutationFn: addPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to add pet");
    },
  });

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreview(objectUrl);
  };

  const onSubmit = async (data: AddPetFormValues) => {
  try {
      if (!selectedFile) {
        toast.error("Please upload a photo");
        return;
      }

      setIsUploading(true);
      const imageUrl = await uploadAvatarToCloudinary(selectedFile);
      setIsUploading(false);

      mutation.mutate({
        ...data,
        imgURL: imageUrl,
      } as Pet);
    } catch {
      setIsUploading(false);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className={css.wrapperAddPetForm}>
      <div className={css.wrapperTitleText}>
        <h2 className={css.title}>Add my pet /</h2>
        <p className={css.text}>Personal details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

        <div className={css.sex}>
          <label className={css.sexItem}>
            <input type="radio" value="female" {...register("sex")} />
            <span className={css.iconFemale}>
              <svg width="40" height="40">
                <use href="/svg-sprite.svg#icon-female" />
              </svg>
            </span>
          </label>

          <label className={css.sexItem}>
            <input type="radio" value="male" {...register("sex")} />
            <span className={css.iconMale}>
              <svg width="40" height="40">
                <use href="/svg-sprite.svg#icon-male" />
              </svg>
            </span>
          </label>

          <label className={css.sexItem}>
            <input type="radio" value="unknown" {...register("sex")} />
            <span className={css.iconUnknown}>
              <svg width="40" height="40">
                <use href="/svg-sprite.svg#icon-health" />
              </svg>
            </span>
          </label>
        </div>
        {errors.sex && <p className={css.error}>{errors.sex.message}</p>}


        <div className={css.avatarWrapper}>
          {preview ? (
            <img src={preview} alt="Pet avatar" className={css.avatar} />
          ) : (
            <div className={css.avatarPlaceholder}>
              <svg width="50" height="50">
                <use href="/svg-sprite.svg#icon-lapka" />
              </svg>
            </div>
          )}

          <div className={css.wrapperInfo}>
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
              <input
                className={css.input}
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <p className={css.error}>{errors.title.message}</p>
              )}
            </div>

            <div className={css.inputWrapper}>
              <input
                className={css.input}
                placeholder="Pet's Name"
                {...register("name")}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.row}>
              <div className={css.inputWrapper}>
               <Controller
                control={control} name="birthday" render={({ field }) => (
              <DatePicker selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {field.onChange(date ? date.toISOString().split("T")[0] : "");
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="00.00.0000"
              className={css.input}
              popperClassName={css.datePickerPopper}
              calendarClassName={css.datePickerCalendar}
                    />                    
                  )}                  
                />    
                 <svg width="20" height="20" className={css.calendarIcon}>
                <use href="/svg-sprite.svg#icon-calendar" />
              </svg>
              {errors.birthday && (
                <p className={css.error}>{errors.birthday.message}</p>
              )}
              </div>

              <div className={css.inputWrapper}>
                <Select className={css.customSelect} classNamePrefix="react-select"
                options={[
                { value: "dog", label: "Dog" },
                { value: "cat", label: "Cat" },
                { value: "fish", label: "Fish" },
                { value: "bird", label: "Bird" },
                ]}
                placeholder="Type of pet" 
                onChange={(option) => {setValue("species", option?.value || "");
                }}
                />
                {errors.species && (
                  <p className={css.error}>{errors.species.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={css.buttons}>
          <button
            type="button"
            className={css.btnBack}
            onClick={() => navigate("/profile")}
          >
            Back
          </button>

          <button
            type="submit"
            className={css.btnSubmit}
            disabled={mutation.isPending  || isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
