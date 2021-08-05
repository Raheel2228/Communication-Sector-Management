import gql from 'graphql-tag';

export const DELETE_USER_PROFILE_MUTATION = (ids: Array<string>) => gql`
  mutation deleteUserProfile{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteUserProfile(username: "${id}") {
      userId
      username
      firstName
      lastName
      mobileNo
      company
      location{
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
    `,
      )
      .join(' ')}
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
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

export const SEND_NEW_CREDENTIALS_MUTATION = gql`
  mutation sendCredentials($username: ID!) {
    adminResetPassword(username: $username) {
      userId
    }
  }
`;

export const CREATE_NEW_USER_MUTATION = gql`
  mutation createUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      userId
      username
      firstName
      lastName
      mobileNo
      company
      creationDate
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
