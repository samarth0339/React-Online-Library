 // Header component with navigation links
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <NavLink to="/" className="text-xl font-bold">Online Library</NavLink>
        <div className="space-x-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'font-semibold' : ''}>Home</NavLink>
          <NavLink to="/books" className={({isActive}) => isActive ? 'font-semibold' : ''}>Browse Books</NavLink>
          <NavLink to="/add" className={({isActive}) => isActive ? 'font-semibold' : ''}>Add Book</NavLink>
        </div>
      </nav>
    </header>
  )
}


