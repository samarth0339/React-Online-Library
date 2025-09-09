import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BrowseBooks() {
  const { category } = useParams()
  const navigate = useNavigate()
  const { list, categories } = useSelector(state => state.books)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const base = category ? list.filter(b => b.category.toLowerCase() === decodeURIComponent(category).toLowerCase()) : list
    const q = query.trim().toLowerCase()
    if (!q) return base
    return base.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
  }, [list, category, query])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="border rounded px-2 py-1"
          value={category ? decodeURIComponent(category) : ''}
          onChange={(e) => {
            const value = e.target.value
            if (value) navigate(`/books/${encodeURIComponent(value)}`)
            else navigate('/books')
          }}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          className="border rounded px-3 py-1 flex-1 min-w-[200px]"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(book => (
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
    </div>
  )
}


