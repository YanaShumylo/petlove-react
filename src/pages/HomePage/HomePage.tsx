import css from "./HomePage.module.css";

export default function HomePage() {
    
    return (
         <section className={css.home}>
            <div className={css.wrapper}>
            <h1 className={css.title} >Take good <span className={css.textSpan}>care</span> of your small pets</h1>
            <p className={css.text}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
            </div>
            <picture>
                <source media="(min-width: 1280px)" srcSet="/home@3x.webp"/>
                <source media="(min-width: 768px)" srcSet="/home@2x.webp"/>
                <img className={css.image} src="/home.webp" alt="Image a young woman with a dog" loading="lazy"/>
            </picture>
        </section>)
}