import { TabPanel } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import TopItemWrapper from '../components/Rank/TopItemWrapper';
import BottomItemWrapper from '../components/Rank/BottomItemWrapper';
import { DUMMY1, DUMMY2, DUMMY3 } from '../constants/rank';
import TabsWrapper from '../components/Rank/TabsWrapper';
const DUMMYTAP = [{ name: 'dyno' }, { name: 'memory' }, { name: 'snake' }];
const Rank = () => {
  return (
    <Wrapper>
      <TabsWrapper data={DUMMYTAP}>
        {[DUMMY1, DUMMY2, DUMMY3].map((item, idx) => (
          <TabPanel key={idx} marginX={'auto'} maxWidth={'768px'}>
            <TopItemWrapper data={item.slice(0, 3)} idx={idx} />
            <BottomItemWrapper data={item.slice(3)} />
          </TabPanel>
        ))}
      </TabsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default Rank;
