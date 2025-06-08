import { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';

export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        // Check if user has a preference in localStorage or prefers dark mode
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [activeComponent, setActiveComponent] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Apply dark mode on initial load
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const sidebar = document.querySelector('.sidebar');
            const button = document.querySelector('.mobile-menu-button');
            
            if (sidebarOpen && 
                sidebar && 
                button && 
                !sidebar.contains(e.target as Node) && 
                !button.contains(e.target as Node)) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [sidebarOpen]);

    // Handle escape key press to close sidebar
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [sidebarOpen]);

    // Define component categories and their components
    const componentCategories = [
        {
            name: 'General',
            components: [
                { id: 'home', label: 'Home', icon: '🏠' }
            ]
        },
        {
            name: 'Inputs',
            components: [
                { id: 'button', label: 'Button', icon: '🔘' }
            ]
        }
    ];

    // Filter components based on search query
    const filteredCategories = searchQuery.trim() === '' 
        ? componentCategories 
        : componentCategories.map(category => ({
            ...category,
            components: category.components.filter(comp => 
                comp.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(category => category.components.length > 0);

    // Render the appropriate component page based on activeComponent
    const renderComponentPage = () => {
        switch(activeComponent.toLowerCase()) {
            case 'home':
                return <HomePage />;
            case 'button':
                return <ButtonPage />;
            default:
                return (
                    <section className="component-section">
                        <h2>Component Not Found</h2>
                        <p>The selected component is not available yet.</p>
                    </section>
                );
        }
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-left">
                    <button 
                        className="mobile-menu-button" 
                        onClick={toggleSidebar}
                        aria-label="Toggle navigation menu"
                    >
                        ☰
                    </button>
                    <h1>BRI UI</h1>
                    <span className="version">v1.0.0</span>
                </div>
                <div className="header-right">
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Search components..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button 
                        className="theme-toggle" 
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <div className="main-container">
                <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <nav className="sidebar-nav">
                        {filteredCategories.map((category) => (
                            <div key={category.name} className="sidebar-category-container">
                                <h3 className="sidebar-category">{category.name}</h3>
                                <ul className="sidebar-items">
                                    {category.components.map((component) => (
                                        <li 
                                            key={component.id} 
                                            className={`sidebar-item ${activeComponent === component.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveComponent(component.id);
                                                if (window.innerWidth < 960) {
                                                    setSidebarOpen(false);
                                                }
                                            }}
                                        >
                                            <span className="sidebar-item-icon">{component.icon}</span>
                                            {component.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div 
                        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="content">
                    {renderComponentPage()}
                </main>
            </div>
        </div>
    );
}