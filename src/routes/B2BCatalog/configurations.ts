import { AddBox, Delete, Sort, Fullscreen } from '@material-ui/icons';

export const tabs: Array<Tab> = [
  { name: 'interconnect', title: 'Interconnect' },
  { name: 'residential', title: 'Residential' },
  { name: 'business', title: 'Business' },
  { name: 'ancillary', title: 'Ancillary' },
  { name: 'smarthome', title: 'Smart Home' },
  { name: 'smartBusiness', title: 'Smart Business' },
];

// export const tabsToDataMap = {
//   interconnect: 'getAllServiceCatalogItem',
//   residential: 'getAllServiceCatalogItem',
//   business: 'getAllServiceCatalogItem',
//   ancillary: 'getAllServiceCatalogItem',
// };

export const tabsToServiceCategoryMap = {
  residential: 'residential',
  business: 'business',
};

export const tabsToTitleMap = {
  interconnect: 'Interconnect',
  residential: 'Residential',
  business: 'Business',
  ancillary: 'Ancillary',
  smarthome: 'Smart Business',
  smartBusiness: 'Smart Business',
};
export const tabsToServiceTypeMap = {
  interconnect: 'INTERCONNECT',
  residential: 'SERVICEPORT',
  business: 'SERVICEPORT',
  ancillary: 'ANCILLARY',
  smartHome: 'SMARTHOMES',
  smartBusiness: 'IOT',
};

export const tabsToDrawer = {
  interconnect: 'INTERCONNECT',
  residential: 'RESIDENTIAL',
  business: 'BUSINESS',
  ancillary: 'ANCILLARY',
};

export const columnDefsGenerator = onCellClicked => [
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
  if (activeTab) {
    return ['Capacity', 'Service Name', 'Package Display Name'];
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
