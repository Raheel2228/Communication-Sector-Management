import React from 'react';
import * as Styles from './../styled.components';
import { TextField } from 'components/FormFields';
import { Grow } from '@material-ui/core';
import { useInput } from 'utils';

interface Props {
  toggleView: (view: string) => void;
  onSubmit: (username: string) => void;
}
const Auth: React.FC<Props> = ({ toggleView, onSubmit }) => {
  const { value: username, bind: bindUsername } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const _onSubmit = () => {
    setRequiredFieldError(false);
    username ? onSubmit(username) : setRequiredFieldError(true);
  };

  return (
    <Grow in={true}>
      <Styles.Form>
        <Styles.Title>Forgot your password?</Styles.Title>
        {requiredFieldError && <Styles.Error>Please fill in the required fields!</Styles.Error>}
        <TextField placeholder="Username" {...bindUsername} invalid={requiredFieldError && username === ''} />
        <Styles.Actions>
          <Styles.MyButton label="Reset Password" variant="round" onClick={_onSubmit} />
          <Styles.Link onClick={() => toggleView('signin')}>&lt;&lt;&nbsp;Go back to login</Styles.Link>
        </Styles.Actions>
      </Styles.Form>
    </Grow>
  );
};

export default Auth;
