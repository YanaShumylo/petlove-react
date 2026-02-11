import { useState } from 'react';
import ModalEditUser from '../../Modal/ModalEditUser/ModalEditUser';
import css from './EditUserBtn.module.css';

export default function EditUserBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.EditUserBtn}>
      <button className={css.editBtn} onClick={() => setIsOpen(true)}>User
         <svg className={css.icon}  width="18" height="18">
          <use href="/svg-sprite.svg#icon-avatar" />
        </svg>        
      </button>


        <svg className={css.iconPen} onClick={() => setIsOpen(true)} width="18" height="18">
          <use href="/svg-sprite.svg#icon-pen" />
        </svg>
      {isOpen && <ModalEditUser onClose={() => setIsOpen(false)} />}
    </div>
  );
}
