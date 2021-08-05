import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  message: string;
  onClose?: () => void;
  severity: 'success' | 'error';
}

const Toast: React.FC<Props> = ({ message, onClose, severity }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    onClose && onClose();
    setOpen(false);
  }, []);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
