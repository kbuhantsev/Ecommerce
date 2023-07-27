import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ product }) {
  //console.log(product);
  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProducts />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "645246984560780fa83c34a8";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
