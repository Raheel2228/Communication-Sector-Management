import React from 'react';
import * as Styles from './../styled.components';
import { TextField } from 'components/FormFields';
import { Grow } from '@material-ui/core';
import { useInput } from 'utils';

interface Props {
  toggleView: (view: string) => void;
  onSubmit: (username: string, code: string, newPassword: string) => void;
}
const Auth: React.FC<Props> = ({ toggleView, onSubmit }) => {
  const { value: username, bind: bindUsername } = useInput('');
  const { value: code, bind: bindCode } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const _onSubmit = () => {
    setRequiredFieldError(false);
    username && code && password && password === confirmPassword
      ? onSubmit(username, code, password)
      : setRequiredFieldError(true);
  };

  return (
    <Grow in={true}>
      <Styles.Form>
        <Styles.Title>Reset your password</Styles.Title>
        {requiredFieldError && <Styles.Error>Please fill in the required fields!</Styles.Error>}
        <TextField placeholder="Email/Username" {...bindUsername} invalid={requiredFieldError && username === ''} />
        <TextField placeholder="Email Code" {...bindCode} invalid={requiredFieldError && code === ''} />
        <TextField
          placeholder="Password"
          mode="password"
          {...bindPassword}
          invalid={requiredFieldError && (password === '' || password !== confirmPassword)}
        />
        <TextField
          placeholder="Confirm Password"
          mode="password"
          {...bindConfirmPassword}
          invalid={requiredFieldError && (confirmPassword === '' || password !== confirmPassword)}
        />
        <Styles.Actions>
          <Styles.MyButton label="Update Password" variant="round" onClick={_onSubmit} />
          <Styles.Link onClick={() => toggleView('signin')}>&lt;&lt;&nbsp;Go back to login</Styles.Link>
        </Styles.Actions>
      </Styles.Form>
    </Grow>
  );
};

export default Auth;
