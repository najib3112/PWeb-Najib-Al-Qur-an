import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DetailTafsir from '../src/page/DetailTafsir';
import Home from '../src/page/Home';
import DetailSurat from './page/DetailSurat';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<DetailSurat />} />
                <Route path="/tafsir/:id" element={<DetailTafsir />} /> {/* Add this line */}
            </Routes>
        </Router>
    );
};

export default App;