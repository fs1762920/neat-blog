import Login from "@/views/Login";
import Home from "@/views/Home";
import Admin from "@/views/Admin";
import NotFound from "@/views/NotFound";
import Index from "@/components/portal/Index";
import Category from "@/components/portal/Category";
import Archives from "@/components/portal/Archives";
import About from "@/components/portal/About";
import Article from "@/components/portal/Article";
import ADashboard from "@/components/admin/Dashboard";
import AAList from "@/components/admin/Article/AList";
import AAWrite from "@/components/admin/Article/AWrite";
import ACategory from "@/components/admin/Category";
import APerson from "@/components/admin/Person";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function index() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/index" element={<Index />} />
          <Route path="/category" element={<Category />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/about" element={<About />} />
          <Route path="/article" element={<Article />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<ADashboard />} />
          <Route path="/admin/article/list" element={<AAList />} />
          <Route path="/admin/article/write" element={<AAWrite />} />
          <Route path="/admin/category" element={<ACategory />} />
          <Route path="/admin/person" element={<APerson />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default index;
