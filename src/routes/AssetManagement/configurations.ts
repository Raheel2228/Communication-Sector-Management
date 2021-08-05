import { AddBox, Delete, Sort, Fullscreen } from '@material-ui/icons';

export const tabs: Array<Tab> = [
  { name: 'dc', title: 'DC' },
  { name: 'coreSwitches', title: 'Core Switches', child: 'coreSwitchSlots' },
  { name: 'coreSwitchSlots', title: 'Core Switch: Slots', child: 'coreSwitchPorts', isNested: true },
  { name: 'coreSwitchPorts', title: 'Core Switch: Ports', isNested: true },
  { name: 'olt', title: 'OLT', child: 'oltSlots' },
  { name: 'oltSlots', title: 'OLT: Slots', child: 'oltPorts', isNested: true },
  { name: 'oltPorts', title: 'OLT: Ports', isNested: true },
  { name: 'fdt', title: 'FDT' },
  { name: 'fdtSplitter', title: 'FDT Splitter' },
  { name: 'odb', title: 'ODB' },
  { name: 'odbSdu', title: 'ODB SDU' },
  { name: 'odbMdu', title: 'ODB MDU' },
  { name: 'cpe', title: 'CPE' },
];

export const tabsToDataMap = {
  dc: 'getAllDataCenter',
  coreSwitches: 'getAllCoreSwitch',
  coreSwitchSlots: 'getAllCoreSwSlot',
  coreSwitchPorts: 'getAllCoreSwPort',
  olt: 'getAllOlt',
  oltSlots: 'getAllOltSlot',
  oltPorts: 'getAllOltPort',
  fdt: 'getAllFdt',
  fdtSplitter: 'getAllFdtSplitter',
  odb: 'getAllOdb',
  odbSdu: 'getAllOdb',
  odbMdu: 'getAllOdb',
  cpe: 'getAllCpe',
};

export const tabsToTitleMap = {
  dc: 'Data Centers',
  coreSwitches: 'Core Switches',
  coreSwitchSlots: 'Core Switches: Slots',
  coreSwitchPorts: 'Core Switches: Ports',
  olt: 'OLT',
  oltSlots: 'OLT: Slots',
  oltPorts: 'OLT: Ports',
  fdt: 'FDT',
  fdtSplitter: 'FDT Splitters',
  cpe: 'CPE',
};

export const tabsToUidsMap = {
  dc: 'dcId',
  coreSwitches: 'swId',
  coreSwitchSlots: 'swSlotId',
  coreSwitchPorts: 'swPortId',
  olt: 'oltId',
  oltSlots: 'oltSlotId',
  odbSdu: 'odbId',
  odbMdu: 'odbId',
  oltPorts: 'oltPortId',
  fdt: 'fdtId',
  fdtSplitter: 'fdtSplitterId',
  cpe: 'cpeId',
};

export const tabsToDrawer = {
  dc: 'DATA_CENTER',
  coreSwitches: 'CORE_SWITCH',
  coreSwitchSlots: 'CORE_SWITCH_SLOT',
  coreSwitchPorts: 'CORE_SWITCH_PORT',
  odbSdu: 'ODB',
  odbMdu: 'ODB',
  fdt: 'FDT',
  fdtSplitter: 'FDT_SPLITTER',
  olt: 'OLT',
  oltSlots: 'OLT_SLOT',
  oltPorts: 'OLT_PORT',
};

export const tabsToParentUidsMap = {
  coreSwitchSlots: 'coreSw.swId',
  coreSwitchPorts: 'swSlot.swSlotId',
  oltSlots: 'olt.oltId',
  oltPorts: 'oltSlot.oltSlotId',
};

export const columnDefsGenerator = (onCellClicked, childTab: ChildTabProps | undefined) => [
  {
    field: 'info',
    width: 20,
    checkboxSelection: true,
    flex: 1,
    cellRenderer: 'TextCellRenderer',
    onCellClicked,
  },
  {
    field: 'status',
    cellRenderer: 'StatusCellRenderer',
    cellRendererParams: {
      childTab,
    },
  },
];

export const filtersRowGenerator = (selectAll, active, inactive, onChange) => [
  {
    color: 'blue',
    label: 'Select All',
    checked: selectAll,
    onChange: onChange,
  },
  {
    color: 'green',
    label: 'Active',
    checked: active,
    onChange: onChange,
  },
  {
    color: 'red',
    label: 'Inactive',
    checked: inactive,
    onChange: onChange,
  },
];

export const actionButtonsGenerator = (activeTab: string, onClick): $TSFixMe => {
  if (activeTab === 'dc') {
    return [{ label: 'Download', onClick }];
  }
  return [];
};

export const sortablesGenerator = (activeTab: string): Array<string> => {
  if (activeTab === 'dc') {
    return ['Data Center ID', 'Data Center Name', 'Data Center Location'];
  } else if (activeTab === 'coreSwitches') {
    return ['Data Center Name', 'Asset Tag', 'Name'];
  } else if (activeTab === 'coreSwitchSlots') {
    return ['Core Switch Name', 'Slot'];
  } else if (activeTab === 'coreSwitchPorts') {
    return ['Core Switch Name', 'Slot', 'Port'];
  }
  return [];
};

export const iconButtonsGenerator = (
  onClickAddBox,
  onClickDelete,
  onClickSort,
  onClickFullscreen,
  rowSelected: boolean,
) => [
  {
    icon: AddBox,
    onclick: onClickAddBox,
    active: true,
  },
  {
    icon: Delete,
    onclick: onClickDelete,
    active: rowSelected,
  },
  {
    icon: Sort,
    onclick: onClickSort,
    active: true,
  },
  {
    icon: Fullscreen,
    onclick: onClickFullscreen,
    active: true,
  },
];
