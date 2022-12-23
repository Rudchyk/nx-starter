import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

export type UITextFieldProps = TextFieldProps & {
  fieldKey: string;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  controllerOnChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export const UITextField = ({ fieldKey, error, label = fieldKey, onChange, controllerOnChange, margin = 'normal', ...other }: UITextFieldProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange && onChange(event);
    controllerOnChange && controllerOnChange(event);
  };

  return (
    <TextField {...other} onChange={handleOnChange} margin={margin} id={fieldKey} label={label} name={fieldKey} error={Boolean(error)} helperText={error} />
  );
};

export default UITextField;
