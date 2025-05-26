import './App.css'
import Home from './pages/Home.tsx'
import Books from './pages/Books.tsx'
import BookInfo from './pages/BookInfo.tsx'
import About from './pages/About.tsx'
import Cart from './pages/Cart.tsx'
import ScrollToTop from './ScrollToTop.ts'
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

function App() {
  const router = createBrowserRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Books />, path: '/books' },
        { element: <BookInfo />, path: '/bookinfo/:id' },
        { element: <About />, path: '/about' },
        { element: <Cart />, path: '/cart' }
      ],
      element: (
        <>
          <ScrollToTop />
          <header>
            <NavLink to='/' id='left'>
              <img className='logo' src='/bokhyllan.png' />
            </NavLink>
            <nav>
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
