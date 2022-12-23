import { render } from '@testing-library/react';
import ThemeModeSwitcher from './ThemeModeSwitcher';

describe('ThemeModeSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeModeSwitcher />);

    expect(baseElement).toBeTruthy();
  });
});
