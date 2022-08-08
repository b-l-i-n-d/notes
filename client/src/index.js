import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { reducers } from './reducers';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <MantineProvider>
            <NotificationsProvider limit={3}>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GoogleOAuthProvider>
            </NotificationsProvider>
        </MantineProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
