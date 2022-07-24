import type { NextPage } from 'next';
import styled from '@emotion/styled';
import ChickenGame from '../../components/chicken-game';
const Dyno: NextPage = () => {
  return (
    <Wrapper>
      <ChickenGame />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export default Dyno;
