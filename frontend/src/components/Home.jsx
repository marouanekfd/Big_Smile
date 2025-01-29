import React from 'react';

const Home = () => {
  return (
    <table id="top_part">
      <tr>
        <td id="about" className="animated slideInLeft" style={{ animationDelay: '0.5s' }}>
          <h2>BIG SMILE est une organisation caritative dédiée aux actions humanitaires et sociales sur un plan nationale comme internationale. Créée et composée par des étudiant-e-s , BIG SMILE a pour vocation de sensibiliser la jeunesse sur des enjeux sociétaux et environnementaux.</h2>
          <button className="btn_one">En savoir plus</button><br />
          <table>
            <tr>
              <td className="animated zoomIn" style={{ animationDelay: '0.7s' }}><a className="social"><i className="fab fa-facebook"></i></a></td>
              <td className="animated zoomIn" style={{ animationDelay: '0.9s' }}><a className="social"><i className="fab fa-twitter"></i></a></td>
              <td className="animated zoomIn" style={{ animationDelay: '1.1s' }}><a className="social"><i className="fab fa-instagram"></i></a></td>
              <td className="animated zoomIn" style={{ animationDelay: '1.3s' }}><a className="social"><i className="fab fa-dribbble"></i></a></td>
              <td className="animated zoomIn" style={{ animationDelay: '1.5s' }}><a className="social"><i className="fab fa-medium"></i></a></td>
            </tr>
          </table>
        </td>
        <td id="rightImage" className="animated jackInTheBox" style={{ animationDelay: '0.9s' }}></td>
      </tr>
    </table>
  );
};

export default Home;