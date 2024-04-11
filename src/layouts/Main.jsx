import { Outlet, useLoaderData } from "react-router-dom";
import { fetchData } from "../Helpers";
import { Nav } from "../components/Nav";
import wave from "../assets/wave.svg";

// Loader for dashboard
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
