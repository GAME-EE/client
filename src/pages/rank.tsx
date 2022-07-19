import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import TopItemWrapper from '../components/Rank/TopItemWrapper';
import BottomItemWrapper from '../components/Rank/BottomItemWrapper';
import { DUMMY1, DUMMY2, DUMMY3 } from '../constants/rank';
import TabsWrapper from '../components/Rank/TabsWrapper';
import { ELEMENT_COLOR } from '../styles/colors';
import { AnimatePresence, motion } from 'framer-motion';
const DUMMYTAP = [{ name: 'dyno' }, { name: 'memory' }, { name: 'snake' }];
const Rank = () => {
  const [data, setData] = useState([DUMMY1, DUMMY2, DUMMY3]);
  const [tabIndex, setTabIndex] = React.useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectItem, setSelectItem] = useState({});
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  const handleCardOpen = (name: string) => {
    console.log(name);
    setSelectItem(name);
    onOpen();
  };
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Wrapper>
      <TabsWrapper tabIndex={tabIndex} handleTabsChange={handleTabsChange} data={DUMMYTAP}>
        {data.map((item, idx) => (
          <TabPanel key={idx} marginX={'auto'} maxWidth={'768px'} display="flex">
            <Box flex="1">
              <TopItemWrapper data={item.slice(0, 3)} idx={idx} handleCardOpen={handleCardOpen} />
              <BottomItemWrapper data={item.slice(3)} idx={idx} handleCardOpen={handleCardOpen} />
            </Box>
            <Button onClick={() => setSelectedId('hello')}>onClickckkck</Button>
            {selectedId && (
              <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -20 }}>
                asddsd
                <Button onClick={() => setSelectedId(null)}>null</Button>
              </motion.div>
            )}
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
