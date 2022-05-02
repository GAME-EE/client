import { GridItem } from '@chakra-ui/react';
import React, { useCallback } from 'react';

const MemoryGameBoxBtn = () => {
  const handleButtonClick = useCallback((): void => {
    console.log(1);
  }, []);
  return (
    <GridItem
      w="100%"
      h="100%"
      bg="blackAlpha.50"
      borderRadius={'4px'}
      _hover={{ bgColor: 'blackAlpha.300', cursor: 'pointer' }}
      onClick={handleButtonClick}
    />
  );
};

export default React.memo(MemoryGameBoxBtn);
