import { Button, ButtonProps } from '@chakra-ui/react';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';

const GameStartButton = (props: ButtonProps) => {
  return (
    <Button {...props} aria-label="game start button" leftIcon={<SportsEsportsRoundedIcon />}>
      {props.disabled ? '게임중...' : '게임시작'}
    </Button>
  );
};

export default GameStartButton;
