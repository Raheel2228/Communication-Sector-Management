import styled from 'styled-components';
import { palette } from 'components/assets';

export const CustomThemeWrapper = styled.div`
  height: calc(100vh - 500px);
  /* max-height: 200px; */
  width: 100%;

  & .ag-icon-checkbox-unchecked {
    color: ${palette.grey}!important;
  }
  & .ag-header {
    display: none;
  }
  & .ag-cell {
    padding: 0px;
  }
  & .ag-icon-checkbox-checked {
    color: ${palette.blue};
    font-size: 18px;
  }
  & .ag-icon-checkbox-unchecked {
    font-size: 18px;
  }
`;

export const FilterAndIconsRow = styled.div<{ theme?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;

  & .checkboxesRow {
    display: flex;
    flex-direction: row;
    padding: 12px 0px;
  }

  & .actionButtonsRow button.active svg {
    color: ${palette.ui005};
  }
`;

export const List = styled.div`
  /* // overflow-y: scroll; */
`;
