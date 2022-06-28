import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';

import { ELEMENT_COLOR } from '../styles/colors';

const Rank = () => {
  return (
    <Wrapper>
      <Tabs
        backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
        borderColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
        w={'100%'}
        isFitted
        variant="enclosed"
      >
        <TabList mb="1em" marginTop={'10px'}>
          {[1, 2, 3].map(name => (
            <TabWrapper key={name} name={name + ''} />
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
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
    >
      {name}
    </Tab>
  );
};
const Wrapper = styled.div`
  // height: 90vh;
  /* max-width: 1200px; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export default Rank;
