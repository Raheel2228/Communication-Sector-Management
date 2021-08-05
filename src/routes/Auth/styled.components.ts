import styled from 'styled-components';
import { palette } from 'components/assets';
import { Button } from 'components';
import ArtWork from 'components/assets/images/auth_artwork.svg';

export const Wrapper = styled.div`
  background: ${palette.greyishWhite};
  display: flex;
  width: 100vw;
  height: 100vh;
  opacity: 1;
`;

export const LeftColumn = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 50px;
  flex: 1;
`;

export const Form = styled.form`
  width: 700px;
  align-self: center;
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: ${palette.ui007};
  opacity: 1;
`;

export const RightColumn = styled.section`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  background-image: url(${ArtWork});
  background-position: right;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.signup {
    justify-content: flex-start;
  }
`;

export const MyButton = styled(Button)`
  padding: 5px 40px;
  background: transparent;
  color: ${palette.ui001};
  border-color: ${palette.ui001};
  font-weight: bold;
`;

export const Link = styled.div`
  font-size: 14px;
  color: ${palette.grey};
  opacity: 1;
  margin-right: 30px;
  cursor: pointer;
`;

export const LogoWrapper = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
`;

export const ButtonWrapper = styled.div`
  margin: 20px;

  &.smallScreen {
    margin: 0px;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

export const TabWrapper = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

export const Tab = styled.div<{ active: boolean }>`
  color: ${props => (props.active ? palette.ui001 : palette.ui005)};
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const TabIcon = styled.span<{ active?: boolean }>`
  background: ${props => (props.active ? palette.ui001 : 'transparent')};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-right: 5px;
  border-radius: 100%;
  border: 1px solid;

  & svg {
    color: ${props => (props.active ? 'white' : palette.ui005)};
    font-size: 16px;
  }
`;

export const Error = styled.p`
  color: ${palette.red};
`;
