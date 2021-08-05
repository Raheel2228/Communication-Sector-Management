import gql from 'graphql-tag';

export const ADD_NEW_DATA_CENTER_MUTATION = gql`
  mutation createDataCenter($input: CreateDataCenterInput!) {
    createDataCenter(input: $input) {
      dcId
    }
  }
`;

export const UPDATE_NEW_DATA_CENTER_MUTATION = gql`
  mutation updateDataCenter($input: UpdateDataCenterInput!) {
    updateDataCenter(input: $input) {
      dcId
    }
  }
`;

export const DELETE_DATA_CENTER_MUTATION = (ids: Array<string>) => gql`
  mutation deleteDataCenter{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteDataCenter(dcId: "${id}") {
      dcId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_CORE_SWITCH_MUTATION = gql`
  mutation createCoreSwitch($input: CreateCoreSwitchInput!) {
    createCoreSwitch(input: $input) {
      swName
    }
  }
`;

export const DELETE_CORE_SWITCH_MUTATION = (ids: Array<string>) => gql`
  mutation deleteCoreSwitch{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteCoreSwitch(swId: "${id}") {
      swId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_OLT_MUTATION = gql`
  mutation createOlt($input: CreateOltInput!) {
    createOlt(input: $input) {
      oltId
    }
  }
`;

export const ADD_NEW_OLT_SLOT_MUTATION = gql`
  mutation createOltSlot($input: CreateOltSlotInput) {
    createOltSlot(input: $input) {
      oltSlotId
    }
  }
`;

export const ADD_NEW_OLT_PORT_MUTATION = gql`
  mutation createOltPort($input: CreateOltPortInput) {
    createOltPort(input: $input) {
      oltPortId
    }
  }
`;

export const ADD_NEW_ODB_MUTATION = gql`
  mutation createOdb($input: CreateOdbInput) {
    createOdb(input: $input) {
      odbId
    }
  }
`;

export const UPDATE_ODB_MUATION = gql`
  mutation updateOdb($input: UpdateOdbInput) {
    updateOdb(input: $input) {
      odbId
    }
  }
`;

export const UPDATE_FDT_SPLITTER = gql`
  mutation updateFdtSplitter($input: UpdateFdtSplitterInput) {
    updateFdtSplitter(input: $input) {
      fdtSplitterId
    }
  }
`;

export const DELETE_OLT_MUTATION = (ids: Array<string>) => gql`
  mutation deleteOlt{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteOlt(oltId: "${id}") {
      oltId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_FDT_MUTATION = gql`
  mutation createFdt($input: CreateFdtInput!) {
    createFdt(input: $input) {
      fdtId
    }
  }
`;

export const DELETE_FDT_MUTATION = (ids: Array<string>) => gql`
  mutation deleteFdt{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteFdt(fdtId: "${id}") {
      fdtId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_FDT_SPLITTER_MUTATION = gql`
  mutation createFdtSplitter($input: CreateFdtSplitterInput!) {
    createFdtSplitter(input: $input) {
      fdtSplitterId
    }
  }
`;

export const DELETE_FDT_SPLITTER_MUTATION = (ids: Array<string>) => gql`
  mutation deleteFdtSplitter{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteFdtSplitter(fdtSplitterId: "${id}") {
      fdtSplitterId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_CPE_MUTATION = gql`
  mutation createCpe($input: CreateCpeInput!) {
    createCpe(input: $input) {
      cpeId
    }
  }
`;

export const DELETE_CPE_MUTATION = (ids: Array<string>) => gql`
  mutation deleteCpe{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteCpe(cpeId: "${id}") {
      cpeId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_CORE_SWITCH_SLOT_MUTATION = gql`
  mutation createCoreSwSlot($input: CreateCoreSwSlotInput!) {
    createCoreSwSlot(input: $input) {
      swSlotId
    }
  }
`;

export const DELETE_CORE_SWITCH_SLOTS_MUTATION = (ids: Array<string>) => gql`
  mutation deleteCoreSwSlot{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteCoreSwSlot(swSlotId: "${id}") {
      swSlotId
    }
    `,
      )
      .join(' ')}
  }
`;

export const ADD_NEW_CORE_SWITCH_PORT_MUTATION = gql`
  mutation createCoreSwPort($input: CreateCoreSwPortInput!) {
    createCoreSwPort(input: $input) {
      swPortId
    }
  }
`;

export const UPDATE_CORE_SWITCH_MUTATION = gql`
  mutation updateCoreSwitch($input: UpdateCoreSwitchInput) {
    updateCoreSwitch(input: $input) {
      swId
      swName
      dc {
        dcId
        dcName
        dcLocation {
          locationId
          locationName
        }
      }
      totalPorts
      capacity
      macAddress
      ipAddress
      modelName
      assetTag
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const UPDATE_CORE_SWITCH_SLOT = gql`
  mutation updateCoreSwSlot($input: UpdateCoreSwSlotInput) {
    updateCoreSwSlot(input: $input) {
      swSlotId
      swSlotNo
      coreSw {
        swId
        swName
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const UPDATE_CORE_SWITCH_PORT = gql`
  mutation updateCoreSwPort($input: UpdateCoreSwPortInput) {
    updateCoreSwPort(input: $input) {
      swPortId
      swPortNo
      defaultVlan
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const CREATE_CORE_CW_VLAN = gql`
  mutation createCoreSwVlan($input: CreateCoreSwVlanInput) {
    createCoreSwVlan(input: $input) {
      swVlanId
      swPort {
        swPortId
        swPortNo
        swSlot {
          swSlotId
          swSlotNo
          coreSw
          status
          statusChangeDate
          creationDate
        }
        defaultVlan
        status
        statusChangeDate
        creationDate
      }
      portNo
      vlan
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const DELETE_CORE_SWITCH_PORTS_MUTATION = (ids: Array<string>) => gql`
  mutation deleteCoreSwPort{
    ${ids
      .map(
        (id: string, index: number) => `
    m_${index}:deleteCoreSwPort(swPortId: "${id}") {
      swPortId
    }
    `,
      )
      .join(' ')}
  }
`;

export const UPDATE_OLT = gql`
  mutation updateOlt($input: UpdateOltInput!) {
    updateOlt(input: $input) {
      oltId
    }
  }
`;

export const UPDATE_FDT = gql`
  mutation updateFdt($input: UpdateFdtInput!) {
    updateFdt(input: $input) {
      fdtId
    }
  }
`;

export const UPDATE_OLT_SLOT = gql`
  mutation updateOltSlot($input: UpdateOltSlotInput!) {
    updateOltSlot(input: $input) {
      oltSlotId
    }
  }
`;
export const UPDATE_OLT_PORT = gql`
  mutation updateOltPort($input: UpdateOltPortInput!) {
    updateOltPort(input: $input) {
      oltPortId
    }
  }
`;
