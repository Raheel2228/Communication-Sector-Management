import { PersonAdd, Email, Delete, Sort, Fullscreen } from '@material-ui/icons';
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
    onCellClicked,
  },
];

export const actionButtonsGenerator = onClick => [
  { label: 'Toggle Advance Search', onClick },
  { label: 'Upload', onClick },
  { label: 'Download', onClick },
];

export const iconButtonsGenerator = (
  onClickPersonalAdd,
  onClickEmail,
  onClickDelete,
  onClickSort,
  onClickFullscreen,
  rowSelected: boolean,
) => [
  {
    icon: PersonAdd,
    onclick: onClickPersonalAdd,
    active: true,
  },
  {
    icon: Email,
    onclick: onClickEmail,
    active: rowSelected,
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

export const tabs = [
  { name: 'projectUser', title: 'Project User' },
  { name: 'serviceProvider', title: 'Service Provider' },
  { name: 'residentialAccounts', title: 'Residential Accounts' },
  { name: 'businessAccounts', title: 'Business Accounts' },
  { name: 'priorityAccounts', title: 'Priority Accounts' },
];

export const sortables = ['Account Number', 'Customer Name', 'Mobile Contact'];
