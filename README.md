# Online Library (React + Vite)

Online Library System built with React and Vite. Browse, search, view details, and add books using Redux Toolkit. Includes Home, Browse Books, Book Details, Add Book, and a 404 page. Styled with Tailwind CSS.

## Prerequisites
- Node.js 18+ (recommend LTS)
- npm 9+

## Installation
1) Install dependencies:
```bash
npm install
```

2) Start the development server:
```bash
npm run dev
```
Then open the URL printed in the terminal (usually `http://localhost:5173`).

3) Build for production:
```bash
npm run build
```

4) Preview the production build:
```bash
npm run preview
```

## Scripts
- `npm run dev`: start dev server
- `npm run build`: build for production
- `npm run preview`: preview production build

## Features
- Home page with categories and popular books
- Browse by category via dynamic routing: `/books/:category`
- Search by title or author on Browse page
- Book details page with full info and back link
- Add Book form with validation and Redux state update (prepends new book)
- 404 page that shows the invalid URL and includes a link back to Home

## Tech Stack
- React, React Router
- Redux Toolkit, React-Redux
- Vite
- Tailwind CSS

## Project Structure (key files)
- `src/App.jsx` — Main routing
- `src/components/Header.jsx` — Top navigation
- `src/components/Layout.jsx` — Shared layout and header wrapper
- `src/pages/*` — Pages (Home, BrowseBooks, BookDetails, AddBook, NotFound)
- `src/store/*` — Redux store and slices
## Repository

You can view the source code and full commit history for this project on GitHub:

[https://github.com/YOUR_USERNAME/React-Online-Library.git](https://github.com/YOUR_USERNAME/React-Online-Library.git)

*Note: Replace YOUR_USERNAME with your actual GitHub username*