
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Profile from './components/Profile'
import ModulesList from './features/module/Modules'
import Login from './components/Login'
import Texteditor from './features/module/OpenAssignment'
import OpenModule from './features/module/openModule'
import Prefetch from './features/auth/Prefetch'
import About from './components/About'
import Signup from './components/Signup'
import useTitle from './hooks/Title'

function App() {
  useTitle('Capcodes')
  return (
       <Routes>
        <Route path="/" element={<Login />}>
           </Route>
           <Route path='/about' element={<About/>}/>
           <Route path='/signup' element={<Signup/>}/>
          <Route element={<Prefetch />}>
          <Route path="/layout" element={<Layout/>}>
           <Route index element={<Home/>}/>
              <Route path='modules'>
                <Route index element={<ModulesList />} />
                <Route path=":id" element={<OpenModule/>}/>
                </Route>
                <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
    </Routes>
  )
}

export default App
