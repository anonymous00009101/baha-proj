import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DictionPro header', () => {
  render(<App />);
  const headerElement = screen.getByText(/DictionPro 🎙/i);
  expect(headerElement).toBeInTheDocument();
});
