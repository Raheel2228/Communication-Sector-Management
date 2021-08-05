import styled from 'styled-components';
import { palette } from 'components/assets';

export const ListItem = styled.div`
  background: ${palette.white};
  padding: 7px 20px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${palette.lightGrey};
  border-radius: 5px;
  text-align: left;

  &:hover {
    box-shadow: 1px 1px 10px ${palette.ui005};
    cursor: pointer;
  }
`;
export const Label = styled.p`
  color: ${palette.ui001};
  font-size: 12px;
  user-select: none;
  margin: 0px;
`;

export const Icon = styled.span`
  color: ${palette.blue};
  padding: 0px;
  margin: 0px;
  height: 15px;
`;
