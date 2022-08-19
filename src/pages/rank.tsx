import { Box, Button, TabPanel } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import TopItemWrapper from '../components/Rank/TopItemWrapper';
import BottomItemWrapper from '../components/Rank/BottomItemWrapper';
import { DUMMY1, DUMMY2, DUMMY3 } from '../constants/rank';
import TabsWrapper from '../components/Rank/TabsWrapper';
import { IRankData } from '../types/rank';
import { getAllGameRankAPI } from '../api/rank';
const DUMMYTAP = [{ name: 'chicken game' }, { name: 'memory game' }, { name: 'snake game' }];

const Rank = () => {
  const [data, setData] = useState<Array<IRankData[]>>([DUMMY1, DUMMY1, DUMMY1]);
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    // 서버 사이드로?
    const getScores = async () => {
      const chickenGameScores = await getAllGameRankAPI(1);
      const memoryGameScores = await getAllGameRankAPI(2);
      const snakeGameScore = await getAllGameRankAPI(3);
      setData([chickenGameScores, memoryGameScores, snakeGameScore]);
    };
    getScores();
  }, []);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };
  return (
    <Wrapper>
      <TabsWrapper tabIndex={tabIndex} handleTabsChange={handleTabsChange} data={DUMMYTAP}>
        {data.map((item, idx) => (
          <TabPanel key={idx} marginX={'auto'} marginY={4} maxWidth={'768px'} display="flex">
            <Box flex="1">
              <TopItemWrapper data={item.slice(0, 3)} idx={idx} />
              <BottomItemWrapper data={item.slice(3)} idx={idx} />
            </Box>
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
