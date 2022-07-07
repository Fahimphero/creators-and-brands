import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import LoginBrand from './Pages/Login/LoginBrand';
import SignUpBrand from './Pages/Signup/SignupBrand';
import Header from './Pages/Header/Header';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import Brand from './Pages/Users/Brand';
import Creator from './Pages/Users/Creator';
import RequireAuth2 from './Pages/RequireAuth/RequireAuth2';


function App() {
  return (
    <div>
      {/* <Header></Header> */}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>

        <Route path='/loginBrand' element={<LoginBrand></LoginBrand>}></Route>
        <Route path='/signupBrand' element={<SignUpBrand></SignUpBrand>}></Route>
        <Route path='/brand' element={<RequireAuth2><Brand></Brand></RequireAuth2>}></Route>
        <Route path='/creator' element={<RequireAuth><Creator></Creator></RequireAuth>}></Route>


      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
