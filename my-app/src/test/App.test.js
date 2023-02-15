import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  test('renders app with the correct text', () => {
    render(<h1>this is my test</h1>);
    const h1Element = screen.getByText("this is my test");
    expect(h1Element).toBeInTheDocument();
  });
});
