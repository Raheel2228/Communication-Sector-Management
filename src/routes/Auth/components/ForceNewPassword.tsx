import React from 'react';
import * as Styles from './../styled.components';
import { TextField } from 'components/FormFields';
import { Grow } from '@material-ui/core';
import { useInput } from 'utils';

interface Props {
  toggleView: (view: string) => void;
  onSubmit: (newPassword: string) => void;
}
const Auth: React.FC<Props> = ({ toggleView, onSubmit }) => {
  const { value: password, bind: bindPassword } = useInput('');
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const _onSubmit = () => {
    setRequiredFieldError(false);
    password && password === confirmPassword ? onSubmit(password) : setRequiredFieldError(true);
  };

  return (
    <Grow in={true}>
      <Styles.Form>
        <Styles.Title>Set new Password</Styles.Title>
        <Styles.Error>You must change your password before proceeding!</Styles.Error>
        {requiredFieldError && <Styles.Error>Please fill in the required fields!</Styles.Error>}
        <TextField
          placeholder="New Password"
          mode="password"
          {...bindPassword}
          invalid={requiredFieldError && (password === '' || password !== confirmPassword)}
        />
        <TextField
          placeholder="Confirm New Password"
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
