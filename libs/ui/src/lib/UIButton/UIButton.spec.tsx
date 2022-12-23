import { render } from '@testing-library/react';
import UIButton from './UIButton';

describe('UIButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UIButton />);

    expect(baseElement).toBeTruthy();
  });
});
