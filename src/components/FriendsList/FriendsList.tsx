import type { Friend } from "../../types/friend";
import FriendsItem from "../FriendsItem/FriendsItem";
import css from "./FriendsList.module.css";

interface FriendListProps {
  items: Friend[];
}

export default function FriendsList({ items }: FriendListProps) {
  return (
    <ul className={css.wrapper}>
      {items.map(item => (
        <FriendsItem key={item._id} item={item} />
      ))}
    </ul>
  );
}
