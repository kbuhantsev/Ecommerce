import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

const ProductInfoCell = styled.td`
  img {
    max-width: 150px;
    max-height: 150px;
  }
`;

const ProductImageBox = styled.div`
  max-width: 150px;
  max-height: 150px;
  padding: 10px;
  background-color: #f0f0f0;
`;

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      if (cartProducts.length > 0) {
        const result = await axios.post("/api/cart", { ids: cartProducts });
        setProducts(result.data);
      }
    }
    getData();
    console.log(products);
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ _id, title, price, images }) => (
                    <tr key={_id}>
                      <ProductInfoCell>
                        <img src={images[0].url} alt="" />
                        {title}
                      </ProductInfoCell>
                      <td>{cartProducts.filter((id) => id === _id).length}</td>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {cartProducts?.length > 0 && (
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
