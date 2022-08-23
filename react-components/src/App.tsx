import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Tab from "./components/Tab/Tab";
import Toggle from "./components/Toggle/Toggle";
import menuList from "./data/menuList";

function App() {
  return (
    <div className="App">
      <div className="nav__container">
        <ul>
          {menuList.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
      <div className="main__container">
        <div className="main__content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Toggle />} />
              <Route path="tab" element={<Tab />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
