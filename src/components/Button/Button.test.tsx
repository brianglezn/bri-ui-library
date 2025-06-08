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
}); 