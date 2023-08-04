import Box from "@/components/Box";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import CartIcon from "@/components/icons/Cart";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.7rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  const { title, category, description, price, images, properties, _id } =
    product;

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={images} />
          </Box>
          <Box>
            <Title>{title}</Title>
            <p>{description}</p>
            <PriceRow>
              <div>
                <Price>${price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(_id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </Box>
        </ColWrapper>
      </Center>
    </>
  );
}

export const getServerSideProps = async (context) => {
  await mongooseConnect();

  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
