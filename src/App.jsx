import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChapterList from './components/ChapterList';
import ChapterDetails from './components/ChapterDetails';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
    const [language, setLanguage] = useState('bn');
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetch(`/json/chapters/${language}/index.json`)
            .then(response => response.json())
            .then(data => setChapters(data));
    }, [language]);

    return (
        <Router>
            <Navbar />
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={
                        <div>
                            <div className="mb-4">
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700">Select Language:</label>
                                <select id="language" onChange={(e) => setLanguage(e.target.value)} value={language} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    <option value="en">English</option>
                                    <option value="bn">Bengali</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="id">Indonesian</option>
                                    <option value="ru">Russian</option>
                                    <option value="sv">Swedish</option>
                                    <option value="tr">Turkish</option>
                                    <option value="ur">Urdu</option>
                                    <option value="zh">Chinese</option>
                                </select>
                            </div>
                            <ChapterList chapters={chapters} />
                        </div>
                    } />
                    <Route path="/chapter/:id" element={<ChapterDetails language={language} />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
