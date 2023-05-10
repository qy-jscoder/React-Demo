import { Outlet } from "react-router-dom";
import bg from "../assets/img/1.jpg";

const App = () => {
  const bgStyle = {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    backgroundImage: `url(${bg})`,
  };
  return (
    <div style={bgStyle}>
      <Outlet />
    </div>
  );
};
export default App;
