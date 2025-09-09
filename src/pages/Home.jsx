// Home page component with categories and popular
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home() {
  const { categories, list } = useSelector(state => state.books)
  const popular = list.slice(0, 3)

  return (
    <div className="space-y-8">
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to the Online Library</h1>
        <p className="text-gray-600">Discover, browse, and add your favorite books.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <Link key={cat} to={`/books/${encodeURIComponent(cat)}`} className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Popular Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map(book => (
            <div key={book.id} className="bg-white rounded shadow p-4">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm mt-2">{book.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-yellow-600">⭐ {book.rating}</span>
                <Link to={`/book/${book.id}`} className="text-blue-600 hover:underline">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


