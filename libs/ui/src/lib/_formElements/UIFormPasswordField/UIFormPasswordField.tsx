import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UIPasswordField, UIPasswordFieldProps } from './components/UIPasswordField';

export type UIFormPasswordFieldProps = UIPasswordFieldProps & {
  control?: any;
  errors?: Record<string, any>;
};

export const UIFormPasswordField = ({ fieldKey, errors = {}, control, ...other }: UIFormPasswordFieldProps) => {
  const props = {
    fieldKey,
    error: errors[fieldKey]?.message,
    ...other,
  };

  if (!control) {
    return <UIPasswordField {...props} />;
  }

  return (
    <Controller
      name={fieldKey}
      control={control}
      defaultValue={other.value || other.defaultValue || ''}
      render={({ field: { onChange, value } }) => <UIPasswordField {...props} controllerOnChange={onChange} value={value} />}
    />
  );
};

export default UIFormPasswordField;
