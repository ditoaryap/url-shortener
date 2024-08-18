import React from "react";

const ProductId = ({ params }: { params: { productId: string } }) => {
  return <div>ProductId {params.productId} </div>;
};

export default ProductId;
