import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import type { NoticeDetails } from "../../../types/notices";
import { addFavorite, removeFavorite } from "../../../api/noticesApi";
import { useAuth } from "../../../hooks/useAuth";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import css from "./ModalNotice.module.css";

interface Props {
  item: NoticeDetails;
  onClose: () => void;
}

export default function ModalNotice({ item, onClose }: Props) {
  const { isAuthenticated } = useAuth();
  const { data: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const isFavoriteInitially =
    currentUser?.noticesFavorites.some((notice) => notice._id === item._id) ?? false;

  const [favoriteState, setFavoriteState] = useState(isFavoriteInitially);

  const favoriteMutation = useMutation({
    mutationFn: (isFavorite: boolean) =>
      isFavorite ? addFavorite(item._id) : removeFavorite(item._id),
    onSuccess: (_, isFavorite) => {
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success(isFavorite ? "Added to favorites!" : "Removed from favorites");
    },
    onError: () => {
      setFavoriteState((prev) => !prev);
      toast.error("Failed to update favorite");
    },
  });

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to favorite");
      return;
    }
    const newState = !favoriteState;
    setFavoriteState(newState);
    favoriteMutation.mutate(newState);
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>

        <p className={css.category}>{item.category}</p>

        <img src={item.imgURL} alt={item.title} className={css.image} />
        <h3 className={css.title}>{item.title}</h3>

        <div className={css.popularityWrapper}>
          <svg width="24" height="24">
            <use href="/svg-sprite.svg#icon-star" />
          </svg>
          <p className={css.popularity}>{item.popularity ?? 0}</p>
        </div>

        <div className={css.wrapperInfo}>
        <div className={css.wrapperValue}>
        <span className={css.label}>Name</span>
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
        </div>
 
        <p className={css.comment}>{item.comment}</p>
        <p className={css.price}>${item.price}</p>

        <div className={css.buttons}>
          {isAuthenticated && (
            <button className={css.buttonAdd} type="button" onClick={handleFavoriteClick}>
              {favoriteState ? " Remove" : " Add to"}
              <svg width="24" height="24">
                <use
                  href={
                    favoriteState
                      ? "/svg-sprite.svg#icon-heart-hover"
                      : "/svg-sprite.svg#icon-heart-normal"
                  }
                />
              </svg>
              
            </button>
          )}

          <a href={`tel:${item.user.phone}`} className={css.buttonContact}>
            Contact
          </a>
        </div>
      </div>
    </Modal>
  );
}
