import React from 'react';
import './spinner.scss';

const Spinner =  () => {
  return <div className="loader-container">
    <div className="loader-one loader-part"></div>
    <div className="loader-two loader-part"></div>
    <div className="loader-three loader-part"></div>
  </div>
};

export default Spinner; 