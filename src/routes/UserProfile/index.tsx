import React from 'react';
import { userProfileClient } from 'configs';
import { ApolloProvider } from '@apollo/react-hooks';
import { FullPageLoader } from 'components';

const Component = React.lazy(() => import('./main'));

const UserProfile: React.FC = () => {
  return (
    <React.Suspense fallback={<FullPageLoader solid={true} />}>
      <ApolloProvider client={userProfileClient}>
        <Component />
      </ApolloProvider>
    </React.Suspense>
  );
};

export default UserProfile;
