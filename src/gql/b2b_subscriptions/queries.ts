import gql from 'graphql-tag';
// TODO: rspId to be made Dynamic
// Front End implemented
export const GET_ALL_SERVICE_SUBSCRIPTIONS = gql`
  query getAllServiceSubscriptionForRsp {
    getAllServiceSubscriptionForRsp(rspId: 1) {
      subscriptionId
      rspId
      subsCreationDate
      subsStartDate
      subsEndDate
      subsYrc
      subsNrc
      taxAmount
      totalAmount
      autoRenewFlag
      lockCatService
      createdBy
      serviceDetails {
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
      status
      statusChangeDate
    }
  }
`;

export const GET_SERVICE_SUBSCRIPTIONS = gql`
query getServiceSubscriptionForRsp($input: GetDeleteLockServiceSubscriptionInput!) {
  getServiceSubscriptionForRsp(input: $input) {
    subscriptionId
    rspId
    subsCreationDate
    subsStartDate
    subsEndDate
    subsYrc
    subsNrc
    taxAmount
    totalAmount
    autoRenewFlag
    lockCatService
    createdBy
    serviceDetails {
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
    status
    statusChangeDate
  }
}
`;
