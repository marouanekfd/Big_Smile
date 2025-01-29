import React, { useState } from 'react';

const Magnify = ({ show, image, onClose }) => {
  
 

  return (
    <div id="magnify" style={{ display: show ? 'flex' : 'none' }}>
      <h1 onClick={onClose}><i className="fas fa-times"></i></h1>
      <div id="img_here" style={{ background: `url('${image}') center center` }}></div>
    </div>
  );
};

export default Magnify;