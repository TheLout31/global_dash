import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
