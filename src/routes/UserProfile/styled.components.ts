import styled from 'styled-components';
import { palette } from 'components/assets';

export const CardWrapper = styled.div`
  padding: 20px;
  transition: all 0.2s;
  flex-grow: 1;
`;

export const SortablesAndActionButtons = styled.div`
  margin-top: 40px;
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

export const AdvanceSearchWrapper = styled.div`
  margin-top: 40px;
`;
