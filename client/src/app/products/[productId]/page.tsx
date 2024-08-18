import React from "react";

const ProductId = ({ params }: { params: { productId: string } }) => {
  return (
    <div>
      <h1>Detail About product {params.productId}</h1>
    </div>
  );
};

export default ProductId;
