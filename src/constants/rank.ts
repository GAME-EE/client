export const GAME_INFO = {
  CHICKEN_GAME: { name: 'chicken game', gid: 1 },
  MEMORY: { name: 'memory game', gid: 2 },
  SNAKE: { name: 'snake game', gid: 3 },
};

export const ItemWrapperMotion = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
} as const;

export const ItemMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
} as const;

export const CROWN_ORDER = [
  {
    size: 1.3,
    order: 2,
    img: '/crown1.webp',
  },
  {
    size: 1,
    order: 1,
    img: '/crown2.webp',
  },
  {
    size: 1,
    order: 3,
    img: '/crown3.webp',
  },
] as const;
