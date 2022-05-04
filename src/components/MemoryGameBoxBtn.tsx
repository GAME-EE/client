import { GridItem } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
interface IProps {
  changedColor: string;
  count: number;
}
const MemoryGameBoxBtn = ({ changedColor, count }: IProps) => {
  const [bgColor, setBgColor] = useState<string>('blackAlpha.50');
  const [bgHoverColor, setBgHoverColor] = useState<string>('blackAlpha.300');
  console.log(count);
  useEffect(() => {
    if (count !== -1) {
      setTimeout(() => {
        setBgColor('blue.400');
      }, 600 * count);
      setTimeout(() => {
        setBgColor('blackAlpha.50');
      }, 600 * (count + 1));
    }
  }, [count]);
  const handleButtonClick = useCallback(() => {
    setBgColor(changedColor);
    setBgHoverColor(changedColor);
  }, [changedColor]);
  return (
    <GridItem
      w="100%"
      h="100%"
      bg={bgColor}
      borderRadius={'4px'}
      _hover={{
        bgColor: bgHoverColor,
        cursor: bgColor === 'blackAlpha.50' ? 'pointer' : 'default',
      }}
      onClick={handleButtonClick}
    />
  );
};

export default React.memo(MemoryGameBoxBtn);
