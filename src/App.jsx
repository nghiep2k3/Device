import React from 'react';
import ReactDOM from "react-dom/client"
import './assets/styles/index.css';
import Login from './pages/Authorization/login.jsx';
import Change from './pages/Profile/components/ChangePassWord.jsx';
import Update from './pages/Profile/components/Update.jsx';
import Menus from './pages/Profile/menu.jsx';
import ListUser from './pages/Profile/components/Profile.jsx';
import Edit from './pages/Profile/User/Edit.jsx';
import Create from './pages/Profile/User/Create.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />}>
          <Route path="ChangePassWord" element={<Change />} />
          <Route path="Menu" element={<Menus />} />
          <Route path="ListUser" element={<ListUser />} />
          <Route path="Update" element={<Update />} />
          <Route path="Create" element={<Create />} />
          <Route path="Edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);