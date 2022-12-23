import { Control, Controller, FieldErrors } from 'react-hook-form';
import { UISelect, UISelectProps } from './components/UISelect';

export type UIFormSelectProps = UISelectProps & {
  control?: any;
  errors?: Record<string, any>;
};

export const UIFormSelect = ({ fieldKey, errors = {}, control, list = [], value, ...other }: UIFormSelectProps) => {
  const defaultValue = value === '' ? value : value || list[0]?.value;
  const props = {
    fieldKey,
    list,
    error: errors[fieldKey]?.message,
    ...other,
  };

  if (!control) {
    return <UISelect {...props} value={defaultValue} />;
  }

  return (
    <Controller
      name={fieldKey}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => <UISelect {...props} controllerOnChange={onChange} value={value} />}
    />
  );
};

export default UIFormSelect;
