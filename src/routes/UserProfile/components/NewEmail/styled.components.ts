import { palette } from 'components/assets';
import styled from 'styled-components';
import { Tag } from 'antd';

export const DialogWrapper = styled.div`
  background: ${palette.greyishWhite};
  padding: 20px;
  width: 600px;
`;

export const Title = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 20px;
  & h3 {
    color: ${palette.ui007};
    font-weight: 700;
    font-size: 16px;
    margin-left: 5px;
  }
  & p {
    color: ${palette.grey};
  }
`;

export const Content = styled.div`
  margin: 5px 0px;
`;

export const Recipient = styled.div`
  display: contents;
  margin-bottom: 30px;
  align-items: center;

  & > span:first-child {
    margin-right: 10px;
  }
`;

export const MyTag = styled(Tag)`
  border-radius: 100px;
  padding: 2px 10px;
`;

export const CloseButton = styled.span`
  position: absolute;
  cursor: pointer;
  top: 25px;
  right: 15px;
  & svg {
    color: ${palette.grey};
  }
`;

export const Action = styled.div``;
