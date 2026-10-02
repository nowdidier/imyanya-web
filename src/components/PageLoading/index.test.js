import { render, screen } from '@testing-library/react';

import PageLoading from './index';

test('renders the route-level loading indicator', () => {
  render(<PageLoading />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
