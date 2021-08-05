import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';

import { FullPageLoader } from 'components';
import { assetManagementClient } from 'configs';

const Component = React.lazy(() => import('./main'));

const RouteWrapper: React.FC = () => {
  return (
    <React.Suspense fallback={<FullPageLoader solid={true} />}>
      <ApolloProvider client={assetManagementClient}>
        <Component />
      </ApolloProvider>
    </React.Suspense>
  );
};

export default RouteWrapper;
