import styled from 'styled-components';
import { palette } from 'components/assets';

export const Field = styled.div`
  width: 100%;
  margin-bottom: 10px;

  & label {
    font-size: 13px;
    font-weight: 600;
    color: ${palette.grey};
  }

  & input {
    width: 100%;
    border: 1px solid ${palette.lightGrey};
    background: ${palette.white};
    padding: 6px 10px;
    color: ${palette.ui001};
    font-size: 13px;
    outline: none !important;
    max-height: 35px;
  }

  &.invalid > * {
    border-color: ${palette.red};
  }

  & input:disabled {
    color: ${palette.grey};
    background: ${palette.lightGrey};
  }

  &.alternative input {
    background: ${palette.disabledLightGrey};
  }

  &.alternative input:disabled {
    color: ${palette.grey};
    background: ${palette.disabledLightGrey};
  }
`;
