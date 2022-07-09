import React from 'react';
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import { ELEMENT_COLOR } from '../../styles/colors';

function TabsWrapper({ data, children }: { data: Array<any>; children: React.ReactNode }) {
  return (
    <Tabs
      backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      borderColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      w={'100%'}
      outline={'none'}
      // isFitted
      variant="enclosed"
      h={'100vh'}
    >
      <TabList
        mb="1em"
        p={2}
        backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
        justifyContent={'center'}
        gap={10}
      >
        {data.map(({ name }) => (
          <TabWrapper key={name} name={name + ''} />
        ))}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  );
}
const TabWrapper = ({ name }: { name: string }) => {
  return (
    <Tab
      _selected={{
        // borderColor: ELEMENT_COLOR.HOME_MAIN_BG_COLOR,
        // borderBottomColor: ELEMENT_COLOR.HOME_SECOND_BG_COLOR,
        color: '#fff',
      }}
      _focus={{
        outline: 'none',
      }}
    >
      {name}
    </Tab>
  );
};
export default TabsWrapper;
