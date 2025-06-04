import './App.css'
import Home from './pages/Home.tsx'
import Books from './pages/Books.tsx'
import BookInfo from './pages/BookInfo.tsx'
import MobileNav from './components/MobileNav.tsx'
import About from './pages/About.tsx'
import Cart from './pages/Cart.tsx'
import ScrollToTop from './ScrollToTop.ts'
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Checkout from './pages/Checkout.tsx'
import Confirmation from './pages/Confirmation.tsx'

function App() {
  const router = createBrowserRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Books />, path: '/books' },
        { element: <BookInfo />, path: '/bookinfo/:id' },
        { element: <About />, path: '/about' },
        { element: <Cart />, path: '/cart' },
        { element: <Checkout />, path: '/checkout' },
        { element: <Confirmation />, path: '/confirmation' }
      ],
      element: (
        <>
          <ScrollToTop />
          <header style={{ display: 'flex' }}>
            <MobileNav />
            <NavLink to='/' id='left'>
              <img className='logo' src='/bokhyllan.png' />
            </NavLink>
            <nav id='desktopNav'>
              <NavLink className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/'>
                Hem
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/books'>
                Böcker
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/about'>
                Om
              </NavLink>
            </nav>
            <NavLink className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} id='right' to='/cart'>
              <i className='bi bi-basket-fill' style={{ fontSize: '1.8em' }}></i>
            </NavLink>
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
            <p className='light'>Skolprojekt av Josefine Luther</p>
          </footer>
        </>
      )
    }
  ])
  return <RouterProvider router={router} />
}

export default App
