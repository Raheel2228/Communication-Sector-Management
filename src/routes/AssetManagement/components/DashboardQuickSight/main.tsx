import React, { useEffect } from 'react';
import { Dashboard } from 'layouts';
import { Wrapper } from './styled.components';
import Iframe from 'react-iframe';
import Axios from 'axios';
import { FullPageLoader, LoadingError } from 'components';

const Container: React.FC = () => {
  const [url, setUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const getEmbedUrl = () => {
    Axios.get('https://az7nqvucxa.execute-api.us-east-1.amazonaws.com/prod/get-dashboard-embed-url')
      .then(({ data: { body } }) => {
        const { EmbedUrl } = JSON.parse(body);
        setUrl(EmbedUrl);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
        console.error(error);
      });
  };
  React.useEffect(() => {
    // init
    getEmbedUrl();

    const interval = setInterval(() => getEmbedUrl(), 300000 - 100); // refresh after 5 mins - 100 ms
    return () => clearInterval(interval);
  }, []);

  return (
    <Dashboard>
      <Wrapper>
        {loading && <FullPageLoader />}
        {error && <LoadingError />}
        {!loading && !error && (
          <Iframe url={url} width="1280px" height="800px" display="block" position="relative" frameBorder={0} />
        )}
      </Wrapper>
    </Dashboard>
  );
};

export default Container;
