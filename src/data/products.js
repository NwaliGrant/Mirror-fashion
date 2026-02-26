// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 890,
    category: "women",
    image: "/images/product1.jpg",
    images: [
      "/images/product1.jpg",
      "/images/product1.jpg",
      "/images/product1.jpg"
    ],
    description: "Elegant silk evening gown perfect for special occasions. Features a classic silhouette with modern details.",
    isNew: true
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    price: 450,
    category: "accessories",
    image: "/images/product2.jpg",
    images: [
      "/images/product2.jpg",
      "/images/product2.jpg",
      "/images/product2.jpg"
    ],
    description: "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
    isNew: false
  },
  {
    id: 3,
    name: "Gold Statement Earrings",
    price: 320,
    category: "accessories",
    image: "/images/product3.jpg",
    images: [
      "/images/product3.jpg",
      "/images/product3.jpg",
      "/images/product3.jpg"
    ],
    description: "18k gold plated statement earrings that add elegance to any outfit.",
    isNew: true
  },
  {
    id: 4,
    name: "Cashmere Blend Scarf",
    price: 280,
    category: "accessories",
    image: "/images/product4.jpg",
    images: [
      "/images/product4.jpg",
      "/images/product4.jpg",
      "/images/product4.jpg"
    ],
    description: "Luxuriously soft cashmere blend scarf, perfect for cooler evenings.",
    isNew: false
  }
];

// Helper function to get products (from localStorage or default)
export const getProducts = () => {
  const saved = localStorage.getItem("shopProducts");
  if (saved) {
    return JSON.parse(saved);
  }
  // Initialize localStorage with default products
  localStorage.setItem("shopProducts", JSON.stringify(products));
  return products;
};
