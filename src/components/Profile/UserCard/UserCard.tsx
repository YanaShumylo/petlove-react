import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../../api/userApi';
import type { FullUser } from '../../../types/user';
import UserBlock from '../UserBlock/UserBlock';
import PetsBlock from '../PetsBlock/PetsBlock';
import EditUserBtn from '../EditUserBtn/EditUserBtn';
import LogOutBtn from '../../Header/LogOutBtn/LogOutBtn';
// import css from './UserCard.module.css';

export default function UserCard() {
  const { data: user } = useQuery<FullUser>({
    queryKey: ['currentUser'],
    queryFn: userApi.getCurrentFull,
  });

  if (!user) return null;

  return (
    <section >
      <EditUserBtn />
      <UserBlock user={user} />
      <PetsBlock pets={user.pets} />
      <LogOutBtn />
    </section>
  );
}
