import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { palette } from 'components/assets';

export const MyDrawer = styled(Drawer)`
  & > div {
    min-width: 400px;
    width: 400px;
    max-width: 400px;
    padding: 60px 30px;
    position: relative;
    min-height: calc(100vh - 50px);
    height: calc(100vh - 50px);
    max-height: calc(100vh - 50px);
    overflow-y: scroll;
  }
  & .MuiDrawer-paper {
    z-index: 1000;
  }
`;

export const CloseButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 30px;
  left: 15px;
  & svg {
    color: ${palette.grey};
  }
`;
