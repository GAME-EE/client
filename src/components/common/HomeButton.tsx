import Link from 'next/link';
import { Button, ButtonProps } from '@chakra-ui/react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { ROUTES } from '../../constants';

/**
 * @description
 * 홈 버튼
 *
 * usage: `<HomeButton {...buttonProps} />`
 */
const HomeButton = (props: ButtonProps) => {
  return (
    <Link href={ROUTES.HOME} passHref>
      <Button {...props} aria-label="home button" leftIcon={<HomeRoundedIcon />}>
        홈으로
      </Button>
    </Link>
  );
};

export default HomeButton;
