import styled from 'styled-components';
import { palette } from 'components/assets';

export const Wrapper = styled.div`
  & button {
    text-transform: none !important;
    color: ${palette.grey};
    background: ${palette.greyishWhite};
    border-color: ${palette.grey};
  }
  & button.active {
    background: ${palette.green};
    color: ${palette.white};
  }
  & button.inactive {
    background: transparent ${palette.pinkGradient};
    color: ${palette.white};
    text-transform: none;
    box-shadow: 0px 4px 10px #e6165e84;
  }

  & button.inactive :hover {
    box-shadow: none;
    box-shadow: 0px 4px 10px #e6165e84;
  }
`;
