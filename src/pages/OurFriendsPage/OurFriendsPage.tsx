import { useQuery } from "@tanstack/react-query";
import FriendsList from "../../components/FriendsList/FriendsList";
import Title from "../../components/Title/Title";
import { getFriends } from "../../api/friendsApi";
import css from "./OurFriendsPage.module.css";

export default function OurFriendsPage() {
    
    const { data } = useQuery({
        queryKey: ["friends"],
        queryFn: () => getFriends(),
        placeholderData: (prev) => prev,
    });

    return (
        <section className={css.OurFriendsPage}>
            <Title title="Our friends" className={css.titleOurFriendsPage} />

            {data && data.length > 0 && <FriendsList items={data} />}
        </section>);
};