import type { NoticeListItem  } from "../../types/notices";
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps{
    items: NoticeListItem[];
}

export default function NoticesList({ items }: NoticesListProps) {
    return (
        <ul>
            {items.map(item => (
                <NoticesItem key={item._id} item={item} />
            ))}
        </ul>
    );
}