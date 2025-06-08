import { useState, useEffect } from 'react';
import { Button } from '@brianglezn/bri-ui';
import './App.css';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeComponent, setActiveComponent] = useState('button');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-theme');
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
            name: 'Inputs',
            components: ['Button', 'Input', 'Dropdown']
        },
        {
            name: 'Feedback',
            components: ['Alert', 'Modal']
        },
        {
            name: 'Surfaces',
            components: ['Card']
        },
        {
            name: 'Navigation',
            components: ['TabMenu']
        }
    ];

    // Render the appropriate component demo based on activeComponent
    const renderComponentDemo = () => {
        switch(activeComponent.toLowerCase()) {
            case 'button':
                return (
                    <section className="component-section">
                        <h2>Button</h2>
                        <p className="component-description">
                            Buttons allow users to take actions, and make choices, with a single tap.
                            They're typically placed throughout your UI, in places like dialogs, forms, cards, and toolbars.
                        </p>

                        <div className="component-container">
                            <h3>Variants</h3>
                            <div className="component-row">
                                <Button variant="primary">Primary Button</Button>
                                <Button variant="secondary">Secondary Button</Button>
                                <Button variant="tertiary">Tertiary Button</Button>
                            </div>
                            
                            <div className="code-container">
                                <div className="code-header">
                                    <span className="code-header-title">JSX</span>
                                </div>
                                <pre className="code-content">
{`<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>`}
                                </pre>
                            </div>

                            <h3>Sizes</h3>
                            <div className="component-row">
                                <Button size="small">Small Button</Button>
                                <Button size="medium">Medium Button</Button>
                                <Button size="large">Large Button</Button>
                            </div>
                            
                            <div className="code-container">
                                <div className="code-header">
                                    <span className="code-header-title">JSX</span>
                                </div>
                                <pre className="code-content">
{`<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>`}
                                </pre>
                            </div>

                            <h3>Disabled</h3>
                            <div className="component-row">
                                <Button disabled>Disabled Button</Button>
                            </div>
                            
                            <div className="code-container">
                                <div className="code-header">
                                    <span className="code-header-title">JSX</span>
                                </div>
                                <pre className="code-content">
{`<Button disabled>Disabled Button</Button>`}
                                </pre>
                            </div>
                        </div>
                    </section>
                );
            // Add other component cases as needed
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
        <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
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
                        {darkMode ? '🌞' : '🌙'}
                    </button>
                </div>
            </header>

            <div className="main-container">
                <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <nav className="sidebar-nav">
                        {componentCategories.map((category) => (
                            <div key={category.name} className="sidebar-category-container">
                                <h3 className="sidebar-category">{category.name}</h3>
                                <ul className="sidebar-items">
                                    {category.components.map((component) => (
                                        <li 
                                            key={component} 
                                            className={`sidebar-item ${activeComponent.toLowerCase() === component.toLowerCase() ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveComponent(component.toLowerCase());
                                                if (window.innerWidth < 960) {
                                                    setSidebarOpen(false);
                                                }
                                            }}
                                        >
                                            {component}
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
                    {renderComponentDemo()}
                </main>
            </div>
        </div>
    );
}