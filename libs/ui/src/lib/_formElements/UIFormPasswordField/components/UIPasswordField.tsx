import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export type UIPasswordFieldProps = TextFieldProps & {
  fieldKey: string;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  controllerOnChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export const UIPasswordField = ({
  fieldKey,
  error,
  InputProps = {},
  onChange,
  controllerOnChange,
  label = fieldKey,
  margin = 'normal',
  ...other
}: UIPasswordFieldProps) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange && onChange(event);
    controllerOnChange && controllerOnChange(event);
  };

  return (
    <TextField
      {...other}
      margin={margin}
      id={fieldKey}
      label={label}
      type={isPasswordShown ? 'text' : 'password'}
      error={Boolean(error)}
      helperText={error}
      name={fieldKey}
      onChange={handleOnChange}
      InputProps={{
        ...(InputProps as any),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label={`toggle ${label} visibility`} onClick={handleClickShowPassword}>
              {isPasswordShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default UIPasswordField;
