import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';

import { ELEMENT_COLOR } from '../styles/colors';
import TopItemWrapper from '../components/Rank/TopItemWrapper';
import BottomItemWrapper from '../components/Rank/BottomItemWrapper';

const Rank = () => {
  return (
    <Wrapper>
      <Tabs
        backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
        borderColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
        w={'100%'}
        outline={'none'}
        isFitted
        variant="enclosed"
        h={'100vh'}
      >
        <TabList mb="1em" marginTop={'10px'}>
          {[1, 2, 3].map(name => (
            <TabWrapper key={name} name={name + ''} />
          ))}
        </TabList>
        <TabPanels>
          {[1, 2, 3].map(name => (
            <TabPanel key={name} marginX={48}>
              <TopItemWrapper />
              <BottomItemWrapper />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Wrapper>
  );
};
const TabWrapper = ({ name }: { name: string }) => {
  return (
    <Tab
      _selected={{
        borderColor: ELEMENT_COLOR.HOME_MAIN_BG_COLOR,
        borderBottomColor: ELEMENT_COLOR.HOME_SECOND_BG_COLOR,
      }}
      _focus={{
        outline: 'none',
      }}
    >
      {name}
    </Tab>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default Rank;
