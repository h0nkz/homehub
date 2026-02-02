import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from '../src/store/store.ts'
import { Provider } from 'react-redux'
//import 'vite/modulepreload-polyfill' // as per https://vite.dev/guide/backend-integration.html

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
