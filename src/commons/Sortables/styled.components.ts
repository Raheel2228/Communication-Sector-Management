import { palette } from 'components/assets';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 2rem;
  & span {
    font-size: 14px;
    font-weight: bold;
    margin-right: 50px;
    color: ${palette.grey};
    padding-bottom: 10px;
    border-bottom: 2px solid transparent;
    transition: all 0.5s;
    margin-bottom: 50px;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    * {
      border-bottom: 0px !important;
    }
    & span {
      margin-bottom: 10px;
    }
  }

  & span.active {
    color: ${palette.ui001};
    border-bottom-color: ${palette.ui006};
  }

  & span:hover {
    color: ${palette.ui001};
    border-bottom-color: ${palette.ui006};
    cursor: pointer;
  }
`;
