import { LoadingButton } from '@mui/lab';
import { Button as MUIButton, ButtonProps as MUIButtonProps, IconButton } from '@mui/material';
import { forwardRef } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { Link as RouteLink } from 'react-router-dom';
import { Fab } from '@mui/material';

export interface UIButtonProps extends MUIButtonProps {
  to?: string;
  icon?: boolean;
  loading?: boolean;
  base?: boolean;
  fab?: boolean;
}

export const UIButton = forwardRef<HTMLButtonElement, UIButtonProps>(({ to, icon, loading, base, fab, ...other }, ref) => {
  const props: any = { ...other };

  if (to) {
    props.component = RouteLink;
    props.to = to;
  }

  if (base) {
    return <ButtonBase ref={ref} {...props} />;
  }

  if (fab) {
    return <Fab ref={ref} {...props} />;
  }

  if (icon) {
    return <IconButton ref={ref} {...props} />;
  }

  if (loading) {
    return <LoadingButton ref={ref} loading={loading} {...props} />;
  }

  return <MUIButton ref={ref} {...props} />;
});

export default UIButton;
