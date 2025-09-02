import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

const root = document.getElementById('root');
console.log('Root element:', root);
console.log('Creating root...');

if (root) {
  createRoot(root).render(<App />);
  console.log('App rendered!');
} else {
  console.error('Root element not found!');
}