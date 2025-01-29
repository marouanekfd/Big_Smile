import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className={`animated slideInDown ${scrolled ? 'scrolled' : ''}`} style={{ animationDelay: '1.0s' }}>
      <table>
        <tr>
          <Link id="logo" to="/" >BigSmile</Link>
          <td id="navigation">
            <Link to="/work">Projets</Link>
            <Link to="/bio">Partenaires</Link>
            <Link to="/contact">Qui sommes nous</Link>
            <Link to="/support">Nous soutenir</Link>
          </td>
        </tr>
      </table>
    </header>
  );
};

export default Header;