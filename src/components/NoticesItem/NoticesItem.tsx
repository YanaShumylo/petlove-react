import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoticeListItem } from "../../types/notices";
import ModalNotice from "../Modal/ModalNotice/ModalNotice";
import ModalAttention from "../Modal/ModalAttention/ModalAttention";
import { addFavorite, removeFavorite } from "../../api/noticesApi";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { NoticeDetails } from "../../types/notices";
import toast from "react-hot-toast";
import css from "./NoticesItem.module.css";

interface NoticesItemProps {
  item: NoticeListItem;
  canDelete?: boolean;
}

export default function NoticesItem({ item }: NoticesItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useCurrentUser();
 
  const queryClient = useQueryClient();

  const isFavoriteInitially =
    currentUser?.noticesFavorites.some((notice) => notice._id === item._id) ?? false;

  const [favoriteState, setFavoriteState] = useState(isFavoriteInitially);
  
const favoriteMutation = useMutation({
  mutationFn: (isFavorite: boolean) => isFavorite ? addFavorite(item._id) : removeFavorite(item._id),
  onError: () => {
    setFavoriteState((prev) => !prev);
    toast.error("Failed to update favorite");
  },
  onSuccess: (_, isFavorite) => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      if (isFavorite) {
        toast.success("Added to favorites!");
      } else {
        toast.success("Removed from favorites");
      }
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
    const newFavoriteState = !favoriteState;
    setFavoriteState(newFavoriteState);

    favoriteMutation.mutate(newFavoriteState);
  };

  return (
    <>
      <li className={css.itemNotices}>
        <img className={css.image} src={item.imgURL} alt={item.title} />
        <div className={css.wrapperTitlePopular}>
        <h3 className={css.title}>{item.title}</h3>
        <svg width="16" height="16">
        <use href="/svg-sprite.svg#icon-star"/>
        </svg>
        <p className={css.popularity}>{item.popularity ?? 0}</p>
        </div>  

        <div className={css.wrapperInfo}>

        <div className={css.wrapperValue}>
        <span className={css.label}>Name </span>
        <p className={css.value}>{item.name}</p>
        </div>
        <div className={css.wrapperValue}>
        <span className={css.label}>Birthday</span>
        <p className={css.value}> {item.birthday}</p>
        </div>  
        <div className={css.wrapperValue}>
        <span className={css.label}>Sex</span>
        <p className={css.value}> {item.sex}</p>
        </div>  
        <div className={css.wrapperValue}>
        <span className={css.label}>Species</span>
        <p className={css.value}> {item.species}</p>
        </div>
        <div className={css.wrapperValue}>
        <span className={css.label}>Category</span>
        <p className={css.value}>{item.category}</p>
        </div>
        </div>

        <p className={css.comment}>{item.comment}</p>
        <p className={css.price}>${item.price}</p>

        <div className={css.buttons}>
        <button className={ css.buttonLearnMore} type="button" onClick={handleLearnMoreClick}> Learn more
        </button>

        <button   type="button" className={css.buttonHeart} onClick={handleFavoriteClick}>
        <svg width="46" height="46">
        <use href={
        favoriteState
          ? "/svg-sprite.svg#icon-heart-hover" : "/svg-sprite.svg#icon-heart-normal" } />
        </svg>
        </button>
        </div>
      </li>    

      {isOpen && (
        <ModalNotice item={item as NoticeDetails}onClose={() => setIsOpen(false)}/>
      )}

      {isAttentionOpen && (<ModalAttention onClose={() => setIsAttentionOpen(false)}/>
      )}
    </>
  );
}
