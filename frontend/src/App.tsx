import './App.css'
import Home from './pages/Home.tsx'
import Books from './pages/Books.tsx'
import BookInfo from './pages/BookInfo.tsx'
import About from './pages/About.tsx'
import Cart from './pages/Cart.tsx'
import { createHashRouter, NavLink, Outlet, RouterProvider } from 'react-router-dom'

function App() {
  const router = createHashRouter([
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
          <header>
            <img className='logo' src='bokhyllan.png' />
            <nav>
              <NavLink className='navLink' to='/'>
                Hem
              </NavLink>
              <NavLink className='navLink' to='/books'>
                Böcker
              </NavLink>
              <NavLink className='navLink' to='/about'>
                Om
              </NavLink>
            </nav>
            <NavLink className='navLink' to='/cart'>
              Varukorg
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
