import React from 'react';
import { ReactComponent as EmailSuccess } from 'components/assets/icons/email_success.svg';
import { TextField, EmailSuccessDialogContent } from 'components';
import { Button } from 'components';
import { Image, Attachment, Close } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { DialogWrapper, CloseButton, Title, Recipient, MyTag, Content, Action } from './styled.components';

interface Props {
  onExit?: () => void;
  payload?: $TSFixMe;
}

const NewEmail: React.FC<Props> = ({ onExit, payload }) => {
  const [successDialog, setSuccessDialog] = React.useState(false);
  const [emailSubject, setEmailSubject] = React.useState();
  const [emailBody, setEmailBody] = React.useState();
  const [emails, setEmails] = React.useState(payload);

  const confirm = (): void => {
    console.log(emails, emailSubject, emailBody);
    setSuccessDialog(true);
  };

  const cancel = (): void => {
    onExit && onExit();
  };
  if (successDialog) return <EmailSuccessDialogContent message="The email was sent successfully!" />;
  return (
    <DialogWrapper>
      <CloseButton onClick={cancel}>
        <IconButton>
          <Close />
        </IconButton>
      </CloseButton>
      <Title>
        <EmailSuccess width={30} />
        <h3>Email</h3>
      </Title>
      <Recipient>
        <span>To: </span>
        {payload?.map(item => {
          let emailName = item.name;
          return (
            <MyTag
              closable
              onClose={values => {
                console.log(emailName);
                const updatedEmails = emails.filter(item => {
                  return item.name !== emailName;
                });
                setEmails(updatedEmails);
              }}
            >
              {`${item.name} <${item.email}>`}
            </MyTag>
          );
        })}
      </Recipient>
      <Content>
        <TextField
          value={emailSubject && emailSubject}
          onChange={e => setEmailSubject(e.currentTarget.value)}
          placeholder="Subject"
        />
        <TextField
          value={emailBody && emailBody}
          onChangeTextArea={e => setEmailBody(e.currentTarget.value)}
          placeholder="Subject"
          mode="textarea"
          autoSize={{ minRows: 10 }}
        />
      </Content>
      <Action>
        <Button onClick={confirm} label={'Send'} />
        <Tooltip title="Attach Files">
          <IconButton>
            <Attachment color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Attach Image">
          <IconButton>
            <Image color="primary" />
          </IconButton>
        </Tooltip>
      </Action>
    </DialogWrapper>
  );
};

export default NewEmail;
