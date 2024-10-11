import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const el = {
  image: 'https://via.placeholder.com/150',
  name: 'Test Recipe',
  rating: 4.5,
  tags: ['Tag1', 'Tag2', 'Tag3'],
  id: 1
};

test('renders the component Card & given props', () => {
  render(<Card el={el} />);

  // Test img-recipe-1
  const img = screen.getByTestId(`img-recipe-${el.id}`);
  expect(img).toHaveAttribute('src', el.image);
  expect(img).toHaveAttribute('alt', el.name);

  // Test title-recipe-1
  const title = screen.getByTestId(`title-recipe-${el.id}`);
  expect(title.innerHTML).toBe(el.name);

  // Test rating-recipe-1
  const rating = screen.getByTestId(`rating-recipe-${el.id}`);
  expect(rating.innerHTML).toBe(el.rating.toString());

  // Test link-recipe-1
  const link = screen.getByTestId(`link-recipe-${el.id}`);
  expect(link).toHaveAttribute('href', `https://dummyjson.com/recipes/${el.id}`);

});
