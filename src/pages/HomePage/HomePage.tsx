import css from "./HomePage.module.css";

export default function HomePage() {
    
    return (
         <section className={css.home}>
            <div className={css.wrapper}>
            <h1 className={css.title} >Take good <span className={css.textSpan}>care</span> of your small pets</h1>
            <p className={css.text}>Choosing a pet for your home is a choice that is meant to enrich your life with immeasurable joy and tenderness.</p>
            </div>
            <img className={css.image}src="/home.webp" srcSet="/home.webp 1x, /home@2x.webp 2x, /home@3x.webp 3x" alt="Image a young woman with a dog" loading="lazy"/>
        </section>)
}