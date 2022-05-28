import { useEffect, useState } from 'react';

import { throttle } from '../utils/throttle';

const useWindowLayout = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', throttle(getScrollTop, 50));
    return () => window.removeEventListener('scroll', getScrollTop);
  }, []);

  const getScrollTop = () => {
    setScrollTop(document.documentElement.scrollTop);
  };

  return {
    scrollTop,
  };
};

export default useWindowLayout;
