import React from 'react';
import './error-indicator.scss';

const ErrorIndicator = ({ error }) => {
  return <div className="error-indicator">
    <div className="error-indicator__oops">Oops!</div>
    <div className="error-indicator__message">
      {error.message}
    </div>
    <div className="error-indicator__adm">
      Please try to reload or check your network!
    </div>
  </div>;
};

export default ErrorIndicator;