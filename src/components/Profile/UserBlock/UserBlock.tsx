import type { FullUser} from '../../../types/user';
import css from './UserBlock.module.css';

interface UserBlockProps {
  user: FullUser;
}

export default function UserBlock({ user }: UserBlockProps) {

  return (
    <div className={css.userBlock}>
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className={css.avatar}
        />
      ) : (
        <div className={css.wrapperAvatarCloud}>
          <svg className={css.uploadIcon} width="94" height="94">
            <use href="/svg-sprite.svg#icon-user" />
          </svg>
          <p className={css.uploadText}>Upload photo</p>
        </div>
      )
      } 

      <div className={css.userInfo}>
        <h4 className={css.title}>My information</h4>
        <ul className={css.userList}>
          <li className={css.userListItem}>{user.name}</li>
          <li className={css.userListItem}>{user.email}</li>
          <li className={css.userListItem}>{user.phone || 'No phone'}</li>
        </ul>
      </div>
    </div>
  );
}