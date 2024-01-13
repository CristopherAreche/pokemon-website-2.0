import { Route, useLocation, Routes } from "react-router-dom";
import { Home, LandingPage, Detail, Form } from "./views";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const location = useLocation();
  return (
    <div className="bg-wallpaper bg-no-repeat bg-cover">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create" element={<Form />} />
        <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
