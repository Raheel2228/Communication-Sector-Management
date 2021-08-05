import {
  GET_ALL_DATA_CENTERS,
  GET_ALL_CORE_SWITCHES,
  GET_ALL_CORE_SWITCH_SLOTS,
  GET_ALL_OLT,
  GET_ALL_FDT,
  GET_ALL_FDT_SPLITTER,
  GET_ALL_CPE,
  DELETE_DATA_CENTER_MUTATION,
  DELETE_CORE_SWITCH_MUTATION,
  DELETE_OLT_MUTATION,
  DELETE_FDT_MUTATION,
  DELETE_FDT_SPLITTER_MUTATION,
  DELETE_CPE_MUTATION,
  DELETE_CORE_SWITCH_SLOTS_MUTATION,
  DELETE_CORE_SWITCH_PORTS_MUTATION,
  GET_ALL_CORE_SWITCH_PORTS,
} from 'gql';
import { assetManagementClient } from 'configs';

export const DELETE_DATA_CENTER_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_DATA_CENTER_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_DATA_CENTERS,
          data: { getAllDataCenter: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting user data center(s)';
  }
};

export const DELETE_CORE_SWITCH_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_CORE_SWITCH_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_CORE_SWITCHES,
          data: { getAllCoreSwitch: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting core switches';
  }
};

export const DELETE_OLT_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_OLT_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_OLT,
          data: { getAllOlt: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting olt(s)';
  }
};

export const DELETE_FDT_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_FDT_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_FDT,
          data: { getAllFdt: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting fdt(s)';
  }
};

export const DELETE_FDT_SPLITTER_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_FDT_SPLITTER_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_FDT_SPLITTER,
          data: { getAllFdtSplitter: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting fdt splitter(s)';
  }
};

export const DELETE_CPE_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_CPE_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_CPE,
          data: { getAllCpe: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting CPE(s)';
  }
};

export const DELETE_CORE_SWITCH_SLOTS_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_CORE_SWITCH_SLOTS_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_CORE_SWITCH_SLOTS,
          data: { getAllCoreSwSlot: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting Core Switch Slot(s)';
  }
};

export const DELETE_CORE_SWITCH_PORTS_SERVICE = async (toBeDeleted: Array<string>, newRecords: $TSFixMe) => {
  try {
    await assetManagementClient.mutate({
      mutation: DELETE_CORE_SWITCH_PORTS_MUTATION(toBeDeleted),
      update(cache) {
        cache.writeQuery({
          query: GET_ALL_CORE_SWITCH_PORTS,
          data: { getAllSwPort: newRecords },
        });
      },
    });
  } catch {
    throw 'An error occurred while deleting Core Switch Port(s)';
  }
};
