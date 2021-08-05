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

export const SortablesAndActionButtons = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1600px) {
    display: block;
  }

  & button {
    border-radius: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: ${palette.ui005};
  }
  & button * {
    text-transform: none;
    color: ${palette.ui005};
  }
`;
