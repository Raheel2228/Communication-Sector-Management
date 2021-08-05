import React from 'react';
import * as Styles from './../styled.components';
import { TextField } from 'components/FormFields';
import { Grow } from '@material-ui/core';
import { useInput } from 'utils';
interface Props {
  toggleView: (view: string) => void;
  onSubmit: (username: string, password: string) => void;
}
const Auth: React.FC<Props> = ({ toggleView, onSubmit }) => {
  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const [requiredFieldError, setRequiredFieldError] = React.useState(false);

  const _onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequiredFieldError(false);
    username && password ? onSubmit(username, password) : setRequiredFieldError(true);
  };

  return (
    <Grow in={true}>
      <Styles.Form onSubmit={_onSubmit}>
        <Styles.Title>Log in to your account</Styles.Title>
        {requiredFieldError && <Styles.Error>Please fill in the required fields!</Styles.Error>}
        <TextField placeholder="Username" invalid={requiredFieldError && username === ''} {...bindUsername} />
        <TextField
          placeholder="Password"
          mode={'password'}
          invalid={requiredFieldError && password === ''}
          {...bindPassword}
        />
        <Styles.Actions>
          <Styles.MyButton label="Sign in" variant="round" type="submit" />
          <Styles.Link onClick={() => toggleView('reset')}>Forgot Password?</Styles.Link>
        </Styles.Actions>
      </Styles.Form>
    </Grow>
  );
};

export default Auth;
