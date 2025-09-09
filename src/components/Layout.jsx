// Layout component with conditional header rendering
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  const location = useLocation()
  const isNotFound = location.state?.hideHeader

  return (
    <div className="min-h-screen flex flex-col">
      {!isNotFound && <Header />}
      <main className="container mx-auto flex-1 p-4">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-gray-500 py-6">© {new Date().getFullYear()} Online Library</footer>
    </div>
  )
}


