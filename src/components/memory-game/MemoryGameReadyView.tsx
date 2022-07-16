import { Button, Box, Text } from '@chakra-ui/react';
import { GAME_STATE } from '../../constants/memory';
import useScore from '../../hooks/useScore';
import HomeButton from '../HomeButton';

interface Props {
  onClickStartBtn: () => void;
  gameState: string;
}

const MemoryGameReadyView = ({ onClickStartBtn, gameState }: Props) => {
  const isReady = gameState === GAME_STATE.READY;
  const { score } = useScore();

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap="10px" height="620px">
        <Text as="h1" fontWeight="bold" fontSize="62px" marginTop="80px">
          Memory Game
        </Text>
        <Text as="h1" fontWeight="bold" fontSize="24px" marginTop="60px">
          {isReady ? `역대 최고 점수 : 72,000` : `나의 최고 점수 : 52,000`}
        </Text>
        <Text as="h1" fontWeight="bold" fontSize="24px">
          {isReady ? `나의 최고 점수 : 52,000` : `나의 획득 점수 : ${score}`}
        </Text>
        <Button
          colorScheme={isReady ? 'blue' : 'green'}
          height="50px"
          width="300px"
          fontSize="28px"
          as="button"
          onClick={onClickStartBtn}
          marginTop="20px"
        >
          {isReady ? `게임 시작` : `다시 시작`}
        </Button>
        <HomeButton style={{ color: 'red', height: '50px', width: '300px', fontSize: '28px' }}>
          뒤로가기
        </HomeButton>
      </Box>
    </>
  );
};

export default MemoryGameReadyView;
