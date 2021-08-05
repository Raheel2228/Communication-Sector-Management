import gql from 'graphql-tag';

export const GET_ALL_SERVICE_CATALOG = gql`
  query getAllServiceCatalogItem {
    getAllServiceCatalogItem {
      serviceId
      serviceName
      serviceType
      serviceCategory
      pkgDisplayName
      serviceConfig {
        connectionType
        capacity
        capacityUnit
        maxUploadCapacity
        maxDownloadCapacity
        classACapacity
        classBCapacity
        classCCapacity
        classDCapacity
      }
      nrc
      yrc
      status
      creationDate
    }
  }
`;

export const GET_SERVICE_CATALOG = gql`
  query getServiceCatalogItem($serviceId: ID!) {
    getServiceCatalogItem(serviceId: $serviceId) {
      serviceId
      serviceName
      serviceType
      serviceCategory
      pkgDisplayName
      serviceConfig {
        connectionType
        capacity
        capacityUnit
        maxUploadCapacity
        maxDownloadCapacity
        classACapacity
        classBCapacity
        classCCapacity
        classDCapacity
      }
      nrc
      yrc
      status
      creationDate
    }
  }
`;
export const GET_CONNECTION_TYPES = gql`
query fetchB2bConnectionType{
  __type(name: "ConnectionType"){
    name
    enumValues{
      key:name
      label:name
      value:name
    }
  }
}
`;
