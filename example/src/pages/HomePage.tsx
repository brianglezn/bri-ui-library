export default function HomePage() {
  return (
    <section className="component-section">
      <h2>Welcome to BRI UI Library</h2>
      <p className="component-description">
        A modern, lightweight UI component library built with React and TypeScript.
        Explore the components using the sidebar navigation.
      </p>
      
      <div className="home-features">
        <div className="feature-card">
          <h3>Lightweight</h3>
          <p>Minimal dependencies and optimized bundle size for better performance.</p>
        </div>
        
        <div className="feature-card">
          <h3>Customizable</h3>
          <p>Easily theme and adapt components to match your design system.</p>
        </div>
        
        <div className="feature-card">
          <h3>Accessible</h3>
          <p>Built with accessibility in mind to ensure inclusive user experiences.</p>
        </div>
        
        <div className="feature-card">
          <h3>TypeScript</h3>
          <p>Full TypeScript support with comprehensive type definitions.</p>
        </div>
      </div>
      
      <div className="home-getting-started">
        <h3>Getting Started</h3>
        <div className="code-container">
          <div className="code-header">
            <span className="code-header-title">Installation</span>
          </div>
          <pre className="code-content">
{`npm install @brianglezn/bri-ui

# or with yarn
yarn add @brianglezn/bri-ui`}
          </pre>
        </div>
        
        <div className="code-container">
          <div className="code-header">
            <span className="code-header-title">Usage</span>
          </div>
          <pre className="code-content">
{`import { Button } from '@brianglezn/bri-ui';

function App() {
  return (
    <Button variant="primary">Click Me</Button>
  );
}`}
          </pre>
        </div>
      </div>
    </section>
  );
} 