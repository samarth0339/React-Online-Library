import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialBooks = [
  { id: '1', title: 'Dune', author: 'Frank Herbert', category: 'Sci-Fi', description: 'Epic science fiction saga on desert planet Arrakis.', rating: 4.8 },
  { id: '2', title: '1984', author: 'George Orwell', category: 'Fiction', description: 'Dystopian tale of surveillance and control.', rating: 4.7 },
  { id: '3', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Non-Fiction', description: 'A brief history of humankind.', rating: 4.6 },
  { id: '4', title: 'Project Hail Mary', author: 'Andy Weir', category: 'Sci-Fi', description: 'Solo mission to save Earth with alien ally.', rating: 4.7 },
]

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    list: initialBooks,
    categories: ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Fantasy', 'Mystery'],
  },
  reducers: {
    addBook: {
      reducer(state, action) {
        state.list.unshift(action.payload)
      },
      prepare(book) {
        return { payload: { id: nanoid(), ...book } }
      },
    },
  },
})

export const { addBook } = booksSlice.actions
export default booksSlice.reducer


