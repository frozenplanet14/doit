import React from 'react';
import { render } from '@testing-library/react';

import CreateTask from './create-task';

describe(' CreateTask', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateTask />);
    expect(baseElement).toBeTruthy();
  });
});
