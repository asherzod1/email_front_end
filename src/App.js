import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import PrivateRouter from "./pages/PrivateRouter";
import Messages from "./pages/Messages";
import Login from "./pages/Login";

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route element={<PrivateRouter />}>
                      <Route path="/" element={<Messages />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
};

export default App;
