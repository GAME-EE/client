import React from 'react';
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import { ELEMENT_COLOR } from '../../styles/colors';
interface ITabWrapper {
  data: Array<any>;
  children: React.ReactNode;
  handleTabsChange: (index: number) => void;
  tabIndex: number;
}
function TabsWrapper({ data, children, tabIndex, handleTabsChange }: ITabWrapper) {
  return (
    <Tabs
      backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      borderColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      w={'100%'}
      outline={'none'}
      variant="enclosed"
      h={'100vh'}
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList
        backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
        justifyContent={'center'}
        gap={24}
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
      fontSize={'lg'}
      borderRadius={'5px'}
      h={'70px'}
      color={'#fff'}
      _selected={{
        color: ELEMENT_COLOR.HOME_MAIN_BG_COLOR,
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
