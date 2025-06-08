import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('respects disabled prop', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    
    const button = getByText('Click me');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders with icon on the left by default', () => {
    const icon = <span data-testid="test-icon">icon</span>;
    const { getByTestId, getByText } = render(
      <Button icon={icon}>Click me</Button>
    );
    
    const buttonText = getByText('Click me');
    const iconElement = getByTestId('test-icon');
    
    expect(buttonText).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(buttonText.compareDocumentPosition(iconElement) & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  });

  test('renders with icon on the right when iconPosition is set', () => {
    const icon = <span data-testid="test-icon">icon</span>;
    const { getByTestId, getByText } = render(
      <Button icon={icon} iconPosition="right">Click me</Button>
    );
    
    const buttonText = getByText('Click me');
    const iconElement = getByTestId('test-icon');
    
    expect(buttonText).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(buttonText.compareDocumentPosition(iconElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  test('renders only icon when iconOnly is true', () => {
    const icon = <span data-testid="test-icon">icon</span>;
    const { getByTestId, queryByText } = render(
      <Button icon={icon} iconOnly>Click me</Button>
    );
    
    expect(getByTestId('test-icon')).toBeInTheDocument();
    expect(queryByText('Click me')).not.toBeInTheDocument();
  });
}); 