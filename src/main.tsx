import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const params = new URLSearchParams(window.location.search)
const q = params.get('q')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App q={q?.toString() || '1'} />
  </React.StrictMode>,
)
