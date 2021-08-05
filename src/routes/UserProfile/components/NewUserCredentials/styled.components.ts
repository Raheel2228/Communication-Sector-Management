import styled from 'styled-components';
import { palette } from 'components/assets';

export const DialogWrapper = styled.div`
  padding: 50px;
  text-align: center;
`;

export const Text = styled.div`
  margin-bottom: 50px;
  & h3 {
    color: ${palette.ui007};
    font-weight: 700;
    font-size: 14px;
  }
  & p {
    color: ${palette.grey};
  }
`;

export const Actions = styled.div`
  & span {
    padding: 15px;
    border-radius: 100%;
    margin: 10px;
    cursor: pointer;
    background: transparent;
    transition: all 0.2s;
  }
`;

export const Yes = styled.span`
  border: 3px solid ${palette.green};
  color: ${palette.green};
  font-weight: bold;
  &:hover {
    background: ${palette.green};
    color: ${palette.white};
  }
`;

export const No = styled.span`
  border: 3px solid ${palette.red};
  color: ${palette.red};
  font-weight: bold;
  &:hover {
    background: ${palette.red};
    color: ${palette.white};
  }
`;
