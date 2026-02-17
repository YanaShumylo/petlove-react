import { Link } from 'react-router-dom';
import css from "./Page404.module.css";

export default function Page404 () {
    return (
      <section className={css.page404}>
        <div className={css.container}>
          <img className={css.image} src="404.webp" srcSet="/404.webp 1x, /404@2x.webp 2x, /404@3x.webp 3x" alt="Image a cat" loading="lazy" />
        <p className={css.text}>Ooops! This page not found :(</p>  
        <Link to="/" className={css.homeBtn}>
      To home page
        </Link>
        </div>
    </section>)
}