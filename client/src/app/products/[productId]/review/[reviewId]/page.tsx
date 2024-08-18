import { notFound } from "next/navigation";

export default function ReviewId({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  if (parseInt(params.reviewId) > 1000) {
    notFound();
  }
  return (
    <h1 className="text-4xl">
      Review {params.reviewId} & product {params.productId}
    </h1>
  );
}
