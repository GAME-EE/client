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
}
const MemoryGameBoxBtn = ({ changedColor, count, isLoading, setIsLoading, stage }: IProps) => {
  const [bgColor, setBgColor] = useState<string>('blackAlpha.50');
  const [bgHoverColor, setBgHoverColor] = useState<string>('blackAlpha.300');
  useEffect(() => {
    if (count !== -1 && stage !== undefined) {
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
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      setBgColor(changedColor);
      setBgHoverColor(changedColor);
    }
  }, [changedColor, isLoading]);
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
