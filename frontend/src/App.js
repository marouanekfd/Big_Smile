import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Magnify from './components/Magnify';
import About from './components/About';
import Work from './components/Work';
import Bio from './components/Bio';
import Footer from './components/Footer';
import Support from './components/Support';
import Home from './components/Home';


const App = () => {
  const [loading, setLoading] = useState(true);
  const [showMagnify, setShowMagnify] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1650);
  }, []);

  const magnify = (imglink) => {
    setImage(imglink);
    setShowMagnify(true);
  };

  const closemagnify = () => {
    setShowMagnify(false);
    setImage('');
  };

  return (
    <Router>
      <div className='app-container'>
        {loading && <Loading />}
        <Header />
        <div className='main-content'>
          <Magnify show={showMagnify} image={image} onClose={closemagnify} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work magnify={magnify} />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/contact" element={<About />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;