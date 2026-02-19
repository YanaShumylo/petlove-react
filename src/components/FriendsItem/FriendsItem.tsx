import type { Friend } from "../../types/friend";
import css from ".//FriendsItem.module.css";

interface FriendsItemProps{
    item: Friend;
}

export default function FriendsItem({ item }: FriendsItemProps) {
    const openDay = item.workDays?.find(day => day.isOpen);

    return (
        <>
            <li className={css.itemFriend}>
                <p className={css.textData}> {openDay ? `${openDay.from} - ${openDay.to}` : "Closed"}
                </p>
                <div className={css.wrapperInfoFriend}>
                    <img src={item.imageUrl} alt={item.title} />
                    <div className={css.info}>
                <h3 className={css.title}>{item.title}</h3>
                        <a href={`mailto:${item.email}`}>
                            <span className={css.label}>Email: </span>
                            <p className={css.value}>{item.email}</p>
                        </a>
                        <a href={item.addressUrl} target="_blank" rel="noopener noreferrer">
                            <span className={css.label}>Address:</span>
                            <p className={css.value}>{item.address}</p>
                        </a>
                        <a href={`tel:${item.phone}`} >
                            <span className={css.label}>Phone:</span>
                            <p className={css.value}>{item.phone}</p>
                        </a>  
                </div>
                </div>
            </li>
        </>
    )
}