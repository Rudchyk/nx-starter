import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UITextField, UITextFieldProps } from './components/UIFormTextField';

export type UIFormTextFieldProps = UITextFieldProps & {
  control?: any;
  errors?: Record<string, any>;
};

export const UIFormTextField = ({ fieldKey, errors = {}, control, ...other }: UIFormTextFieldProps) => {
  const props = {
    fieldKey,
    error: errors[fieldKey]?.message,
    ...other,
  };

  if (!control) {
    return <UITextField {...props} />;
  }

  return (
    <Controller
      name={fieldKey}
      control={control}
      defaultValue={other.value || other.defaultValue || ''}
      render={({ field: { onChange, value } }) => <UITextField {...props} controllerOnChange={onChange} value={value} />}
    />
  );
};

export default UIFormTextField;
