import { Link } from 'react-router-dom';
import css from './AddPet.module.css';

export default function AddPet() {
  return (
       <Link to="/add-pet" className={css.addPetBtn}>
      Add Pet +
      </Link>
  );
}
