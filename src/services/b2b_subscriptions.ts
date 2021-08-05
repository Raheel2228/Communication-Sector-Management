import { GET_ALL_SERVICE_SUBSCRIPTIONS, DELETE_B2B_CATALOG_SUBSCRIPTIONS } from 'gql';
import { b2bCatalogAndSubscriptionClient } from 'configs';

export const DELETE_B2B_CATALOG_SUBSCRIPTIONS_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe, rspId: number) => {
    try {
        await b2bCatalogAndSubscriptionClient.mutate({
            mutation: DELETE_B2B_CATALOG_SUBSCRIPTIONS(toBeDeleted,rspId),
            update(cache) {
                cache.writeQuery({
                    query: GET_ALL_SERVICE_SUBSCRIPTIONS,
                    data: { getAllServiceSubscriptionForRsp: newRecords },
                });
            },
        });
    } catch {
        throw 'An error occurred while deleting service catalog item(s)';
    }
};
