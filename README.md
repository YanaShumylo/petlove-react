# 🐾 PetLove
A web app for browsing pet notices, managing favorites, and adding pets to your profile.

## ⚡ Features
- Browse pet notices with filters by category, type, gender, location, popularity, and price.
- Search by keyword.
- Add/remove notices to/from favorites (authorized users).
- Server-side pagination.
- Registration & login with protected routes.
- Manage user profile and pets.
- Upload pet photos via Cloudinary.
- Toast notifications for success/errors.

## 📂 Project Structure
- **Pages:** Home, News, Notices, Our Friends, Registration, Login, Profile, Add Pet  
- **Components:** Header, Nav/AuthNav/UserNav, UserBar, Loader, SearchField, Pagination, PetBlock, AddPetForm, UserCard, PetsList, MyNotices  
- **Modals:** ModalNotice, ModalAttention, ModalEditUser, ModalApproveAction  


## 🛠 Tech Stack
**Frontend:** React, TypeScript, CSS Modules  
**State & Data:** React Query, React Hook Form, Yup  
**Other:** React Router, react-hot-toast, react-select, Cloudinary, modern-normalize


## 🚀 Installation

1. Clone the repository:
```bash
git clone <SSH code>

2. Go to the project folder:
cd petlove/

3. Install dependencies:
npm install

4. Run the local server:
npm run dev

🔑 Environment Variables
To run this project, you will need to add the following environment variables to your .env file
VITE_API_BASE_URL=URL
VITE_CLOUDINARY_CLOUD_NAME=CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET=UPLOAD_PRESET
VITE_CLOUDINARY_API_KEY=YOUR_API_KEY_HERE
VITE_CLOUDINARY_SECRET=YOUR_API_SECRET_HERE

📄 Technical Specificatio 
https://petlove.b.goit.study/api-docs/ 

## 🎨 Design
[Figma Prototype](https://www.figma.com/file/puMNfZVg4YI8UZoJ1QiLLi/Petl%F0%9F%92%9Bve?type=design&node-id=55838-750&mode=design&t=Xg1IwIcKebTl5xGs-0)