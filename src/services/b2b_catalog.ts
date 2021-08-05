import { GET_ALL_SERVICE_CATALOG, DELETE_SERVICE_CATALOG_ITEM } from 'gql';
import { b2bCatalogAndSubscriptionClient } from 'configs';

export const DELETE_B2B_CATALOG_ITEM_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await b2bCatalogAndSubscriptionClient.mutate({
      mutation: DELETE_SERVICE_CATALOG_ITEM(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_SERVICE_CATALOG,
          data: { getAllServiceCatalogItem: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting service catalog item(s)';
  }
};
