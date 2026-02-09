import { Routes, Route, useLocation } from 'react-router-dom';
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
// import ModalApproveAction from '../components/modals/ModalApproveAction/ModalApproveAction';
// import ModalAttention from '../components/modals/ModalAttention/ModalAttention';
// import ModalNotice from '../components/modals/ModalNotice/ModalNotice';

const AppRoutes = () => {
  const location = useLocation();
  
  const state = location.state as {
    backgroundLocation?: Location;
  };

  const backgroundLocation = state?.backgroundLocation;

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
        </Route> 
      </Routes>

      {/* Модальні вікна
      {backgroundLocation && (
      <Routes>
        <Route path="modal-approve" element={<ModalApproveAction />} />
        <Route path="modal-attention" element={<ModalAttention />} />
        <Route path="modal-notice" element={<ModalNotice />} />
        </Routes>
        )} */}
        </>
  )
};

export default AppRoutes;