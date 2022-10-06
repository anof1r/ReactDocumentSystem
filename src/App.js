import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import ApplicationFrom from './components/ApplicationForm/ApplicationForm'
import ApplicationGrid from './components/ApplicationGrid/ApplicationGrid'
import LoginScreen from './components/LoginScreen/LoginScreen';

function App() {
  const [auth, setAuth] = useState(false)
  if (auth) {
    return (
      <>
        <header>
          <Link to='/form' style={{ cursor: "pointer", color: "black" }}> Форма для заявки </Link>
          <span> | </span>
          <Link to='/grid' style={{ cursor: "pointer", color: "black" }}> Сводная таблица </Link>
        </header>
        <Routes>
          <Route path='/' element={<ApplicationFrom />} />
          <Route path='/form' element={<ApplicationFrom />} />
          <Route path='/grid' element={<ApplicationGrid />} />
        </Routes>
      </>
    )
  } else {
    return (
      <LoginScreen setAuth={setAuth} />
    )
  }

}

export default App;
