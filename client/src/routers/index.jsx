import React from 'react'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Admin from '@/views/Admin'
import NotFound from '@/views/NotFound'
import Index from '@/components/portal/Index'
import Category from '@/components/portal/Category'
import Archives from '@/components/portal/Archives'
import Links from '@/components/portal/Links'
import Person from '@/components/portal/Person'
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
              <Route path="/links" element={<Links />} />
              <Route path="/person" element={<Person />} />
            </Route>
            <Route path="/admin" element={<Admin />} >
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
}

export default index