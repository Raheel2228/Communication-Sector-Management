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
        margin={{ right: 65, left: 65, bottom: 40 }}
        innerRadius={0.8}
        padAngle={2}
        enableSlicesLabels={false}
        cornerRadius={1}
        colors={['rgb(14, 43, 66)', 'white']}
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
      <Heading>Reserved Number of Ports</Heading>{' '}
    </Wrapper>
  );
};

export default Component;
