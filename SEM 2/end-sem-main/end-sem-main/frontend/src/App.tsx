import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/pages/Signin";
import { Signup } from "./components/pages/Signup";
import AllBlogs from "./components/pages/Home";
import CreateBlog from "./components/pages/CreateBlog";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />        
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<AllBlogs/>} />
        <Route path="/create" element={<CreateBlog/>} />

        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
