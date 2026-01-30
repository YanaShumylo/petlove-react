import { useState } from 'react';
// import ModalApproveAction from '../modals/ModalApproveAction/ModalApproveAction';
import css from "./LogOutBtn.module.css";

export default function LogOutBtn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={css.LogOutBtn}>Logout</button>
      {/* {open && <ModalApproveAction onClose={() => setOpen(false)} />} */}
    </>
  );
}