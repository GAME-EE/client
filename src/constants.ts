export const ROUTES = Object.freeze({
  DYNO: '/game/dyno',
  FIND_DIFFERENT_COLOR: '/game/find-different-color',
  MEMORY: '/game/memory',
});

export const GRID_ITEM_COUNT = [
  { size: 2, count: 4 },
  {
    size: 2,
    count: 1,
  },
  {
    size: 2,
    count: 2,
  },
  {
    size: 2,
    count: 3,
  },
  {
    size: 3,
    count: 2,
  },
  {
    size: 3,
    count: 3,
  },
  {
    size: 3,
    count: 4,
  },
  {
    size: 4,
    count: 3,
  },
  {
    size: 4,
    count: 4,
  },
  {
    size: 4,
    count: 5,
  },
  {
    size: 5,
    count: 4,
  },
  {
    size: 5,
    count: 5,
  },
  {
    size: 5,
    count: 6,
  },
  {
    size: 5,
    count: 7,
  },
  {
    size: 5,
    count: 8,
  },
  {
    size: 5,
    count: 9,
  },
];

export const COLOR = Object.freeze({
  MEMORY_GAME_BG_COLOR: 'blackAlpha.50',
  MEMORY_GAME_HOVER_COLOR: 'blackAlpha.300',
  MEMORY_GAME_LOADING_COLOR: 'blue.400',
  MEMORY_GAME_CORRECT_COLOR: 'green.600',
  MEMORY_GAME_WRONG_COLOR: 'red.600',
  MEMORY_GAME_BOARD_COLOR: 'whiteAlpha.900',
});

export const MEMORY_GAME_TERM = Object.freeze({
  NEXT_CORRECT_BUTTON_TERM: 700,
  MOVE_NEXT_CORRECT_STAGE_TERM: 700,
  START_NEXT_STAGE_ANSWER_TERM: 900,
});
