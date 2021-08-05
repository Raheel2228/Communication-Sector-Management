import styled from 'styled-components';
import { palette } from 'components/assets';

export const Modal = styled.div`
  padding: 20px;

  & h3 {
    color: ${palette.ui007};
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const Error = styled.p`
  color: ${palette.red};
`;

export const ButtonWrapper = styled.p`
  display: flex;

  & > button {
    margin-top: 10px;
  }
`;
