/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
export interface IBgColorHookProps {
  bgColor: string;
  bgHoverColor: string;
  clearBgColor: () => void;
  changeBgColor: (changedColor: string) => void;
}

function useBgColor(): IBgColorHookProps {
  const [bgColor, setBgColor] = useState<string>('blackAlpha.50');
  const [bgHoverColor, setBgHoverColor] = useState<string>('blackAlpha.300');
  const clearBgColor = useCallback(() => {
    setBgColor('blackAlpha.50');
    setBgHoverColor('blackAlpha.300');
  }, []);
  const changeBgColor = useCallback((changedColor: string) => {
    setBgColor(changedColor);
    setBgHoverColor(changedColor);
  }, []);
  return { bgColor, bgHoverColor, clearBgColor, changeBgColor };
}

export default useBgColor;
