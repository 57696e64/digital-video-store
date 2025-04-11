import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';

// Get the root HTML element for rendering the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application into the root element
root.render(
	<React.StrictMode>
		{/* Wrap the app with UserProvider to make global user state available */}
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);

reportWebVitals();