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
  idx: number;
  setClickCount: any;
  setStage: any;
  clickCount: any;
  correctIndexs: any;
}
const MemoryGameBoxBtn = ({
  count,
  changedColor,
  isLoading,
  setIsLoading,
  stage,
  setClickCount,
}: IProps) => {
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
  const handleButtonClick = useCallback(() => {
    if (!isLoading) {
      setBgColor(changedColor);
      setBgHoverColor(changedColor);
      setClickCount((prev: number) => {
        return prev + 1;
      });
    }
  }, [isLoading, setClickCount, changedColor]);
  useEffect(() => {
    setBgColor('blackAlpha.50');
    setBgHoverColor('blackAlpha.300');
  }, [stage]);
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

export default MemoryGameBoxBtn;
