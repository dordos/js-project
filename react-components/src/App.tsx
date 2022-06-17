import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Tab from './components/Tab/Tab';
import Toggle from './components/Toggle/Toggle';

function App() {
  return (
    <div className='App'>
      <div className='nav__container'>
        <ul>
          <li>Toggle</li>
          <li>Tab</li>
          <li>Input</li>
          <li>Dropdown</li>
          <li>Pagination</li>
          <li>Img Slider</li>
        </ul>
      </div>
      <div className='main__container'>
        <div className='main__content'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Toggle />} />
              <Route path='tab' element={<Tab />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
