import React, {useState} from 'react';
import ReactDOM from "react-dom/client"
import './assets/styles/index.css';
import DeviceManager from './components/DeviceManager/DeviceManager.jsx'
import CreateDevice from './components/CreateDevice/CreateDevice.jsx'

import router from './Router';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    // <div>
    //   <DeviceManager/>
    //   <CreateDevice />
    // </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);