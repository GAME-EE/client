import { GridItem } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useEffect } from 'react';
import { GRID_ITEM_COUNT, COLOR, MEMORY_GAME_TERM } from '../constants';
import useBgColor, { IBgColorHookProps } from '../hooks/useBgColor';

interface IProps {
  changedColor: string;
  count: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  stage: number;
  setClickCount: Dispatch<SetStateAction<number>>;
  clickCount: number;
}

const MemoryGameBoxBtn = ({
  count,
  changedColor,
  isLoading,
  setIsLoading,
  stage,
  setClickCount,
  clickCount,
}: IProps) => {
  const { bgColor, bgHoverColor, clearBgColor, changeBgColor }: IBgColorHookProps = useBgColor();
  const { MEMORY_GAME_WRONG_COLOR, MEMORY_GAME_LOADING_COLOR, MEMORY_GAME_BG_COLOR } = COLOR;
  const { NEXT_CORRECT_BUTTON_TERM } = MEMORY_GAME_TERM;

  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      changeBgColor(changedColor);
      setClickCount((prev: number) => {
        if (changedColor === MEMORY_GAME_WRONG_COLOR) {
          return -1;
        }
        return prev + 1;
      });
    }
  }, [isLoading, setClickCount, changedColor, changeBgColor, MEMORY_GAME_WRONG_COLOR]);

  useEffect(() => {
    if (count !== -1) {
      setTimeout(() => {
        changeBgColor(MEMORY_GAME_LOADING_COLOR);
      }, NEXT_CORRECT_BUTTON_TERM * count);
      setTimeout(() => {
        clearBgColor();
        if (count === GRID_ITEM_COUNT[stage].count - 1) {
          setIsLoading(false);
        }
      }, NEXT_CORRECT_BUTTON_TERM * (count + 1));
    }
  }, [
    changeBgColor,
    clearBgColor,
    count,
    setIsLoading,
    stage,
    MEMORY_GAME_BG_COLOR,
    MEMORY_GAME_LOADING_COLOR,
    NEXT_CORRECT_BUTTON_TERM,
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
        cursor: isLoading || bgColor !== MEMORY_GAME_BG_COLOR ? 'default' : 'pointer',
      }}
      onClick={handleButtonClick}
    />
  );
};

export default React.memo(MemoryGameBoxBtn);
