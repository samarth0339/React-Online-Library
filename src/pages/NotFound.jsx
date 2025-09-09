import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" state={{ hideHeader: true }}>
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600">No match for <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code></p>
      <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
    </div>
  )
}


