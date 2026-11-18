## 🌐 Live link

**Live Website:** https://zap-shift-32803.web.app/

**Backend API:** https://zap-shift-server-rouge.vercel.app/

# Zap-Shift 🚚

**Zap-Shift** is a modern and user-friendly parcel delivery management platform designed to make parcel booking, delivery tracking, and rider management easier and more efficient.

The platform provides separate dashboards for users, riders, and administrators to manage the complete parcel delivery process.

## 🌟 Features

- **User Authentication:** Secure login and registration using Firebase Authentication.
- **Google Login:** Sign in easily using a Google account.
- **Parcel Booking:** Create and submit parcel delivery requests.
- **Parcel Tracking:** Track parcel delivery status using a unique tracking ID.
- **Payment Integration:** Secure online payments using Stripe.
- **Payment History:** View previous payment transactions.
- **User Dashboard:** Manage parcels, payments, and personal information.
- **Admin Dashboard:** Manage users, riders, parcels, and delivery operations.
- **Rider Dashboard:** View assigned deliveries and update delivery statuses.
- **Responsive Design:** Fully responsive interface for desktop, tablet, and mobile devices.
- **Interactive UI:** Smooth animations, loading states, and notifications.

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- DaisyUI
- React Icons
- TanStack Query
- Axios
- React Hook Form
- SweetAlert2
- React Toastify
- Recharts
- React Fast Marquee

### Authentication & Payment
- Firebase Authentication
- Stripe

### Backend & Database
- Node.js
- Express.js
- MongoDB

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd zap-shift-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id

VITE_API_URL=your_backend_api_url
```

**Note:** Replace the placeholder values with your actual Firebase configuration and deployed backend URL. Never commit sensitive credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### 6. Build for production

```bash
npm run build
```

## 🌐 Deployment

The frontend is deployed using **Firebase Hosting**.

To deploy the application:

```bash
npm run build
firebase deploy --only hosting
```

## 📁 Project Structure

```text
zap-shift-client/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── firebase/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🔗 Related Repository

- **Backend Repository:** [Zap-Shift Server](https://github.com/dev-muradhasan/zap-shift-server)

## 👨‍💻 Author

**Murad Hasan**

- GitHub: [Your GitHub Profile](https://github.com/dev-muradhasan)

---

⭐ If you like this project, don't forget to give it a star!