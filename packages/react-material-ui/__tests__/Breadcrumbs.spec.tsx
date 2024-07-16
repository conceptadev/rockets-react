/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import Breadcrumbs from '../src/components/Breadcrumbs';

describe('Dialog Component', () => {
  it('should render correctly', () => {
    const { debug } = render(<Breadcrumbs />);

    debug();
  });
});
