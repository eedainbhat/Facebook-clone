import { useEffect } from "react";
import { UseUserContext } from "./context/UserContext";
import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import { getHome } from "./services/user.services";
import Loading from "./components/global/Loading";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Settings from "./pages/user/Settings";
import Profile from "./pages/user/Profile";
import AddPost from "./pages/user/AddPost";

const App = () => {
  const { user, isLoading } = UseUserContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

      <Route
        path="/sign-up"
        element={!user ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/login" />}
      />

      <Route
        path="/add-post"
        element={user ? <AddPost /> : <Navigate to="/login" />}
      />

      <Route
        path="/profile/:userId"
        element={
          user ? <Profile /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default App;
