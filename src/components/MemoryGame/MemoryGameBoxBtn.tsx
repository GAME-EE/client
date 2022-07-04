import { GridItem } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useEffect } from 'react';
import { GRID_ITEM_COUNT, COLOR, MEMORY_GAME_TERM, GAME_DOING_STATE } from '../../constants/memory';
import { useBgColor } from '../../hooks';
import { IBgColorHookProps } from '../../hooks/useBgColor';

interface IProps {
  changedColor: string;
  isClickedCount: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  stage: number;
  setClickCount: Dispatch<SetStateAction<number>>;
  clickCount: number;
  setGameDoingState: Dispatch<SetStateAction<string>>;
  correctIndexs: number[];
}
const MemoryGameBoxBtn = ({
  isClickedCount,
  changedColor,
  isLoading,
  setIsLoading,
  stage,
  setClickCount,
  clickCount,
  setGameDoingState,
  correctIndexs,
}: IProps) => {
  const { bgColor, bgHoverColor, clearBgColor, changeBgColor }: IBgColorHookProps = useBgColor();
  const { MEMORY_GAME_WRONG_COLOR, MEMORY_GAME_LOADING_COLOR, MEMORY_GAME_BG_COLOR } = COLOR;
  const { NEXT_CORRECT_BUTTON_TERM } = MEMORY_GAME_TERM;
  const { CLICK } = GAME_DOING_STATE;
  const isClicked = bgColor !== MEMORY_GAME_BG_COLOR;

  const handleButtonClick = useCallback(() => {
    if (!isLoading && !isClicked) {
      changeBgColor(changedColor);
      setClickCount((prev: number) => {
        if (changedColor === MEMORY_GAME_WRONG_COLOR) {
          return -1;
        }
        return prev + 1;
      });
    }
  }, [isLoading, setClickCount, changedColor, changeBgColor, MEMORY_GAME_WRONG_COLOR, isClicked]);

  useEffect(() => {
    if (isClickedCount !== -1) {
      setTimeout(() => {
        changeBgColor(MEMORY_GAME_LOADING_COLOR);
      }, NEXT_CORRECT_BUTTON_TERM * isClickedCount);
      setTimeout(() => {
        clearBgColor();
        if (isClickedCount === GRID_ITEM_COUNT[stage].count - 1) {
          setIsLoading(false);
          setGameDoingState(CLICK);
        }
      }, NEXT_CORRECT_BUTTON_TERM * (isClickedCount + 1));
    }
  }, [
    changeBgColor,
    clearBgColor,
    setGameDoingState,
    isClickedCount,
    setIsLoading,
    stage,
    MEMORY_GAME_BG_COLOR,
    MEMORY_GAME_LOADING_COLOR,
    NEXT_CORRECT_BUTTON_TERM,
    CLICK,
    correctIndexs,
  ]);

  useEffect(() => {
    clearBgColor();
  }, [clearBgColor]);

  useEffect(() => {
    if (clickCount === 0) {
      clearBgColor();
    }
  }, [clickCount, clearBgColor]);

  return (
    <GridItem
      w="100%"
      h="100%"
      bg={bgColor}
      borderRadius={'4px'}
      _hover={{
        bgColor: isLoading ? 'none' : bgHoverColor,
        cursor: isLoading || isClicked ? 'default' : 'pointer',
      }}
      onClick={handleButtonClick}
    />
  );
};
export default React.memo(MemoryGameBoxBtn);
