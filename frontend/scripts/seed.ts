import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";


const categories = [
  { name: "Electronics", description: "Devices and gadgets", image: "https://via.placeholder.com/300?text=Electronics" },
  { name: "Clothing", description: "Fashion and apparel", image: "https://via.placeholder.com/300?text=Clothing" },
  { name: "Home and Garden", description: "Furniture and plants", image: "https://via.placeholder.com/300?text=Home+Garden" },
  { name: "Sports", description: "Sporting goods", image: "https://via.placeholder.com/300?text=Sports" },
  { name: "Books", description: "Books and literature", image: "https://via.placeholder.com/300?text=Books" },
  { name: "Health and Beauty", description: "Wellness and care", image: "https://via.placeholder.com/300?text=Health+Beauty" },
  { name: "Toys", description: "Fun for kids", image: "https://via.placeholder.com/300?text=Toys" },
  { name: "Food", description: "Snacks and groceries", image: "https://via.placeholder.com/300?text=Food" },
];

async function seed() {
  try {
    await mongooseConnect();

    await Category.deleteMany();
    await Product.deleteMany();

    const createdCategories = await Category.insertMany(categories);

    const sampleProducts = createdCategories.map((cat) => ({
      name: `${cat.name} Sample Product`,
      description: `A high-quality ${cat.name.toLowerCase()} product.`,
      price: Math.floor(Math.random() * 100 + 10),
      stock: 50,
      category: cat._id,
      images: [`https://via.placeholder.com/400?text=${cat.name}+Product`],
      tags: ["sample", cat.name.toLowerCase()],
      specs: { brand: "DemoBrand", material: "Plastic" },
      featured: Math.random() > 0.5,
    }));

    await Product.insertMany(sampleProducts);

    console.log("✅ Seeded categories and products successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
