import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BookDetails() {
  const { id } = useParams()
  const book = useSelector(state => state.books.list.find(b => b.id === id))

  if (!book) {
    return (
      <div>
        <p className="mb-4">Book not found.</p>
        <Link to="/books" className="text-blue-600 underline">Back to Browse</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 space-y-2">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-700">by {book.author}</p>
      <p className="text-sm text-gray-500">Category: {book.category}</p>
      <p className="mt-3">{book.description}</p>
      <p className="text-yellow-700">Rating: ⭐ {book.rating}</p>
      <Link to="/books" className="text-blue-600 underline mt-4 inline-block">Back to Browse</Link>
    </div>
  )
}


