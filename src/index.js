import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Blogs from './Blogs';
import Contact from './Contact';
import Registration from './components/Register';
import MyAvtorizacia from './components/Authorization ';
import Footer from './Footer';
import BlogDetails from './BlogDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <header>
        <Layout />
      </header>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/blog/get/:id" element={<BlogDetails />} />
        <Route index element={<MyAvtorizacia />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/news" element={<Navigate to="/home" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);