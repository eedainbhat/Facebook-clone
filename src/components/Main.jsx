import MainFeed from "./MainFeed";
import Sidebar from "./Sidebar";
import FollowSugg from "./FollowSugg";
import { useContext } from "react";
import { MyContext } from "../store/Store";
import InitialLoader from "./InitialLoader";

const Main = () => {
  const { isFetching } = useContext(MyContext);
  return (
    <div className="flex justify-between items-start">
      <Sidebar />
      {isFetching ? (
        <div className="flex flex-col">
          <InitialLoader />
          <InitialLoader />
        </div>
      ) : (
        <MainFeed />
      )}
      <FollowSugg />
    </div>
  );
};

export default Main;
