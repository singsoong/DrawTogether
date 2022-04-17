import React from 'react';
import '../css/EnterButton.scss';

function Button({ children }) {
  return <button className="Button">{children}</button>;
}

export default Button;