import UserCard from '../../components/Profile/UserCard/UserCard';
import MyNotices from '../../components/Profile/MyNotices/MyNotices';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
        return (
        <section className={css.profilePage}>
            <UserCard/>
            <MyNotices />
        </section>);
}