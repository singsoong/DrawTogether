import React from 'react';
import '../css/Button.scss';

function Button({ children }) {
  return <button className="Button">{children}</button>;
}

export default Button;