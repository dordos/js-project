import React, { useState } from 'react';
import './Toggle.scss';

const Toggle = () => {
  let [state, setState] = useState(false);

  return (
    <div className={`toggle__container ${state ? 'ON' : 'OFF'}`}>
      <button
        onClick={() => {
          setState((state) => !state);










        }}
      ></button>
    </div>
  );
};

export default Toggle;
