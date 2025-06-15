import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreatePostPage from "./pages/CreatePostPage";
import LogoutButton from "./components/LogoutButton";
import PostsHome from "./pages/PostsHome";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={'/posts'} />} />
        <Route path="/posts" element={<PostsHome />} />
        <Route path="/create-post/:id?" element={<CreatePostPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
