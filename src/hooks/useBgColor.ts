/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';
import { COLOR } from '../constants';

export interface IBgColorHookProps {
  bgColor: string;
  bgHoverColor: string;
  clearBgColor: () => void;
  changeBgColor: (changedColor: string) => void;
}

function useBgColor(): IBgColorHookProps {
  const { MEMORY_GAME_BG_COLOR, MEMORY_GAME_HOVER_COLOR } = COLOR;
  const [bgColor, setBgColor] = useState<string>(MEMORY_GAME_BG_COLOR);
  const [bgHoverColor, setBgHoverColor] = useState<string>(MEMORY_GAME_HOVER_COLOR);

  const clearBgColor = useCallback(() => {
    setBgColor(MEMORY_GAME_BG_COLOR);
    setBgHoverColor(MEMORY_GAME_HOVER_COLOR);
  }, [MEMORY_GAME_BG_COLOR, MEMORY_GAME_HOVER_COLOR]);

  const changeBgColor = useCallback((changedColor: string) => {
    setBgColor(changedColor);
    setBgHoverColor(changedColor);
  }, []);
  return { bgColor, bgHoverColor, clearBgColor, changeBgColor };
}

export default useBgColor;
