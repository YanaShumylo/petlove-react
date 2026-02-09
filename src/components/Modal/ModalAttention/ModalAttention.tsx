import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import css from './ModalAttention.module.css';

interface Props {
  onClose: () => void;
}

export default function ModalAttention({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>
        <img src="/avatar-dog.webp" alt="Attention" className={css.image}/>
        
        <h4 className={css.title}>Attention</h4>

        <p className={css.text}>
          We would like to remind you that certain functionality is available only to authorized users.If you have an account, please log in with your credentials. If you do not already have an account, you must register to access these features.
        </p>

         <div className={css.links}>
        <Link to="/login" className={css.link} onClick={onClose} >Log In
        </Link>
                  
        <Link to="/register" className={css.link} onClick={onClose}> Registration
        </Link>
        </div>
      </div>
    </Modal>
  );
}
