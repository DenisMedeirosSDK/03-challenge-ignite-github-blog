import { BrowserRouter } from 'react-router-dom'
import { PostsProvider } from './contexts/PostsContext'
import { Router } from './router'

export function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <Router />
      </PostsProvider>
    </BrowserRouter>
  )
}
