import { GridItem } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { GRID_ITEM_COUNT } from '../pages/game/memory';

interface IProps {
  changedColor: string;
  count: number;
  isLoading: boolean;
  setIsLoading: any;
  stage: number;
  setClickCount: any;
  clickCount: any;
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
  const [bgColor, setBgColor] = useState<string>('blackAlpha.50');
  const [bgHoverColor, setBgHoverColor] = useState<string>('blackAlpha.300');
  useEffect(() => {
    if (count !== -1) {
      setTimeout(() => {
        setBgColor('blue.400');
      }, 700 * count);
      setTimeout(() => {
        setBgColor('blackAlpha.50');
        if (count === GRID_ITEM_COUNT[stage].count - 1) {
          setIsLoading(false);
        }
      }, 700 * (count + 1));
    }
  }, [count, setIsLoading, stage]);
  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      setBgColor(changedColor);
      setBgHoverColor(changedColor);
      setClickCount((prev: number) => {
        if (changedColor === 'red.600') {
          return -1;
        }
        return prev + 1;
      });
    }
  }, [isLoading, setClickCount, changedColor]);
  useEffect(() => {
    setBgColor('blackAlpha.50');
    setBgHoverColor('blackAlpha.300');
  }, [stage]);
  useEffect(() => {
    if (clickCount == 0) {
      setBgColor('blackAlpha.50');
      setBgHoverColor('blackAlpha.300');
    }
  }, [clickCount]);

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
