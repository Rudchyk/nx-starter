import { UIDialog } from '@ui';
import { ReactNode } from 'react';

export interface DialogAreYouSureProps {
  open: boolean;
  children?: string | ReactNode;
  title?: string;
  onAgree: () => void;
  onDisagree: () => void;
}

export const DialogAreYouSure = ({ title = 'Are you sure?', onAgree, onDisagree, ...other }: DialogAreYouSureProps) => {
  return (
    <UIDialog
      {...other}
      title={title}
      isButtonClose={false}
      onDialogClose={onDisagree}
      ButtonCancelProps={{
        onClick: onDisagree,
        children: 'Disagree',
      }}
      onButtonPrimaryClick={onAgree}
      ButtonPrimaryProps={{
        children: 'Agree',
      }}
    />
  );
};

export default DialogAreYouSure;
