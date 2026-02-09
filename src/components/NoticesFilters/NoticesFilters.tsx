// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { AxiosError } from 'axios';
// import toast from 'react-hot-toast';

// interface NoticesFormValues {

// }

// const validationSchema = Yup.object({
// keyword: Yup.string()
//     .min(3, 'Keyword must be at least 3 characters')
//     .max(48, 'Keyword a long')
//         .required('Keywordis required'),
// });
    
// export default function NoticesFilters() {
//     return (
//     <form
//       className={css.form}
//       onSubmit={handleSubmit(onSubmit)}
//       noValidate
//       autoComplete="off"
//     >
  
//         <div className={css.inputWrapper}>
//           <input
//             type="text"
//             placeholder="keyword" value={keyword}

//           />
//         </div>
//             <p className={css.error}>{errors.name?.message}</p>
            
            
//       </form>