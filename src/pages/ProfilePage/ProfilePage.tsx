import UserCard from '../../components/Profile/UserCard/UserCard';
import MyNotices from '../../components/Profile/MyNotices/MyNotices';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
        return (
            <section className={css.profilePage}>
                <div className={css.container}>
            <UserCard/>
            <MyNotices />
                </div>
        </section>);
}