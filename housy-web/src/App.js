// import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarHome from './components/Navbar/Navbar';
import { PrivateRouteAdmin, PrivateRouteUser } from './components/PrivateRoute/PrivateRoute';
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import AddProperty from './pages/AddProperty';
import Admin from './pages/Admin';
import AdminProfile from './pages/AdminProfile';
import DetailProperty from './pages/DetailProperty';
import ListProperty from './pages/ListProperty';
import MainPage from './pages/MainPage';
import Payment from './pages/Payment';
import UserProfile from './pages/UserProfile';


function App() {

  window.scrollTo(0,0)

  const [isLoading, setIsLoading] = useState(true)
  const [dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("Check User Success : ", response)
      // Get user data
      let payload = response?.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      // console.log("INI di APP.js", payload)
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, []);

  // console.log(state)
  return (
    <>
      { isLoading ? <h1>Loading...</h1> : 
        <div style={{minHeight: "100vh", position: "relative", color: "black"}}>
          <BrowserRouter>
            <NavbarHome/>
              <main>
                <Routes>

                  {/* <Route element={<PrivateRouteNotLogin/>}> */}

                    <Route exact path='/' element={<MainPage/>}/>
                    <Route exact path='/detailProperty/:id' element={<DetailProperty/>}/>

                    <Route element={<PrivateRouteAdmin/>}>
                      <Route exact path='/payment/:id' element={<Payment/>}/>
                      <Route exact path='/userProfile' element={<UserProfile/>}/>
                    </Route>

                    <Route element={<PrivateRouteUser/>}>
                      <Route exact path='/admin' element={<Admin/>}/>
                      <Route exact path='/adminProfile' element={<AdminProfile/>}/>
                      <Route exact path='/addProperty' element={<AddProperty/>}/>
                      <Route exact path='/listProperty' element={<ListProperty/>}/>
                    </Route>

                  {/* </Route> */}

                </Routes>
              </main>
          </BrowserRouter>
        </div>  
      }
    </>
  );
}

export default App;
