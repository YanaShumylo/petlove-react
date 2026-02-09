import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoticeListItem } from "../../types/notices";
// import ModalNotice from "../ModalNotice/ModalNotice";
import ModalAttention from "../Modal/ModalAttention/ModalAttention";
import { addFavorite, removeFavorite } from "../../api/noticesApi";
import { useAuth } from "../../hooks/useAuth";

interface NoticesItemProps {
  item: NoticeListItem;
}

export default function NoticesItem({ item }: NoticesItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();

  const isFavorite = user?.favorites?.includes(item._id);

  const favoriteMutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? removeFavorite(item._id)
        : addFavorite(item._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleLearnMoreClick = () => {
    if (!isAuthenticated) {
      setIsAttentionOpen(true);
      return;
    }
    setIsOpen(true);
  };

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setIsAttentionOpen(true);
      return;
    }
    favoriteMutation.mutate();
  };

  return (
    <>
      <li>
        <img src={item.imgURL} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.popularity ?? 0}</p>
        <svg width="24" height="24">
        <use href="/svg-sprite.svg#icon-star"/>
        </svg>
        <p>Name: {item.name}</p>
        <p>Birthday: {item.birthday}</p>
        <p>Sex: {item.sex}</p>
        <p>Species: {item.species}</p>
        <p>Category: {item.category}</p>
        <p>{item.comment}</p>
        <p>{item.price}</p>

        <button type="button" onClick={handleLearnMoreClick}> Learn more
        </button>

        <button type="button" onClick={handleFavoriteClick}>
          <svg width="24" height="24" >
            <use href="/svg-sprite.svg#icon-heart" />
          </svg>
        </button>
      </li>

      {isOpen && (
        <ModalNotice noticeId={item._id} onClose={() => setIsOpen(false)}/>
      )}

      {isAttentionOpen && (<ModalAttention onClose={() => setIsAttentionOpen(false)}/>
      )}
    </>
  );
}
