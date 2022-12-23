import { useState } from 'react';

type ToggleValue = boolean | string | number;

export const useToggle = <T>(defaultValue: T | boolean): [T | boolean, any] => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value: ToggleValue) => {
    setValue((currentValue) => (typeof value === 'boolean' ? value : !currentValue));
  };

  return [value, toggleValue];
};

export default useToggle;
