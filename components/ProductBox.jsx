import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import Image from "next/image";
import ImageWrapper from "./ImageWrapper";

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.5;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, price, images }) {
  const url = "/product/" + _id;

  const { addProduct } = useContext(CartContext);

  function addToCart() {
    addProduct(_id);
  }

  return (
    <div>
      <WhiteBox href={url}>
        <ImageWrapper>
          <Image
            src={images[0]?.url}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
          />
        </ImageWrapper>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button block primary outline onClick={addToCart}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </div>
  );
}
