import type { NoticeListItem  } from "../../types/notices";
import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./NoticesList.module.css";

interface NoticesListProps{
    items: NoticeListItem[];
}

export default function NoticesList({ items }: NoticesListProps) {
    return (
        <ul className={css.wrapper}>
            {items.map(item => (
                <NoticesItem key={item._id} item={item} />
            ))}
        </ul>
    );
}