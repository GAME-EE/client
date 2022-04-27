import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>GAME-EE</title>
        <meta name="description" content="Game-ee" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link passHref href="/game/dyno">
          <a>
            <Button>다이노</Button>
          </a>
        </Link>
        <Link passHref href="/game/find-different-color">
          <a>
            <Button>다른 색깔 찾기</Button>
          </a>
        </Link>
        <Link passHref href="/game/memory">
          <a>
            <Button>기억력</Button>
          </a>
        </Link>
      </main>

      <footer>{/* footer */}</footer>
    </div>
  );
};

export default Home;
