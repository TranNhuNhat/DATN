import React from 'react';
import Containers from './Containers/Containers';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Home = () => {
  return (
    <div>
        <Header />
        <Containers/>
        <Footer/>
    </div>
  )
}

export default Home