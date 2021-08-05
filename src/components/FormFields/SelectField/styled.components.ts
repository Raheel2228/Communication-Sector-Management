import styled from 'styled-components';
import { palette } from 'components/assets';

export const Field = styled.div`
  width: 100%;
  margin-bottom: 10px;

  &.invalid .ant-select-selector {
    border-color: ${palette.red} !important;
  }

  & label {
    font-size: 13px;
    font-weight: 600;
    color: ${palette.grey};
  }

  & input {
    width: 100%;
    border: 1px solid ${palette.lightGrey};
    background: ${palette.white};
    padding: 5px 10px;
    color: ${palette.ui001};
    font-size: 13px;
    outline: none !important;
    max-height: 35px;
  }

  & .ant-select-selection-item {
    color: ${palette.ui001};
  }
  &.alternative .ant-select-selection-item {
    color: ${palette.grey};
    background: ${palette.disabledLightGrey};
  }
`;
