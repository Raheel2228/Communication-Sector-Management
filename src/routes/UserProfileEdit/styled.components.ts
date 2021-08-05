import { palette } from 'components/assets';
import styled from 'styled-components';

export const Title = styled.h3`
  font-size: 22;
  font-weight: 600;
  color: ${palette.darkGrey};
  display: flex;
  align-items: center;
  margin: 20px 0px;

  &::after {
    content: '';
    background: ${palette.darkGrey};
    width: 30px;
    height: 2px;
    display: inline-block;
    position: relative;
    margin-left: 10px;
    margin-top: 5px;
  }
`;

export const RoundButtonWrapper = styled.div`
  display: flex;
  padding-top:15px;
  & button {
    border-radius: 15px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 3px 30px;
    flex: 1;
  }
  & button * {
    text-transform: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
