import { Button } from '@brianglezn/bri-ui';

export default function ButtonPage() {
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
        
        <h3>With Icons</h3>
        <div className="component-row">
          <Button icon={<span>👍</span>}>With Left Icon</Button>
          <Button icon={<span>👉</span>} iconPosition="right">With Right Icon</Button>
          <Button icon={<span>⭐</span>} iconOnly aria-label="Star"></Button>
        </div>
        
        <div className="code-container">
          <div className="code-header">
            <span className="code-header-title">JSX</span>
          </div>
          <pre className="code-content">
{`<Button icon={<span>👍</span>}>With Left Icon</Button>
<Button icon={<span>👉</span>} iconPosition="right">With Right Icon</Button>
<Button icon={<span>⭐</span>} iconOnly aria-label="Star"></Button>`}
          </pre>
        </div>
      </div>
    </section>
  );
} 