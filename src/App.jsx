import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import RankingPage from './components/RankingPage/RankingPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import FAQPage from './components/FAQPage/FAQPage';
import ContactPage from './components/ContactPage/ContactPage';
import styles from './App.modules.css'; // Ensure the file name is correct (App.module.css)
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

function App() {
    return (
        <Router>
            <div>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    {/* Define other routes here */}
                </Routes>
            </div>
        </Router>
    );
}
// function App() {
//     return (
//         <Router>
//             <div className={styles.App}>
//                 <header className={styles.header}>
//                     {/* Navigation */}
//                     <nav>
//                         <ul className={styles.navList}>
//                             <li><Link to="/">Home</Link></li>
//                             <li><Link to="/ranking">Ranking</Link></li>
//                             <li><Link to="/profile">Profile</Link></li>
//                             <li><Link to="/faq">FAQ</Link></li>
//                             <li><Link to="/contact">Contact</Link></li>
//                         </ul>
//                     </nav>
//                 </header>

//                 {/* Page Content */}
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/ranking" element={<RankingPage />} />
//                     <Route path="/profile" element={<ProfilePage />} />
//                     <Route path="/faq" element={<FAQPage />} />
//                     <Route path="/contact" element={<ContactPage />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

export default App;
