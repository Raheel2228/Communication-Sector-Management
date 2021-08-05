import gql from 'graphql-tag';

export const UPDATE_SERVICE_CATALOG = gql`
  mutation updateServiceCatalogItem($input: UpdateServiceCatalogItemInput!) {
    updateServiceCatalogItem(input: $input) {
      serviceId
    }
  }
`;

export const CREATE_SERVICE_CATALOG = gql`
  mutation createServiceCatalogItem($input: CreateServiceCatalogItemInput!) {
    createServiceCatalogItem(input: $input) {
      serviceId
    }
  }
`;

export const DELETE_SERVICE_CATALOG_ITEM = (ids: Array<string>) => gql`
  mutation deleteServiceCatalogItem{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteServiceCatalogItem(serviceId: "${id}") {
      serviceId
    }
    `,
      )
      .join(' ')}
  }
`;
