import styled from 'styled-components';
import { palette } from 'components/assets';

export const DateAndStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Open Sans';
  color: ${palette.ui001};
  margin: 0px;
`;

export const Text = styled.span`
  font-family: 'Open Sans';
  color: ${palette.ui001};
`;

export const SubMenuIcon = styled.span`
  margin-right: 20px;
  display: flex;
  cursor: pointer;
`;
