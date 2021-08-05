import ApolloClient from 'apollo-boost';
import { USER_PROFILE_GQL_API, ASSET_MANAGEMENT_GQL_API, B2B_CATALOG_AND_SUBSCRIPTION_GQL_API } from 'configs';
import DefaultClient from 'apollo-boost';

const clientFactory = (uri: string, key: string): DefaultClient<unknown> => {
  const accessToken = localStorage.getItem('access_token');
  return new ApolloClient({
    uri: uri,
    request: async operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${accessToken}`,
          'x-api-key': key,
        },
      });
    },
  });
};

// @TODO: should be removed once auth is implemented - bearer token should be used
const keys = {
  userProfileClient: 'da2-wyqt5cdxkjfi7pbz2773gswue4',
  assetManagementClient: 'da2-7vkhwmilfbgt7jxbzsacef56ma',
  b2bCatalogAndSubscriptionClient: 'da2-yblkafxm35e3hjx5pcll6gofim',
};

export const userProfileClient: DefaultClient<unknown> = clientFactory(USER_PROFILE_GQL_API, keys.userProfileClient);
export const assetManagementClient: DefaultClient<unknown> = clientFactory(
  ASSET_MANAGEMENT_GQL_API,
  keys.assetManagementClient,
);

export const b2bCatalogAndSubscriptionClient: DefaultClient<unknown> = clientFactory(
  B2B_CATALOG_AND_SUBSCRIPTION_GQL_API,
  keys.b2bCatalogAndSubscriptionClient,
);
