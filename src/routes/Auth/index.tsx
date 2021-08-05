import React from 'react';
import { FullPageLoader } from 'components';
import { Redirect } from 'react-router-dom';

const Component = React.lazy(() => import('./main'));

interface Props {
  isAuthenticated?: boolean;
}

const Auth: React.FC<Props> = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <React.Suspense fallback={<FullPageLoader solid={true} />}>
      <Component />
    </React.Suspense>
  );
};

export default Auth;
