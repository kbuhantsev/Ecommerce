import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useRouter } from "next/router";
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
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  font-weight: 700;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export const getServerSideProps = async (context) => {
  const query = context.query;

  return {
    props: {
      query,
    },
  };
};

export default function CartPage({ query }) {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function getData() {
      if (cartProducts.length > 0) {
        const result = await axios.post("/api/cart", { ids: cartProducts });
        setProducts(result.data);
      } else setProducts([]);
    }
    getData();
  }, [cartProducts]);

  useEffect(() => {
    if (query.hasOwnProperty("success")) {
      clearCart();
    }
    // eslint-disable-next-line
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });

    if (response.data.url) {
      router.push(response.data.url);
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (query.hasOwnProperty("success")) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

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
                        <ProductImageBox>
                          <img src={images[0].url} alt="" />
                        </ProductImageBox>
                        {title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => {
                            lessOfThisProduct(_id);
                          }}
                        >
                          -
                        </Button>
                        <QuantityLabel>
                          {cartProducts.filter((id) => id === _id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => {
                            moreOfThisProduct(_id);
                          }}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === _id).length * price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order informaion</h2>

              <Input
                type="input"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="input"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CityHolder>
                <Input
                  type="input"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input
                  type="input"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </CityHolder>
              <Input
                type="input"
                placeholder="Street Address"
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <Input
                type="input"
                placeholder="Country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <Button primary block onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
