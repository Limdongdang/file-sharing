import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Content from './components/Content'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Home from './pages/Home'
import MyFiles from './pages/MyFiles'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <SideBar />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myfiles" element={<MyFiles />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </>
  )
}

export default App
