import type { New } from "../../types/new";
import NewsItem from "../../components/NewsItem/NewsItem";
import css from "./NewsList.module.css";

interface NewListProps{
    items: New[];
}

export default function NewsList({ items }: NewListProps) {
    return (
        <ul className={css.wrapper}>
            {items.map((item) => (
                <NewsItem key={item._id} item={item}/>
            )
            )
            }
        </ul>
    );
}