import { render, screen } from '@testing-library/react';

import NoDataCard from './index';

test('renders the default empty-state title', () => {
  render(<NoDataCard />);

  expect(screen.getByText('No data found')).toBeInTheDocument();
});

test('renders a custom title when provided', () => {
  render(<NoDataCard title="You have no job postings yet" />);

  expect(screen.getByText('You have no job postings yet')).toBeInTheDocument();
});
