import { Box, TabPanel } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import TopItemWrapper from '../components/Rank/TopItemWrapper';
import BottomItemWrapper from '../components/Rank/BottomItemWrapper';
import TabsWrapper from '../components/Rank/TabsWrapper';
import { IRankData, IUserScores } from '../types/rank';
import { getAllGameRankAPI, getUserScores } from '../api/rank';

interface IRank {
  chickenGameScores: IRankData[];
  memoryGameScores: IRankData[];
  snakeGameScore: IRankData[];
}

const Rank = ({ chickenGameScores, memoryGameScores, snakeGameScore }: IRank) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const GameScoreList = [chickenGameScores, memoryGameScores, snakeGameScore];

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleAvatarClick = async (user: string) => {
    // NOTE : 마이페이지 후 구현 필요
    const userScoreDatas: IUserScores[] = await getUserScores(user);
  };

  return (
    <Wrapper>
      <TabsWrapper tabIndex={tabIndex} handleTabsChange={handleTabsChange}>
        {GameScoreList.map((item: IRankData[], idx: number) => (
          <TabPanel key={idx} marginX={'auto'} marginY={4} maxWidth={'768px'} display="flex">
            <Box flex="1">
              <TopItemWrapper
                data={item.slice(0, 3)}
                idx={idx}
                handleAvatarClick={handleAvatarClick}
              />
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

export async function getServerSideProps() {
  const chickenGameScores = (await getAllGameRankAPI(1)) || [];
  const memoryGameScores = (await getAllGameRankAPI(2)) || [];
  const snakeGameScore = (await getAllGameRankAPI(3)) || [];

  return {
    props: {
      chickenGameScores,
      memoryGameScores,
      snakeGameScore,
    },
  };
}
export default Rank;
