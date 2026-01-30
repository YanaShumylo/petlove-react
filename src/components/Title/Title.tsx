import css from "./Title.module.css";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;  
}

export default function Title({ title, subtitle, className }: TitleProps) {
  return (
    <div className={`${css.wraperTitle} ${className ?? ''}`}>
      <h2 className={css.title}>{title}</h2>
      {subtitle && <p className={css.subtitle}>{subtitle}</p>}
    </div>
  );
}