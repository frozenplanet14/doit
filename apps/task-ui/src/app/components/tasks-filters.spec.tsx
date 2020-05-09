import React from 'react';
import { render } from '@testing-library/react';

import TasksFilters from './tasks-filters';

describe(' TasksFilters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TasksFilters />);
    expect(baseElement).toBeTruthy();
  });
});
