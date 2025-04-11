
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with non-null assertion as the element should definitely exist
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);
root.render(<App />);
