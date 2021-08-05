import React from 'react';
import { userProfileClient } from 'configs';
import { ApolloProvider } from '@apollo/react-hooks';
import { FullPageLoader } from 'components';
import { Auth as AmplifyAuth } from 'aws-amplify';

const Component = React.lazy(() => import('./UserEdit'));

const UserProfile: React.FC = () => {
  React.useEffect(() => {
    document.title = `Edit Profile`;
  });
  return (
    <React.Suspense fallback={<FullPageLoader solid={true} />}>
      <ApolloProvider client={userProfileClient}>
        <Component />
      </ApolloProvider>
    </React.Suspense>
  );
};

export default UserProfile;
