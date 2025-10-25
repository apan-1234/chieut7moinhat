// data/product.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string; // đường dẫn ảnh
}

const products: Product[] = [
  {
    id: 1,
    name: "Sản phẩm A",
    price: 100000,
    description: "Mô tả sản phẩm A",
    image: "/images/sp1.jpg",
  },
  {
    id: 2,
    name: "Sản phẩm B",
    price: 200000,
    description: "Mô tả sản phẩm B",
    image: "/images/sp2.jpg",
  },
  {
    id: 3,
    name: "Sản phẩm C",
    price: 150000,
    description: "Mô tả sản phẩm C",
    image: "/images/sp3.jpg",
  },
];

export default products;
