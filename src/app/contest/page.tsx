import type { Metadata } from "next";

import { CONFIG } from "@/global-config";

import { ProductShopView } from "@/sections/product/view";
import { getProducts } from "@/actions/product-ssr";

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product shop - ${CONFIG.appName}` };

export default async function Page() {
  // const { products } = await getProducts();

  const products = [
    {
      id: "1",
      sku: "SNK123",
      name: "Classic Sneakers",
      code: "CLS-SNK-001",
      price: 79.99,
      taxes: 5,
      tags: ["casual", "sport"],
      sizes: ["S", "M", "L"],
      publish: "published",
      gender: ["men"],
      coverUrl: "/images/products/sneakers.jpg",
      images: [
        "/images/products/sneakers1.jpg",
        "/images/products/sneakers2.jpg",
      ],
      colors: ["red", "blue"],
      quantity: 50,
      category: "shoes",
      available: 30,
      totalSold: 120,
      description: "A pair of stylish and comfortable sneakers.",
      totalRatings: 4.5,
      totalReviews: 15,
      inventoryType: "in stock",
      subDescription: "Lightweight and breathable sneakers.",
      priceSale: 69.99,
      reviews: [
        {
          id: "rev1",
          name: "John Doe",
          rating: 5,
          comment: "Great shoes, very comfortable!",
          helpful: 10,
          avatarUrl: "/images/avatars/user1.jpg",
          isPurchased: true,
        },
      ],
      newLabel: {
        content: "New Arrival",
        enabled: true,
      },
      saleLabel: {
        content: "10% Off",
        enabled: true,
      },
      ratings: [
        {
          name: "Quality",
          starCount: 5,
          reviewCount: 10,
        },
        {
          name: "Comfort",
          starCount: 4,
          reviewCount: 5,
        },
      ],
    },
    {
      id: "2",
      sku: "RUN456",
      name: "Running Shoes",
      code: "RUN-SHOE-002",
      price: 99.99,
      taxes: 8,
      tags: ["sport", "fitness"],
      sizes: ["M", "L", "XL"],
      publish: "published",
      gender: ["women"],
      coverUrl: "/images/products/running-shoes.jpg",
      images: [
        "/images/products/running1.jpg",
        "/images/products/running2.jpg",
      ],
      colors: ["black", "white"],
      quantity: 40,
      category: "shoes",
      available: 20,
      totalSold: 200,
      description: "High-performance running shoes.",
      totalRatings: 4.8,
      totalReviews: 25,
      inventoryType: "limited",
      subDescription: "Designed for speed and comfort.",
      priceSale: null,
      reviews: [
        {
          id: "rev2",
          name: "Jane Smith",
          rating: 4,
          comment: "Very comfortable but a bit pricey.",
          helpful: 8,
          avatarUrl: "/images/avatars/user2.jpg",
          isPurchased: true,
        },
      ],
      newLabel: {
        content: "Trending",
        enabled: false,
      },
      saleLabel: {
        content: "Limited Stock",
        enabled: true,
      },
      ratings: [
        {
          name: "Durability",
          starCount: 5,
          reviewCount: 15,
        },
        {
          name: "Fit",
          starCount: 4,
          reviewCount: 10,
        },
      ],
    },
  ];

  return <ProductShopView products={products} />;
}
