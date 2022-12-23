import { TextField, TextFieldProps, MenuItem } from '@mui/material';
import { ChangeEvent } from 'react';

export interface SelectItem {
  value: string;
  label: string;
}

export type UISelectProps = TextFieldProps & {
  fieldKey: string;
  error?: string;
  list: SelectItem[];
  controllerOnChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const UISelect = ({
  fieldKey,
  fullWidth,
  sx,
  onChange,
  controllerOnChange,
  label = fieldKey,
  margin = 'normal',
  error,
  list,
  ...other
}: UISelectProps) => {
  let styles = {};
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
    controllerOnChange && controllerOnChange(event);
  };

  if (!fullWidth) {
    styles = {
      ...sx,
      width: 210,
    };
  }

  return (
    <TextField
      margin={margin}
      id={fieldKey}
      label={label}
      sx={styles}
      fullWidth={fullWidth}
      error={Boolean(error)}
      helperText={error}
      name={fieldKey}
      onChange={handleOnChange}
      select
      {...other}>
      {list.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};
