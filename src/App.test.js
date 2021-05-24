import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Book List/i);
  expect(linkElement).toBeInTheDocument();
});
