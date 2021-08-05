import styled from 'styled-components';
import { palette } from 'components/assets';

export const CustomThemeWrapper = styled.div`
  height: calc(100vh - 355px);
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
  // overflow-y: scroll;
  & .ant-collapse-header{
    font-size:15px;
    font-weight:600;
    color: ${palette.ui001}!important;
  }
  & .ant-timeline-item-head {
    width: 15px;
    height: 15px;
    border: 3px solid;
}
& .ant-timeline-item-tail {
   left: 6px;
}
& .ant-timeline{
  padding-top:20px;
}
& .ant-collapse > .ant-collapse-item > .ant-collapse-header{
  padding:3px 45px;
}
`;
