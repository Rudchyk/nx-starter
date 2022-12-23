import { UIDialog, UIButtonProps } from '@ui';
import { ReactElement, ReactNode, useRef } from 'react';

export interface DialogFormProps {
  open: boolean;
  title?: string;
  onDialogClose: () => void;
  onSubmit?: () => void;
  form: ReactElement;
  children?: ReactNode;
  isLoading?: boolean;
  ButtonPrimaryProps?: UIButtonProps;
  minWidth?: number;
}

export const DialogForm = ({ form, isLoading = false, onDialogClose, children, ButtonPrimaryProps = {}, minWidth = 400, ...other }: DialogFormProps) => {
  const dialogEl = useRef<HTMLDivElement>(null);
  const handleSubmitClick = () => {
    const formElement = dialogEl.current?.querySelector('form');

    formElement?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <UIDialog
      DialogProps={{
        PaperProps: {
          sx: {
            minWidth,
          },
        },
      }}
      ref={dialogEl}
      onDialogClose={onDialogClose}
      ButtonCancelProps={{
        children: 'Cancel',
        onClick: onDialogClose,
      }}
      onButtonPrimaryClick={handleSubmitClick}
      ButtonPrimaryProps={{
        children: 'Submit',
        loading: isLoading,
        ...ButtonPrimaryProps,
      }}
      DialogContentProps={{
        dividers: true,
      }}
      {...other}>
      {children}
      {form}
    </UIDialog>
  );
};

export default DialogForm;
