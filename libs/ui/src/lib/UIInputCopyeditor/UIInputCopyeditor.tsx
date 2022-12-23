import { InputAdornment, IconButton, IconButtonProps, Theme, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import { useState, useRef, cloneElement, SyntheticEvent, ReactElement, useEffect, ChangeEvent } from 'react';

export interface UIInputCopyeditorProps {
  children: ReactElement;
  onCopy?: (value: string) => void;
  readOnly?: boolean;
  snackbarDuration?: number;
  snackbarMessage?: string;
  snackbarHorizontal?: 'center' | 'left' | 'right';
  snackbarVertical?: 'bottom' | 'top';
  snackbarClassName?: string;
  isCopyOutside?: boolean;
  copyIconProps?: IconButtonProps;
}

const valMask = '{{value}}';

export const UIInputCopyeditor = ({
  children,
  snackbarClassName,
  snackbarHorizontal = 'left',
  snackbarVertical = 'bottom',
  snackbarDuration = 1000,
  snackbarMessage = `${valMask} was copied`,
  readOnly = false,
  isCopyOutside = false,
  onCopy,
  copyIconProps = {},
}: UIInputCopyeditorProps) => {
  const getMessage = (val: string) => snackbarMessage.replace(valMask, val);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSnackbarCloseClick = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbarOpen(false);
  };
  const onCopyClick = () => {
    const inputValue = inputRef.current?.value || '';

    navigator.clipboard.writeText(inputValue);
    setIsSnackbarOpen(true);
    setMessage(getMessage(inputValue));
    onCopy && onCopy(inputValue);
  };
  const enable = (value: string | undefined) => {
    if (!value) {
      setIsEnabled(false);
    } else if (value && !isEnabled) {
      setIsEnabled(true);
    }
  };
  const element = cloneElement(children, {
    InputProps: {
      ...(children.props.InputProps || {}),
      readOnly,
      inputRef,
      endAdornment: isCopyOutside ? (
        children.props.endAdornment
      ) : (
        <InputAdornment position="end">
          <IconButton {...copyIconProps} disabled={!isEnabled} onClick={onCopyClick}>
            <ContentCopyIcon />
          </IconButton>
        </InputAdornment>
      ),
      sx: {
        ...(children.props.sx || {}),
        background: (theme: Theme) => (readOnly ? theme.palette.grey[100] : null),
      },
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        children.props.onChange && children.props.onChange(e);
        enable(e.target.value);
      },
    },
  });
  const boxStyles = isCopyOutside ? { display: 'flex', alignItems: 'center' } : undefined;

  useEffect(() => {
    enable(inputRef.current?.value);
  }, []);

  return (
    <Box sx={boxStyles}>
      {element}
      {isCopyOutside && (
        <IconButton {...copyIconProps} sx={{ ...(copyIconProps.sx || {}), ml: 1 }} disabled={!isEnabled} onClick={onCopyClick}>
          <ContentCopyIcon />
        </IconButton>
      )}
      <Snackbar
        className={snackbarClassName}
        anchorOrigin={{ horizontal: snackbarHorizontal, vertical: snackbarVertical }}
        open={isSnackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleSnackbarCloseClick}
        message={message}
      />
    </Box>
  );
};

export default UIInputCopyeditor;
