import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  /*height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100px;
  } */
`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>{!cartProducts?.length && <div>Your cart is empty</div>}</Box>
          {cartProducts?.length && (
            <Box>
              <h2>Order informaion</h2>
              <input type="input" placeholder="Address" />
              <input type="input" placeholder="Address2" />
              <Button primary block>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
