import gql from 'graphql-tag';

export const GET_USER_PROFILES_QUERY = gql`
  query getAllUserProfiles {
    getAllUserProfiles {
      userId
      username
      firstName
      lastName
      mobileNo
      company
      creationDate
      statusChangeDt
      status
      loginId
      location {
        locationId
      }
      manager {
        managerId
        managerName
        managerEmail
      }
      group {
        groupId
        groupName
      }
      subGroup {
        subGroupId
        subGroupName
      }
      groupCategory {
        groupCategoryId
        groupCategoryName
      }
    }
  }
`;

export const GET_USER_PROFILE_QUERY = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(loginId: $id) {
      userId
      username
      firstName
      lastName
      mobileNo
      company
      location {
        locationId
      }
      statusChangeDt
      status
      loginId
      manager {
        managerId
        managerName
        managerEmail
      }
      group {
        groupId
        groupName
      }
      subGroup {
        subGroupId
        subGroupName
      }
      groupCategory {
        groupCategoryId
        groupCategoryName
      }
    }
  }
`;

export const GET_ALL_GROUPS_QUERY = gql`
  query getGroups {
    getAllGroups {
      groupId
      groupName
      subGroup {
        subGroupId
        subGroupName
        groupCategory {
          groupCategoryId
          groupCategoryName
        }
      }
    }
  }
`;

export const GET_ALL_LOCATIONS_QUERY = gql`
  query getLocations {
    getLocations {
      locationId
      locationName
      creationDate
    }
  }
`;

export const GET_ALL_MANAGERS_QUERY = gql`
  query getAllUserManager {
    getAllUserManager {
      managerId
      managerName
      managerEmail
    }
  }
`;
