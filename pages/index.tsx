import styled from 'styled-components'
import Head from 'next/head'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Kento Nagata</title>
      </Head>
      <Title>Kento Nagata</Title>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;
