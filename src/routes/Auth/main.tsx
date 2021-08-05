import React, { useEffect } from 'react';
import { Logo } from 'components/assets';
import { FullPageLoader, Toast } from 'components';
import * as Styles from './styled.components';
import { Signup, Signin, ResetPassword, NewPassword, ForceNewPassword } from './components';
import { strip } from 'utils';
import { ApolloProvider } from '@apollo/react-hooks';
import { userProfileClient } from 'configs';
import { Auth as AmplifyAuth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const Auth: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [activeView, setActiveView] = React.useState('signin');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [user, setUser] = React.useState();

  const switchViewLabel = activeView === 'signup' ? 'Sign In' : 'Sign Up';
  const toggleView = (view: string) => setActiveView(view);
  const history = useHistory();

  useEffect(() => {
    document.title = `Login`;
  });

  const init = (): void => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
  };
  const handleSignUp = (
    personalInfo: PersonalInfo,
    companyInfo: CompanyInfo,
    location: string,
    serviceProvider: ServiceProvider,
  ) => {
    init();
    AmplifyAuth.signUp({
      username: personalInfo.username,
      password: personalInfo.password,
      attributes: {
        email: personalInfo.username,
        'custom:first_name': personalInfo.firstName,
        'custom:last_name': personalInfo.lastName,
        'custom:mobile_no': personalInfo.mobileNumber,
        'custom:company': companyInfo.companyName,
        'custom:location': location,
        'custom:group_id': companyInfo.group,
        'custom:sub_group_id': companyInfo.subgroup,
        'custom:group_category_id': companyInfo.category,
        'custom:manager_id': companyInfo.manager,
      },
    })
      .then(() => {
        setActiveView('signin');
        setSuccessMsg('Registration successful. Please verify your email!');
      })
      .catch(error => setErrorMsg(error.message))
      .finally(() => setLoading(false));
  };

  const handleSignIn = (username: string, password: string) => {
    init();
    AmplifyAuth.signIn(username, password)
      .then(_user => {
        if (_user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setUser(_user);
          setActiveView('forceNew');
        } else {
          history.push('/');
        }
      })
      .catch(error => setErrorMsg(error.message))
      .finally(() => setLoading(false));
  };

  const handleForceNewPassword = (newPassword: string) => {
    newPassword &&
      AmplifyAuth.completeNewPassword(user, newPassword, {})
        .then(() => {
          setSuccessMsg('Your password has been reset successfully!');
          history.push('/');
        })
        .catch(error => setErrorMsg(error.message));
  };

  const handleResetPassword = (username: string) => {
    init();
    AmplifyAuth.forgotPassword(username)
      .then(() => {
        setActiveView('new');
      })
      .catch(error => setErrorMsg(error.message))
      .finally(() => setLoading(false));
  };

  const handleNewPassword = (username: string, code: string, newPassword: string) => {
    init();
    AmplifyAuth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        setActiveView('signin');
        setSuccessMsg('Your password has been reset successfully!');
      })
      .catch(error => setErrorMsg(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <FullPageLoader />}
      {errorMsg && <Toast message={errorMsg} severity="error" />}
      {successMsg && <Toast message={successMsg} severity="success" />}
      <Styles.Wrapper>
        <Styles.LeftColumn>
          <Styles.LogoWrapper>
            <Logo type={'alt'} height={30} />
            <Styles.ButtonWrapper className="smallScreen">
              <Styles.MyButton
                label={switchViewLabel}
                variant="round"
                onClick={() => toggleView(strip(switchViewLabel))}
              />
            </Styles.ButtonWrapper>
          </Styles.LogoWrapper>
          {activeView === 'signup' && (
            <ApolloProvider client={userProfileClient}>
              <Signup onSubmit={handleSignUp} />
            </ApolloProvider>
          )}
          {activeView === 'signin' && <Signin toggleView={toggleView} onSubmit={handleSignIn} />}
          {activeView === 'reset' && <ResetPassword toggleView={toggleView} onSubmit={handleResetPassword} />}
          {activeView === 'new' && <NewPassword toggleView={toggleView} onSubmit={handleNewPassword} />}
          {activeView === 'forceNew' && <ForceNewPassword toggleView={toggleView} onSubmit={handleForceNewPassword} />}
          <Styles.FooterLinks>
            <Styles.Link>Terms &amp; Conditions</Styles.Link>
            <Styles.Link>Privacy Policy</Styles.Link>
            <Styles.Link>Help Desk</Styles.Link>
          </Styles.FooterLinks>
        </Styles.LeftColumn>
        <Styles.RightColumn>
          <Styles.ButtonWrapper>
            <Styles.MyButton
              label={switchViewLabel}
              variant="round"
              onClick={() => toggleView(strip(switchViewLabel))}
            />
          </Styles.ButtonWrapper>
        </Styles.RightColumn>
      </Styles.Wrapper>
    </>
  );
};

export default Auth;
