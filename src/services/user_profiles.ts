import { GET_USER_PROFILES_QUERY, DELETE_USER_PROFILE_MUTATION, GET_ALL_GROUPS_QUERY } from 'gql';
import { userProfileClient } from 'configs';

export const DELETE_USER_PROFILES_SERVICE = async (toBeDeleted: Array<string>, newUserProfilesList) => {
  try {
    await userProfileClient.mutate({
      mutation: DELETE_USER_PROFILE_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_USER_PROFILES_QUERY,
          data: { getAllUserProfiles: newUserProfilesList },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting user profiles(s)';
  }
};

export const GET_GROUPS_SERVICE = async () => {
  try {
    return await userProfileClient.query({ query: GET_ALL_GROUPS_QUERY });
  } catch {
    throw 'An error occurred while fetching groups';
  }
};
