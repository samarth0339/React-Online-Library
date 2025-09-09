import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/slices/booksSlice'

export default function AddBook() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categories = useSelector(state => state.books.categories)

  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time validation
  const validateField = (name, value) => {
    const trimmedValue = value.trim()
    
    switch (name) {
      case 'title':
        if (!trimmedValue) return 'Title is required'
        if (trimmedValue.length < 2) return 'Title must be at least 2 characters'
        if (trimmedValue.length > 100) return 'Title must be less than 100 characters'
        return ''
      
      case 'author':
        if (!trimmedValue) return 'Author is required'
        if (trimmedValue.length < 2) return 'Author name must be at least 2 characters'
        if (trimmedValue.length > 50) return 'Author name must be less than 50 characters'
        if (!/^[a-zA-Z\s.-]+$/.test(trimmedValue)) return 'Author name can only contain letters, spaces, dots, and hyphens'
        return ''
      
      case 'category':
        if (!value) return 'Please select a category'
        return ''
      
      case 'description':
        if (!trimmedValue) return 'Description is required'
        if (trimmedValue.length < 10) return 'Description must be at least 10 characters'
        if (trimmedValue.length > 500) return 'Description must be less than 500 characters'
        return ''
      
      case 'rating':
        if (!value) return 'Rating is required'
        const ratingNum = Number(value)
        if (Number.isNaN(ratingNum)) return 'Rating must be a valid number'
        if (ratingNum < 0 || ratingNum > 5) return 'Rating must be between 0 and 5'
        return ''
      
      default:
        return ''
    }
  }

  const validate = () => {
    const newErrors = {}
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle field changes with real-time validation
  const handleFieldChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Validate field in real-time if it's been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Handle field blur (mark as touched and validate)
  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, form[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Mark all fields as touched to show validation errors
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)
    
    if (!validate()) {
      setIsSubmitting(false)
      return
    }
    
    try {
      // Simulate a brief delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      
      dispatch(addBook({
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        description: form.description.trim(),
        rating: Number(form.rating),
      }))
      
      // Reset form after successful submission
      setForm({
        title: '',
        author: '',
        category: '',
        description: '',
        rating: '',
      })
      setErrors({})
      setTouched({})
      
      navigate('/books')
    } catch (error) {
      console.error('Error adding book:', error)
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: '',
      author: '',
      category: '',
      description: '',
      rating: '',
    })
    setErrors({})
    setTouched({})
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add a New Book</h1>
        <p className="text-gray-600 mb-6">Fill in the details below to add a new book to the library</p>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              value={form.title} 
              onChange={e => handleFieldChange('title', e.target.value)}
              onBlur={() => handleFieldBlur('title')}
              placeholder="Enter book title"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
              <span className="text-xs text-gray-500 ml-auto">{form.title.length}/100</span>
            </div>
          </div>

          {/* Author Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.author ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              value={form.author} 
              onChange={e => handleFieldChange('author', e.target.value)}
              onBlur={() => handleFieldBlur('author')}
              placeholder="Enter author name"
              maxLength={50}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.author && <p className="text-red-600 text-sm">{errors.author}</p>}
              <span className="text-xs text-gray-500 ml-auto">{form.author.length}/50</span>
            </div>
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              value={form.category} 
              onChange={e => handleFieldChange('category', e.target.value)}
              onBlur={() => handleFieldBlur('category')}
            >
              <option value="">Select a category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              rows={4} 
              value={form.description} 
              onChange={e => handleFieldChange('description', e.target.value)}
              onBlur={() => handleFieldBlur('description')}
              placeholder="Enter a brief description of the book"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
              <span className="text-xs text-gray-500 ml-auto">{form.description.length}/500</span>
            </div>
          </div>

          {/* Rating Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <input 
              type="number" 
              min="0" 
              max="5" 
              step="0.1" 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.rating ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              value={form.rating} 
              onChange={e => handleFieldChange('rating', e.target.value)}
              onBlur={() => handleFieldBlur('rating')}
              placeholder="0.0 - 5.0"
            />
            {errors.rating && <p className="text-red-600 text-sm mt-1">{errors.rating}</p>}
            <p className="text-xs text-gray-500 mt-1">Rate the book from 0.0 to 5.0</p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={resetForm}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Reset Form
            </button>
            
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => navigate('/books')} 
                className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add Book'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


