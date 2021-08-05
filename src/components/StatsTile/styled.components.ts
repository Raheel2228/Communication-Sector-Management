import styled from 'styled-components';
import { palette } from 'components/assets';

export const Wrapper = styled.p`
  margin: 20px;
  min-width: 257px;
  &.MuiPaper-rounded {
    border-radius: 12px !important;
  }
`;

export const Amount = styled.div<{ color }>`
  font-size: 2em;
  padding-top: 9px;
  padding-left: 10px;
  justify-content: space-between;
  display: flex;
  font-weight: 700;
  color: ${props => props.color};
  margin: 0px;
`;

export const Label = styled.p`
  font-size: 14px;
  border-top: 1px solid ${palette.lightGrey};
  font-weight: 400;
  color: rgb(164, 164, 164);
  padding-top: 9px;
  display: flex;
  justify-content: flex-end;
  margin: 0px;
  // color: ${palette.dark};
`;
