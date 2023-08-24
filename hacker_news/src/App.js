import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./component/homePage/Home";
import AuthorPage from "./component/authorPage/AuthorPage";
import CommentPage from "./component/comment/CommentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/item/:id" element={<CommentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
