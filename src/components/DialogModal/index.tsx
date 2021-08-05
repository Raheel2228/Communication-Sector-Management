import React from 'react';
import Dialog from '@material-ui/core/Dialog';

interface ChildProps {
  onExit?: () => void;
  payload?: $TSFixMe;
}
interface Props {
  show?: boolean;
  onExit?: () => void;
  render: React.FC<ChildProps>;
  payload?: $TSFixMe;
}

const DialogModal: React.FC<Props> = ({ show, onExit, render, payload }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (show) setOpen(show);
  }, [show]);

  const onCloseHandle = (): void => {
    onExit && onExit();
    setOpen(!open);
  };
  const Content = render;
  return (
    <>
      <Dialog
        open={open}
        onClose={onCloseHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <Content onExit={onCloseHandle} payload={payload} />
      </Dialog>
    </>
  );
};

export default DialogModal;
