import React from 'react';
import { DialogWrapper, Text, Actions, Yes, No } from './styled.components';
import { EmailSuccessDialogContent } from 'components';
import { useMutation } from '@apollo/react-hooks';
import { SEND_NEW_CREDENTIALS_MUTATION } from 'gql';
import { Toast } from 'components';

interface Props {
  onExit?: () => void;
  payload?: $TSFixMe;
}

const NewUserCredentials: React.FC<Props> = ({ onExit, payload }) => {
  const [sendCredentials, { error }] = useMutation(SEND_NEW_CREDENTIALS_MUTATION);
  const [successDialog, setSuccessDialog] = React.useState(false);
  const { username } = payload;

  const confirm = (): void => {
    sendCredentials({
      variables: {
        username,
      },
    });
    setSuccessDialog(true);
  };

  const cancel = (): void => {
    onExit && onExit();
  };

  if (successDialog) return <EmailSuccessDialogContent message="The credential have been sent to end user’s email" />;
  return (
    <React.Fragment>
      <DialogWrapper>
        <Text>
          <h3>Would you like to send new credentials to end user?</h3>
          <p>Credentials means sending xyz</p>
        </Text>
        <Actions>
          <Yes onClick={confirm}>Yes</Yes>
          <No onClick={cancel}>No</No>
        </Actions>
      </DialogWrapper>
      {error && <Toast message={'An error occurred while sending credentails'} severity={'error'} />}
    </React.Fragment>
  );
};

export default NewUserCredentials;
