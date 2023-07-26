import styled from "styled-components";
import Center from "./Center";
import Image from "next/image";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>Pro anywhere</Title>
              <Desc>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                laborum?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ex fuga quos quasi animi magni cumque, ullam a similique
                voluptates deserunt repellat voluptatibus, doloremque
                reprehenderit provident nulla autem illum aut necessitatibus.
              </Desc>
            </div>
          </Column>
          <Column>
            <Image
              src="http://res.cloudinary.com/di8z2iqv4/image/upload/v1683029682/ecommerce/620e60d93b470ae2cfb7eb100.jpg"
              alt="Iphone 14 Pro Black"
              width={400}
              height={500}
            />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
}
