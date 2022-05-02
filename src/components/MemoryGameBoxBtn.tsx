import { GridItem } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
interface IProps {
  changedColor: string;
}
const MemoryGameBoxBtn = ({ changedColor }: IProps) => {
  const [bgColor, setBgColor] = useState<string>('blackAlpha.50');
  const [bgHoverColor, setBgHoverColor] = useState<string>('blackAlpha.300');

  const handleButtonClick = useCallback((): void => {
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
