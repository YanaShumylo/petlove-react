import { useState, useMemo } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import NoticesItem from "../../NoticesItem/NoticesItem";
import type { NoticeListItem } from "../../../types/notices";
import css from "./MyNotices.module.css";

export default function MyNotices() {
  const { data: currentUser, isLoading, isError } = useCurrentUser();

  const [tab, setTab] = useState<"favorites" | "viewed">("favorites");

 const data = useMemo(() => {
  const favorites = currentUser?.noticesFavorites ?? [];
  const viewed = currentUser?.noticesViewed ?? [];
  return tab === "favorites" ? favorites : viewed;
}, [tab, currentUser]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <section className={css.myNotices}>
      <div className={css.tabs}>
        <button
          className={tab === "favorites" ? css.active : ""}
          onClick={() => setTab("favorites")}
        >
          My favorite pets
        </button>

        <button
          className={tab === "viewed" ? css.active : ""}
          onClick={() => setTab("viewed")}
        >
          Viewed
        </button>
      </div>

      {!data.length && (
        <p>
          {tab === "favorites"
            ? "No favorite notices yet"
            : "No viewed notices yet"}
        </p>
      )}

      <ul>
        {data.map((notice) => (
          <NoticesItem
            key={notice._id}
            item={notice as NoticeListItem}
            canDelete={tab === "favorites"}
          />
        ))}
      </ul>
    </section>
  );
}
