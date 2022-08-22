import React from 'react';
import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import { ELEMENT_COLOR } from '../../styles/colors';
import { GAME_INFO } from '../../constants/rank';
interface ITabWrapper { 
  children: React.ReactNode;
  handleTabsChange: (index: number) => void;
  tabIndex: number;
}
function TabsWrapper({ children, tabIndex, handleTabsChange }: ITabWrapper) {
  return (
    <Tabs
      backgroundColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      borderColor={ELEMENT_COLOR.HOME_MAIN_BG_COLOR}
      w={'100%'}
      outline={'none'}
      variant="enclosed"
      h={'100vh'}
      overflowY="scroll"
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList
        backgroundColor={ELEMENT_COLOR.HOME_SECOND_BG_COLOR}
        justifyContent={'center'}
        gap={24}
      >
        {Object.values(GAME_INFO).map(({ name }) => (
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
