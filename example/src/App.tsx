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
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        // Apply dark mode on initial load
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, []);

    // Handle component transitions
    const handleComponentChange = (componentId: string) => {
        // Only trigger animation if changing to a different component
        if (componentId !== activeComponent) {
            setFadeIn(false);
            setTimeout(() => {
                setActiveComponent(componentId);
                setFadeIn(true);
            }, 150);
        }
        
        // Close sidebar on mobile
        if (window.innerWidth < 960) {
            setSidebarOpen(false);
        }
    };

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
            name: '',
            components: [
                { id: 'home', label: 'Home', icon: 'home' }
            ]
        },
        {
            name: 'Inputs',
            components: [
                { id: 'button', label: 'Button', icon: 'radio_button_checked' }
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
                return <HomePage key="home" />;
            case 'button':
                return <ButtonPage key="button" />;
            default:
                return (
                    <section key="not-found" className="component-section">
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
                        <span className="material-symbols-rounded">menu</span>
                    </button>
                    <h1>BRI UI</h1>
                    <span className="version">v1.0.0</span>
                </div>
                <div className="header-right">
                    <div className="search-container">
                        <span className="material-symbols-rounded">search</span>
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
                        <span className="material-symbols-rounded">
                            {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
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
                                            onClick={() => handleComponentChange(component.id)}
                                        >
                                            <span className="material-symbols-rounded sidebar-item-icon">{component.icon}</span>
                                            <p>{component.label}</p>
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

                <main className={`content ${fadeIn ? 'fade-in' : 'fade-out'}`}>
                    {renderComponentPage()}
                </main>
            </div>
        </div>
    );
}