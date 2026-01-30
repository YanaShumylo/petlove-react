import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
    
    return (
        <section className={css.registerPage}>
    <PetBlock
  variant="auth"
  alt="Image a cat"
  className={css.image}
  images={{
    mobile: "/register.webp",
    tablet: "/register@2x.webp",
    desktop: "/register@3x.webp",
  }}
/>
      <div className={css.wrapperRegisterPage}>
        <Title
          title="Registration"
          subtitle="Thank you for your interest in our platform."
          className={css.customTitle}
        />

        <RegistrationForm />
      </div>
    </section>
  );
};