import { useState, useMemo } from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import NoticesItem from "../../NoticesItem/NoticesItem";
import type { NoticeListItem } from "../../../types/notices";
import css from "./MyNotices.module.css";

export default function MyNotices() {
    const { data: currentUser } = useCurrentUser();

    const [tab, setTab] = useState<"favorites" | "viewed">("favorites");
    const uniqueData = useMemo(() => {
    const favorites = currentUser?.noticesFavorites ?? [];
    const viewed = currentUser?.noticesViewed ?? [];
    const selected = tab === "favorites" ? favorites : viewed;

    // видалення дубліката  по _id
    const unique = Array.from(
      new Map(selected.map((n) => [n._id, n])).values()
    );

    return unique;}, [tab, currentUser]);
  
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

      {!uniqueData.length && (
        <p className={css.text}>
      {tab === "favorites" ? (
      <>
      Oops, <span className={css.textSpan}> looks like there aren't any furries</span> on our adorable page yet. Do not worry! View your pets on the
      "find your favorite pet" page and add them to your favorites.
      </>
      ) : (
      "No viewed notices yet"
      )}
     </p>
      )}

      <ul className={css.notiecList}>
        {uniqueData.map((notice) => (
          <NoticesItem
            key={notice._id}
            item={notice as NoticeListItem}
            mode={tab === "favorites" ? "favorites" : "viewed" }
          />
        ))}
      </ul>
    </section>
  );
}
