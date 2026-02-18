import NavBar from "./NavBar";
import Main from "./Main";
import CreatePost from "./CreatePost";
import { MyContext } from "../store/Store";
import { useContext } from "react";
import InitialLoader from "./InitialLoader";

const App = () => {
  const { isCreating } = useContext(MyContext);

  // App.jsx
  return (
    <div className="relative min-h-screen pt-16">
      <NavBar />
      <Main />
      {isCreating && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-[2px] bg-opacity-50 flex justify-center items-center z-50">
          <CreatePost />
        </div>
      )}
    </div>
  );
};

export default App;
