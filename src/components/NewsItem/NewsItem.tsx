import type { New } from "../../types/new";
import css from "./NewsItem.module.css";

interface NewsItemProps{
    item: New;
}

export default function NewsItem({item} : NewsItemProps) {
    return (
        <>
                <li className={css.itemNew}>
                <img className={css.imageNew} src={item.imgUrl} alt={item.title} />
                <h3 className={css.titleNew}>{item.title}</h3>
                <p className={css.textNew}>{item.text}</p>
                <div className={css.wrapperDataLink}>
                <p className={css.dataNew}>{getDate(item.date)}</p>                
                <a className={css.linkNew} href={item.url} target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
                </li>
        </>
    )
}

function getDate(date: string): string {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");      
  const month = String(d.getMonth() + 1).padStart(2, "0"); 
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
