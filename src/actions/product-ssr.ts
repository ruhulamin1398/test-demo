import axios, { endpoints } from "@/lib/axios";

// ----------------------------------------------------------------------

export async function getProducts() {
  const res = await axios.get(endpoints.product.list);

  return res.data;
}

// ----------------------------------------------------------------------

export async function getProduct(id: string) {
  const URL = id ? `${endpoints.product.details}?productId=${id}` : "";

  const res = await axios.get(URL);

  console.log(" response product from get product-ssr", res.data);
  if (res) return res.data;
  return null;
}
