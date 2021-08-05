import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  height: 360px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: overflow;
  padding: 30px 30px;
  width: 250px;
  border-radius: 7px;
  background: white;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;
  font-weight: 400;
  color: #9a9a9a;
  margin: 30px 0px 0px 25px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const Heading = styled.div`
  font-weight: bold;
  border-bottom: 1px solid rgb(224, 224, 224);
  width: 240px;
  display: flex;
  padding-bottom: 10px;
  justify-content: center;
`;

export const Item = styled.div`
  padding: 18px 0px 0px 4px;
  width: inherit;
  font-weight: 600;
`;
export const ItemNumber = styled.div`
  padding: 18px;
  width: 165px;
  font-weight: 400;
`;

export const IconWrapper = styled.div`
  padding: 20px 0 0 30px;
  width: 65px;
  & * {
    fill: ${props => props.color}!important;
  }
`;

export const DataRow = styled.div`
  display: flex;
  flex-direction: row;
  width: inherit;
`;
