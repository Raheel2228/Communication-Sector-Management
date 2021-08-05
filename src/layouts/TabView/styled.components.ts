import styled from 'styled-components';
import { palette } from 'components/assets';
import CardBase from '@material-ui/core/Card';

export const Navigation = styled.div`
  margin: 20px 0px;
`;

export const Card = styled(CardBase)`
  padding: 20px;
  height: calc(100vh - 250px);
  max-height: calc(100vh - 250px);
  overflow-y: scroll;
`;

export const CardTitle = styled.h1`
  font-size: 22;
  font-weight: 400;
  color: ${palette.ui001};
  display: flex;
  align-items: center;

  &::after {
    content: '';
    background: ${palette.ui001};
    width: 50px;
    height: 2px;
    display: inline-block;
    position: relative;
    margin-left: 30px;
    margin-top: 5px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Icon = styled.span`
  color: ${palette.blue};
  padding: 0px;
  margin: 0px;
  height: 15px;
  float: right;
`;
