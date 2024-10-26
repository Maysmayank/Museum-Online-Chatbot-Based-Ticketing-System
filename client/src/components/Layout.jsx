import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { Toaster } from './ui/toaster';

const Layout = () => {
  return (
    <>
      <Toaster/>
      <ScrollToTop/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default Layout;