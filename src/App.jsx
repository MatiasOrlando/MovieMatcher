import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Context from "./Context/Context";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./views/Favorites";
import MovieDetail from "./views/MovieDetail";
import WatchLater from "./views/WatchLater";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlater" element={<WatchLater />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
