import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
    
    return (
        <section className={css.loginPage}>
            <PetBlock
                variant="auth" alt="Image a dog" className={css.image}
                images={{
                    mobile: "/login.webp",
                    tablet: "/login@2x.webp",
                    desktop: "/login@3x.webp",
                }} />
            <div className={css.wrapperLoginPage}>
                <Title
                    title="Log in"
                    subtitle="Welcome! Please enter your credentials to login to the platform:"
                    className={css.customTitle} />
            <LoginForm />
            </div>
        </section>);
};