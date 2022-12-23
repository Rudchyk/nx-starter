import { FC } from 'react';
import { Grid, GridProps } from '@mui/material';
import { UIInputCopyeditor, UIFormTextField } from '@ui';

export interface InfoGridCopiedElementProps extends GridProps {
  fieldKey: string;
  label: string;
  value: string;
}

export const InfoGridCopiedElement: FC<InfoGridCopiedElementProps> = ({ fieldKey, label, value, ...props }) => {
  return (
    <Grid item {...props}>
      <UIInputCopyeditor readOnly>
        <UIFormTextField margin="none" fieldKey={fieldKey} fullWidth label={label} value={value} />
      </UIInputCopyeditor>
    </Grid>
  );
};

export default InfoGridCopiedElement;
