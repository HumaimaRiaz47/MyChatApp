import React, {lazy, Suspense, useEffect} from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/Layout/Loader';
import axios from 'axios'
import { server } from './Constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));


const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));

let user = true;
const App = () => {

  const {user, loader} = useSelector((state) => state.auth)

const dispatch = useDispatch()

  useEffect(() => {

    axios
    .get(`${server}/api/v1/user/profile`, {withCredentials: true})
    .then(({data}) => dispatch(userExists(data.user)))
    .catch((err) => dispatch(userNotExists))

  }, [dispatch])
  return loader ? (<LayoutLoader/>) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={ <Home />} />
            <Route path="/chat/:chatId" element={ <Chat />} />
            <Route path="/groups" element={ <Groups />} />
          </Route>

          <Route 
          path="/login"
          element={
            <ProtectRoute user = {!user} redirect="/">
              <Login />
            </ProtectRoute>
          }
          />

      <Route path='/admin' element={<AdminLogin />}/>

      <Route path='*' element={<NotFound />}/>
      </Routes>      
      </Suspense>
      <Toaster position='bottom-position'/>
    </BrowserRouter>
  )
}

export default App