import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Filter, { Filters } from './Filter';
import { LogEntry } from 'types/data';

const filters = {} as Filters;
const setFilters = jest.fn();

test('has empty sources when data is empty', () => {
  const data = [] as LogEntry[];
  render(<Filter filters={filters} setFilters={setFilters} data={data} />);
  const element = screen.queryByText(/source/i);

  expect(element).not.toBeInTheDocument();
});

test('has correct sources when data exists', () => {
  const data = [{ source: 'a' }, { source: 'b' }, { source: 'c' }] as LogEntry[];
  const component = renderer.create(<Filter filters={filters} setFilters={setFilters} data={data} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
