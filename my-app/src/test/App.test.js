import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders app with the correct text', () => {
    render(<h1>this is my test</h1>);
    const imageElement = screen.getByText("this is my test");
    expect(imageElement).toBeInTheDocument();
  });
});
