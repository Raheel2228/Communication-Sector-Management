import gql from 'graphql-tag';

export const GET_ALL_DATA_CENTERS = gql`
  query getAllDataCenter {
    getAllDataCenter {
      dcId
      dcName
      dcLocation {
        locationId
        locationName
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_DATA_CENTER = gql`
  query getDataCenter($dcId: ID!) {
    getDataCenter(dcId: $dcId) {
      dcId
      dcName
      dcLocation {
        locationId
        locationName
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_CORE_SWITCHES = gql`
  query getCoreSwitch {
    getAllCoreSwitch {
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

export const GET_CORE_SWITCH = gql`
  query getCoreSwitch($swId: ID!) {
    getCoreSwitch(swId: $swId) {
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

export const GET_ALL_CORE_SWITCH_SLOTS = gql`
  query getAllCoreSwSlot {
    getAllCoreSwSlot {
      swSlotId
      swSlotNo
      coreSw {
        swId
        swName
        ipAddress
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_CORE_SWITCH_SLOT = gql`
  query getCoreSwSlot($swSlotId: ID!) {
    getCoreSwSlot(swSlotId: $swSlotId) {
      swSlotId
      swSlotNo
      coreSw {
        swId
        swName
        ipAddress
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_CORE_SWITCH_PORTS = gql`
  query getAllCoreSwPort {
    getAllCoreSwPort {
      swPortId
      swPortNo
      swSlot {
        swSlotId
        swSlotNo
        coreSw {
          swId
          swName
          ipAddress
        }
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_CORE_SWITCH_PORT = gql`
  query getCoreSwPort($swPortId: ID!) {
    getCoreSwPort(swPortId: $swPortId) {
      swPortId
      swPortNo
      defaultVlan
      swSlot {
        swSlotId
        swSlotNo
        coreSw {
          swId
          swName
          ipAddress
        }
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_OLT = gql`
  query getAllOlt {
    getAllOlt {
      oltId
      oltName
      dc {
        dcId
        dcName
        dcLocation {
          locationId
          locationName
        }
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_CORE_SW_VLAN = gql`
  query getCoreSwVlan($swVlanId: ID!) {
    getCoreSwVlan(swVlanId: $swVlanId) {
      swVlanId
      swPort
      portNo
      vlan
      status
    }
  }
`;

export const GET_OLT = gql`
  query getOlt($oltId: ID!) {
    getOlt(oltId: $oltId) {
      oltId
      oltName
      dc {
        dcId
        dcName
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_FDT = gql`
  query getAllFdt {
    getAllFdt {
      fdtId
      fdtName
      latitude
      longitude
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_FDT = gql`
  query getFdt($fdtId: ID!) {
    getFdt(fdtId: $fdtId) {
      fdtId
      fdtName
      latitude
      longitude
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_FDT_SPLITTER = gql`
  query getFdtSplitter($fdtSplitterId: ID!) {
    getFdtSplitter(fdtSplitterId: $fdtSplitterId) {
      fdtSplitterId
      fdt {
        fdtId
        fdtName
        latitude
        longitude
      }
      fdtPort
      fdtSplitterType
      fdtSplitterNo
      priOltPort {
        oltPortId
        oltPortNo
        oltSlot {
          oltSlotId
          oltSlotNo
          olt {
            oltId
            oltName
            dc {
              dcId
              dcName
            }
          }
        }
        status
      }
      status
    }
  }
`;

export const GET_ALL_FDT_SPLITTER = gql`
  query getAllFdtSplitter {
    getAllFdtSplitter {
      fdtSplitterId
      fdt {
        fdtId
        fdtName
        latitude
        longitude
        status
        statusChangeDate
        creationDate
      }
      fdtPort
      fdtSplitterType
      fdtSplitterNo
      priOltPort {
        oltPortId
        oltPortNo
        oltSlot {
          oltSlotId
          oltSlotNo
          olt {
            oltId
            oltName
            dc {
              dcId
              dcName
            }
          }
        }
        status
        statusChangeDate
        creationDate
      }
      secOltPort {
        oltPortId
        oltPortNo
        oltSlot {
          oltSlotId
          oltSlotNo
          creationDate
          statusChangeDate
        }
        status
        statusChangeDate
        creationDate
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ODB = gql`
  query getOdb($odbId: ID!) {
    getOdb(odbId: $odbId) {
      odbId
      odbName
      odbType
      fdtSplitterPort {
        fdtSplitterPortId
        fdtSplitter {
          fdtSplitterId
          priOltPort {
            oltPortId
            oltPortNo
            oltSlot {
              oltSlotId
              olt {
                oltName
                dc {
                  dcId
                  dcName
                }
              }
            }
          }
          fdt {
            fdtName
          }
        }
        fdtSplitterPortNo
        fdtSplitterPortType
        status
        statusChangeDate
        creationDate
      }
      odbSplitterType
      odbSplitterShelf
      area
      street
      street1
      latitude
      longitude
      status
    }
  }
`;

export const GET_ALL_FDT_ODB = gql`
  query getAllOdb {
    getAllOdb {
      odbId
      odbName
      odbType
      fdtSplitterPort {
        fdtSplitterPortId
        fdtSplitter {
          fdtSplitterId
        }
        fdtSplitterPortNo
        fdtSplitterPortType
        status
        statusChangeDate
        creationDate
      }
      odbSplitterType
      area
      street
      street1
      latitude
      longitude
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_CPE = gql`
  query getAllCpe {
    getAllCpe {
      cpeId
      cpeSerialNo
      cpeMacAddress
      cpeModel
      cpeSwVersion
      cpeAssetTag
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_DC_LOCATIONS = gql`
  query getAllDCLocation {
    getAllDcLocation {
      locationId
      locationName
    }
  }
`;

export const GET_ALL_OLT_SLOTS = gql`
  query getAllOltSlot {
    getAllOltSlot {
      oltSlotId
      oltSlotNo
      olt {
        oltId
        oltName
        dc {
          dcId
          dcName
        }
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_OLT_PORTS = gql`
  query getAllOltSlot {
    getAllOltPort {
      oltPortId
      oltPortNo
      oltSlot {
        oltSlotId
        oltSlotNo
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_ALL_FDT_SPLITTER_PORTS = gql`
  query getAllFdtSplitterPort {
    getAllFdtSplitterPort {
      fdtSplitterPortId
      fdtSplitterPortNo
      fdtSplitter {
        fdtSplitterId
      }
    }
  }
`;

export const GET_OLT_SLOT = gql`
  query getOltSlot($oltSlotId: ID!) {
    getOltSlot(oltSlotId: $oltSlotId) {
      oltSlotId
      oltSlotNo
      olt {
        oltId
        oltName
        dc {
          dcId
          dcName
        }
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;

export const GET_OLT_PORT = gql`
  query getOltPort($oltPortId: ID!) {
    getOltPort(oltPortId: $oltPortId) {
      oltPortId
      oltPortNo
      oltSlot {
        oltSlotId
      }
      status
      statusChangeDate
      creationDate
    }
  }
`;
