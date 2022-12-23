import { render } from '@testing-library/react';
import CookiesPolicy from './CookiesPolicyAlert';

describe('CookiesPolicy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CookiesPolicy />);

    expect(baseElement).toBeTruthy();
  });
});
