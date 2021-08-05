import React from 'react';
import { Wrapper, Message } from './styled.components';
import { ReactComponent as EmailSuccess } from 'components/assets/icons/email_success.svg';

interface Props {
  message: string;
}

const EmailSuccessDialogContent: React.FC<Props> = ({ message }) => {
  return (
    <Wrapper>
      <EmailSuccess width={130} height={100} />
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default EmailSuccessDialogContent;
