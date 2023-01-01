import './App.css';
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import React  from 'react';
import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import  { useContext} from "react"

function App() {
  
  const {currentUser} = useContext(AuthContext)

  const PretectedRoute = ({children}) =>{
 
    if(!currentUser){
      
      return <Navigate to="/login"></Navigate>
    }
   
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="/"
            element={
              <PretectedRoute>
                <Home />
              </PretectedRoute>}> </Route>
          <Route path='login' element={<Login />}> </Route>
          <Route path='register' element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
