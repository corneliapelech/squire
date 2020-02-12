import React from 'react';
import { render } from '@testing-library/react';
import { SqHeader } from './Header';

test('', () => {
  const { getByText } = render(<SqHeader></SqHeader>);
  const h1Element = getByText(/squire/);
  expect(h1Element).toBeInTheDocument();
});