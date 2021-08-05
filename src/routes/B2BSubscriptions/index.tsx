import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { FullPageLoader } from 'components';
import { b2bCatalogAndSubscriptionClient } from 'configs';

const Component = React.lazy(() => import('./main'));

const RouteWrapper: React.FC = () => {
  return (
    <React.Suspense fallback={<FullPageLoader solid={true} />}>
      <ApolloProvider client={b2bCatalogAndSubscriptionClient}>
        <Component />
      </ApolloProvider>
    </React.Suspense>
  );
};

export default RouteWrapper;
