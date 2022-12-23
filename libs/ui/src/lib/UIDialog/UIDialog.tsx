import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContent, { DialogContentProps } from '@mui/material/DialogContent';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef, ReactNode } from 'react';
import { UIButton, UIButtonProps } from '@ui';

export interface UIDialogProps {
  open: boolean;
  onDialogClose: () => void;
  onButtonPrimaryClick?: () => void;
  title?: string;
  DialogProps?: Partial<DialogProps>;
  DialogTitleProps?: DialogTitleProps;
  DialogContentProps?: DialogContentProps;
  DialogActionsProps?: DialogActionsProps;
  ButtonCancelProps?: UIButtonProps;
  ButtonPrimaryProps?: UIButtonProps;
  isButtonClose?: boolean;
  isButtonCancel?: boolean;
  children?: ReactNode;
}

export const UIDialog = forwardRef<HTMLDivElement, UIDialogProps>(
  (
    {
      open,
      onDialogClose,
      DialogProps = {},
      DialogTitleProps = {},
      DialogContentProps = {},
      DialogActionsProps = {},
      ButtonCancelProps = {
        children: 'Cancel',
        onClick: onDialogClose,
      },
      ButtonPrimaryProps = {
        children: 'Ok',
      },
      title,
      isButtonClose = true,
      isButtonCancel = true,
      children,
      onButtonPrimaryClick,
    },
    ref
  ) => {
    return (
      <Dialog ref={ref} {...DialogProps} open={open} onClose={onDialogClose}>
        <DialogTitle
          {...DialogTitleProps}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...(DialogTitleProps.sx || {}),
          }}>
          {title}
          {isButtonClose && (
            <IconButton edge="end" color="inherit" onClick={onDialogClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        {children && <DialogContent {...DialogContentProps}>{children}</DialogContent>}
        <DialogActions {...DialogActionsProps}>
          {isButtonCancel && <UIButton {...ButtonCancelProps} />}
          <UIButton variant="contained" color="primary" {...ButtonPrimaryProps} onClick={onButtonPrimaryClick} />
        </DialogActions>
      </Dialog>
    );
  }
);

export default UIDialog;
