import styled from 'styled-components';
import { palette } from 'components/assets';
import Button from '@material-ui/core/Button';

export const RoundButton = styled(Button)`
  background: ${palette.white};
  border-radius: 20px;
  margin-right: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-color: ${palette.ui005};
  color: ${palette.ui005};
  text-transform: none;

  &:hover {
    background: ${palette.purpleGradient001};
  }
  &:hover * {
    color: ${palette.white};
  }
`;

export const FlatButton = styled(Button)`
  color: ${palette.ui001};
  background-color: ${palette.white};
  border: 1px solid ${palette.lightGrey};
  font-size: 13px;
  font-weight: bold;
  border-radius: 3px;
  padding: 13px 35px;
  text-transform: none;
  margin-right: 20px;
  box-shadow: none;

  &:hover {
    color: ${palette.white};
    background-color: ${palette.ui001};
    border-color: transparent;
  }

  &.active {
    color: ${palette.white};
    background-color: ${palette.ui001};
    border-color: transparent;
  }
  &:hover {
    box-shadow: 1px 1px 12px ${palette.ui005};
  }
`;
