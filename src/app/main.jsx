import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'

import "@app/styles/variables.css";
import "@app/styles/globals.css";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
