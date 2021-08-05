import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Wrapper, Heading } from './styled.components';
interface Props {
  data: $TSFixMe;
}
const Component: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <ResponsivePie
        data={data}
        margin={{ right: 55, left: 55 }}
        innerRadius={0.5}
        padAngle={2}
        enableSlicesLabels={false}
        cornerRadius={1}
        colors={['#B2B09B', '#43aa8b', '#254441', '#ff6f59', '#ef3054']}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={0}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
      <Heading>Network Data</Heading>{' '}
    </Wrapper>
  );
};

export default Component;
