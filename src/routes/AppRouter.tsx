import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';
import HomePage  from '../pages/HomePage/HomePage';
import NewsPage from '../pages/NewsPage/NewsPage';
import NoticesPage from '../pages/NoticesPage/NoticesPage';
import FriendsPage from '../pages/OurFriendsPage/OurFriendsPage.tsx';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AddPetPage from '../pages/AddPetPage/AddPetPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ModalApproveAction from '../components/Modal/ModalApproveAction/ModalApproveAction.tsx';
import ModalAttention from '../components/Modal/ModalAttention/ModalAttention';
import ModalNotice from '../components/Modal/ModalNotice/ModalNotice';
import ModalEditUser from '../components/Modal/ModalEditUser/ModalEditUser.tsx';
import Page404 from '../pages/Page404/Page404';
import type { NoticeDetails } from '../types/notices';

const AppRoutes = () => {
  const location = useLocation();
  
  const state = location.state as {
    backgroundLocation?: Location;
    item?: NoticeDetails;
  };

  const backgroundLocation = state?.backgroundLocation;

  const navigate = useNavigate();

const handleClose = () => {
  navigate(-1);
};

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="friends" element={<FriendsPage />} />

          <Route path="register" element={
            <PublicRoute restricted>
              <RegisterPage />
            </PublicRoute>
          }/>
          <Route path="login" element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          }/>
          <Route path="profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }/>
          <Route path="add-pet" element={
            <PrivateRoute>
              <AddPetPage />
            </PrivateRoute>
          }/>
         <Route path="*" element={<Page404 />} />
         </Route>
      </Routes>

      {backgroundLocation && (
      <Routes>
        <Route path="modal-approve" element={<ModalApproveAction onClose={handleClose} />} />
        <Route path="modal-attention" element={<ModalAttention onClose={handleClose} />} />
        <Route path="modal-notice" element={ state?.item ? (<ModalNotice onClose={handleClose} item={state.item}/> ) : null} />
        <Route path="modal-edit" element={<ModalEditUser onClose={handleClose} />} />
        </Routes>
        )}
        </>
  )
};

export default AppRoutes;