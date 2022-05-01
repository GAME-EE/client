import { GridItem } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';

export interface IProps {
  index: string;
}

const MemoryGameBoxBtn = ({ index }: IProps) => {
  const [count, setCount] = useState(1);
  const handleButtonClick = useCallback((): void => {
    console.log(count);
    setCount(prev => prev++);
  }, [count]);
  return (
    <GridItem
      w="100%"
      h="100%"
      bg="blackAlpha.50"
      borderRadius={'4px'}
      _hover={{ bgColor: 'blackAlpha.300', cursor: 'pointer' }}
      key={index}
      onClick={handleButtonClick}
    />
  );
};

export default React.memo(MemoryGameBoxBtn);
