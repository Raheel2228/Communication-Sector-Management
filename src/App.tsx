import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import {
  Auth,
  Home,
  UserProfile,
  B2CAccounts,
  AssetManagement,
  B2BCatalog,
  B2BSubscriptions,
  BillingManagement,
  OrderProcessing,
  ServiceAppointment,
  UserProfileEdit,
} from './routes';
import Amplify, { Auth as AmplifyAuth } from 'aws-amplify';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AWS_COGNITO } from 'configs';
import './App.css';

// TODO: move to asset_management as sub-routes
import DashboardLegacy from 'routes/AssetManagement/components/DashboardLegacy';
import DashboardQuickSight from 'routes/AssetManagement/components/DashboardQuickSight';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: AWS_COGNITO.cognito.REGION,
    userPoolId: AWS_COGNITO.cognito.USER_POOL_ID,
    userPoolWebClientId: AWS_COGNITO.cognito.APP_CLIENT_ID,
  },
});

const App: React.FC = () => {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const init = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
      setIsAuthenticated(true);
      AmplifyAuth.currentUserInfo().then(res => {
        localStorage.setItem('loginId', res.username);
      });
    } catch {
      setIsAuthenticated(false);
    }
    setIsAuthenticating(false);
  };

  React.useEffect(() => {
    init();
  }, []);

  const LogoutFakeComponent: React.FC = () => {
    const history = useHistory();
    const handleLogout = async () => {
      await AmplifyAuth.signOut();
    };
    React.useEffect(() => {
      setIsAuthenticated(false);
      handleLogout().then(() => {
        history.push('/auth');
      });
    }, []);

    return <h3>Logging out...</h3>;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route
              path="/auth"
              exact={true}
              render={props => {
                return <Auth isAuthenticated={isAuthenticated} {...props} />;
              }}
            />
            <Route path="/" exact={true} component={Home} />
            <Route path="/user_profile" exact={true} component={UserProfile} />
            <Route path="/b2c_accounts" exact={true} component={B2CAccounts} />
            <Route path="/billing_management" exact={true} component={BillingManagement} />
            <Route path="/service_appointment" exact={true} component={ServiceAppointment} />
            <Route path="/order_processing" exact={true} component={OrderProcessing} />
            <Route path="/order_management" exact={true} component={OrderProcessing} />
            <Route path="/asset_management" exact={true} component={AssetManagement} />
            <Route path="/b2b_catalog" exact={true} component={B2BCatalog} />
            <Route path="/user_profile_edit" exact={true} component={UserProfileEdit} />
            <Route path="/b2b_subscriptions" exact={true} component={B2BSubscriptions} />
            <Route path="/logout" exact={true} component={LogoutFakeComponent} />
            {/* TODO: move them to asset management as sub routes*/}
            <Route path="/asset_management/dashboard_legacy" exact={true} component={DashboardLegacy} />
            <Route path="/asset_management/dashboard" exact={true} component={DashboardQuickSight} />
          </Switch>
          {!isAuthenticated && !isAuthenticating && <Redirect to="/auth" />}
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
