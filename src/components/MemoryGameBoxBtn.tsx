import { GridItem } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useEffect } from 'react';
import { GRID_ITEM_COUNT } from '../constants';
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

  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      changeBgColor(changedColor);
      setClickCount((prev: number) => {
        if (changedColor === 'red.600') {
          return -1;
        }
        return prev + 1;
      });
    }
  }, [isLoading, setClickCount, changedColor, changeBgColor]);

  useEffect(() => {
    if (count !== -1) {
      setTimeout(() => {
        changeBgColor('blue.400');
      }, 700 * count);
      setTimeout(() => {
        changeBgColor('blackAlpha.50');
        if (count === GRID_ITEM_COUNT[stage].count - 1) {
          setIsLoading(false);
        }
      }, 700 * (count + 1));
    }
  }, [changeBgColor, count, setIsLoading, stage]);

  useEffect(() => {
    clearBgColor();
  }, [clearBgColor]);

  useEffect(() => {
    if (clickCount == 0) {
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
        cursor: isLoading || bgColor !== 'blackAlpha.50' ? 'default' : 'pointer',
      }}
      onClick={handleButtonClick}
    />
  );
};

export default React.memo(MemoryGameBoxBtn);
