import gql from 'graphql-tag';

export const CREATE_CATALOG_SUBSCRIPTIONS = gql`
  mutation createServiceSubscription($input: CreateServiceSubscriptionInput!) {
    createServiceSubscription(input: $input) {
      subscriptionId
    }
  }
`;

export const UPDATE_CATALOG_SUBSCRIPTIONS = gql`
  mutation updateServiceSubscription($input: UpdateServiceSubscriptionInput!) {
    updateServiceSubscription(input: $input) {
      subscriptionId
    }
  }
`;

export const DELETE_B2B_CATALOG_SUBSCRIPTIONS = (ids: Array<string>, rspId: number) => gql`
  mutation deleteServiceSubscription{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteServiceSubscription(input:{subscriptionId:${id},rspId:${rspId}}) {
      subscriptionId
    }
    `,
      )
      .join(' ')}
  }
`;
