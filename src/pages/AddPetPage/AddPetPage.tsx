import PetBlock from "../../components/PetBlock/PetBlock";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import css from "./AddPetPage.module.css";

export default function AddPetPage() {
    
    return (
        <section className={css.addPetPage}>
            <PetBlock
  variant="auth"
  alt="Image a cat"
  className={css.image}
  images={{
    mobile: "/dog.webp",
    tablet: "/dog@2x.webp",
    desktop: "/dog@3x.webp",
        }} />
            <AddPetForm/>
        </section>)
}