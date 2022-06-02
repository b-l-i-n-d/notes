import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { themeChange } from 'theme-change';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './tailwind.css';

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
