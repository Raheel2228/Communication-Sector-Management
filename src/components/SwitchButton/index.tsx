import React from 'react';
import Button from '@material-ui/core/Button';
import { Wrapper } from './styled.components';
interface Props {
  onText: string;
  offText: string;
  status?: boolean;
  onClick?: () => void;
}

const SwitchButton: React.FC<Props> = ({ onText, offText, status, onClick }) => {
  const [toggle, setToggle] = React.useState<boolean | undefined>();

  React.useEffect(() => {
    setToggle(status);
  }, [status]);

  return (
    <Wrapper onClick={onClick}>
      <Button
        variant="contained"
        onClick={() => setToggle(!toggle)}
        color="default"
        style={{ borderRadius: '0px' }}
        className={toggle ? 'active' : ''}
      >
        {onText}
      </Button>
      <Button
        variant="contained"
        onClick={() => setToggle(!toggle)}
        color="default"
        style={{ borderRadius: '0px' }}
        className={!toggle ? 'inactive' : ''}
      >
        {offText}
      </Button>
    </Wrapper>
  );
};

export default SwitchButton;
