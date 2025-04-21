import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useUser } from './context/index';


import NavBar from './components/NavBar/index';
import AuthPage from './pages/authPage/authPage';
import HomePage from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import ViewBlog from './components/Blogs/ViewBlog';


import Protected from './components/ProtectedRoute/Protected'
import PublicOnly from './components/PublicOnlyRoute/PublicOnlyRoute';


function App() {
  const { loading } = useUser();

  return (
    <div className='w-full min-h-[100vh] flex flex-col justify-start items-center bg-blue-50'>
      <NavBar />
      {!loading && (
        <>
          <Routes>
            <Route path='/view-blog' element={<ViewBlog />} />
            <Route path='/' element={<HomePage />} />
            <Route element={<PublicOnly />} >
              <Route path='/auth' element={<AuthPage />} />
            </Route>
            <Route element={<Protected />} >
              <Route path='/dashboard/*' element={<Dashboard />} />
            </Route>
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
