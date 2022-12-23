import { render } from '@testing-library/react';
import UITabs from './UITabs';

describe('UITabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UITabs />);

    expect(baseElement).toBeTruthy();
  });
});
