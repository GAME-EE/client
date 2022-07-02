import { Button, ButtonProps } from '@chakra-ui/react';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';

/**
 * @description
 * 게임 시작 버튼
 *
 * `disabled` prop에 따라 버튼 텍스트가 바뀜
 *
 * usage: `<GameStartButton {...buttonProps} />`
 */
const GameStartButton = (props: ButtonProps) => {
  return (
    <Button {...props} aria-label="game start button" leftIcon={<SportsEsportsRoundedIcon />}>
      {props.disabled ? '게임중...' : '게임시작'}
    </Button>
  );
};

export default GameStartButton;
