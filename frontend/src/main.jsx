import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { PostsProvider } from '../context/PostsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <PostsProvider>
      <App />
      </PostsProvider>
    </Router>
  </StrictMode>,
)
