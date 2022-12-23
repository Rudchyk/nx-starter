import { render } from '@testing-library/react';
import UILink from './UILink';

describe('UILink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UILink />);

    expect(baseElement).toBeTruthy();
  });
});
