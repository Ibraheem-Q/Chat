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
    console.log("App start")
    if(!currentUser || currentUser == null){
      
      return <Navigate to="/login"></Navigate>
    }
   
    return children
  }
  return (
    <BrowserRouter>
      <Routes>

          <Route
            path="/Chat"
            element={
              <PretectedRoute>
                <Home />
              </PretectedRoute>}> </Route>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='register' element={<Register />}></Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
