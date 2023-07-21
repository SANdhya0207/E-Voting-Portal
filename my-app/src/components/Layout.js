import React from 'react'
import { Helmet } from "react-helmet"
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main >
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
};

Layout.defaultProps = {
  title: "Voting Portal",
  description: "Mern Stack Project",
  keywords: "ReactJs, NodeJs, MongoDB, HTML",
  author: "Sandhya"
};

export default Layout