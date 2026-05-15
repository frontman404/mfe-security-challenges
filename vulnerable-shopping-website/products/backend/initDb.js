const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(
  __dirname,
  "../../common/database/vulnerableDatabase.db"
);
const db = new sqlite3.Database(dbPath);

const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: 19.99,
    description:
      "A comfortable and stylish men's t-shirt made from 100% cotton.",
    category: "T-Shirts",
    image: "https://example.com/images/mens_tshirt.jpg",
  },
  {
    id: 2,
    name: "Women's T-Shirt",
    price: 19.99,
    description:
      "A soft and breathable women's t-shirt available in various colors.",
    category: "T-Shirts",
    image: "https://example.com/images/womens_tshirt.jpg",
  },
  {
    id: 3,
    name: "Men's Jeans",
    price: 49.99,
    description:
      "Classic fit men's jeans with a modern twist, made from durable denim.",
    category: "Jeans",
    image: "https://example.com/images/mens_jeans.jpg",
  },
  {
    id: 4,
    name: "Women's Jeans",
    price: 49.99,
    description: "Slim fit women's jeans that offer both comfort and style.",
    category: "Jeans",
    image: "https://example.com/images/womens_jeans.jpg",
  },
  {
    id: 5,
    name: "Men's Hoodie",
    price: 39.99,
    description:
      "A cozy men's hoodie perfect for casual wear, made from a soft cotton blend.",
    category: "Hoodies",
    image: "https://example.com/images/mens_hoodie.jpg",
  },
  {
    id: 6,
    name: "Women's Hoodie",
    price: 39.99,
    description: "A stylish women's hoodie that provides warmth and comfort.",
    category: "Hoodies",
    image: "https://example.com/images/womens_hoodie.jpg",
  },
  {
    id: 7,
    name: "Men's Jacket",
    price: 79.99,
    description:
      "A versatile men's jacket suitable for all seasons, made from high-quality materials.",
    category: "Jackets",
    image: "https://example.com/images/mens_jacket.jpg",
  },
  {
    id: 8,
    name: "Women's Jacket",
    price: 79.99,
    description:
      "A fashionable women's jacket that combines style and functionality.",
    category: "Jackets",
    image: "https://example.com/images/womens_jacket.jpg",
  },
  {
    id: 9,
    name: "Men's Shorts",
    price: 29.99,
    description:
      "Comfortable men's shorts ideal for summer, made from lightweight fabric.",
    category: "Shorts",
    image: "https://example.com/images/mens_shorts.jpg",
  },
  {
    id: 10,
    name: "Women's Shorts",
    price: 29.99,
    description:
      "Stylish women's shorts perfect for warm weather, available in various colors.",
    category: "Shorts",
    image: "https://example.com/images/womens_shorts.jpg",
  },
  {
    id: 11,
    name: "Men's Sweater",
    price: 34.99,
    description: "A classic men's sweater made from soft and warm materials.",
    category: "Sweaters",
    image: "https://example.com/images/mens_sweater.jpg",
  },
  {
    id: 12,
    name: "Women's Sweater",
    price: 34.99,
    description: "A cozy women's sweater that offers both comfort and style.",
    category: "Sweaters",
    image: "https://example.com/images/womens_sweater.jpg",
  },
  {
    id: 13,
    name: "Men's Polo Shirt",
    price: 24.99,
    description:
      "A versatile men's polo shirt suitable for both casual and formal occasions.",
    category: "Polo Shirts",
    image: "https://example.com/images/mens_polo_shirt.jpg",
  },
  {
    id: 14,
    name: "Women's Polo Shirt",
    price: 24.99,
    description: "A stylish women's polo shirt that can be dressed up or down.",
    category: "Polo Shirts",
    image: "https://example.com/images/womens_polo_shirt.jpg",
  },
  {
    id: 15,
    name: "Men's Dress Shirt",
    price: 29.99,
    description:
      "A classic men's dress shirt perfect for formal events, made from high-quality fabric.",
    category: "Dress Shirts",
    image: "https://example.com/images/mens_dress_shirt.jpg",
  },
  {
    id: 16,
    name: "Women's Dress Shirt",
    price: 29.99,
    description:
      "An elegant women's dress shirt suitable for professional and formal settings.",
    category: "Dress Shirts",
    image: "https://example.com/images/womens_dress_shirt.jpg",
  },
  {
    id: 17,
    name: "Men's Suit",
    price: 199.99,
    description: "A sophisticated men's suit that exudes style and confidence.",
    category: "Suits",
    image: "https://example.com/images/mens_suit.jpg",
  },
  {
    id: 18,
    name: "Women's Suit",
    price: 199.99,
    description:
      "A chic women's suit that combines elegance and professionalism.",
    category: "Suits",
    image: "https://example.com/images/womens_suit.jpg",
  },
  {
    id: 19,
    name: "Men's Tie",
    price: 14.99,
    description:
      "A stylish men's tie that adds a touch of class to any outfit.",
    category: "Accessories",
    image: "https://example.com/images/mens_tie.jpg",
  },
  {
    id: 20,
    name: "Women's Scarf",
    price: 14.99,
    description: "A fashionable women's scarf that complements any outfit.",
    category: "Accessories",
    image: "https://example.com/images/womens_scarf.jpg",
  },
  {
    id: 21,
    name: "Men's Hat",
    price: 19.99,
    description:
      "A stylish men's hat that provides both sun protection and style.",
    category: "Accessories",
    image: "https://example.com/images/mens_hat.jpg",
  },
  {
    id: 22,
    name: "Women's Hat",
    price: 19.99,
    description: "A fashionable women's hat perfect for sunny days.",
    category: "Accessories",
    image: "https://example.com/images/womens_hat.jpg",
  },
  {
    id: 23,
    name: "Men's Belt",
    price: 24.99,
    description: "A durable men's belt made from high-quality leather.",
    category: "Accessories",
    image: "https://example.com/images/mens_belt.jpg",
  },
  {
    id: 24,
    name: "Women's Belt",
    price: 24.99,
    description:
      "A stylish women's belt that adds a touch of elegance to any outfit.",
    category: "Accessories",
    image: "https://example.com/images/womens_belt.jpg",
  },
  {
    id: 25,
    name: "Men's Socks",
    price: 9.99,
    description:
      "Comfortable men's socks made from soft and breathable materials.",
    category: "Accessories",
    image: "https://example.com/images/mens_socks.jpg",
  },
  {
    id: 26,
    name: "Men's Running Shoes",
    price: 59.99,
    description: "Lightweight and comfortable men's running shoes.",
    category: "Shoes",
    image: "https://example.com/images/mens_running_shoes.jpg",
  },
  {
    id: 27,
    name: "Women's Running Shoes",
    price: 59.99,
    description: "Durable and stylish women's running shoes.",
    category: "Shoes",
    image: "https://example.com/images/womens_running_shoes.jpg",
  },
  {
    id: 28,
    name: "Men's Sandals",
    price: 29.99,
    description: "Comfortable men's sandals perfect for summer.",
    category: "Shoes",
    image: "https://example.com/images/mens_sandals.jpg",
  },
  {
    id: 29,
    name: "Women's Sandals",
    price: 29.99,
    description: "Stylish women's sandals available in various colors.",
    category: "Shoes",
    image: "https://example.com/images/womens_sandals.jpg",
  },
  {
    id: 30,
    name: "Men's Boots",
    price: 89.99,
    description: "Durable men's boots suitable for all terrains.",
    category: "Shoes",
    image: "https://example.com/images/mens_boots.jpg",
  },
  {
    id: 31,
    name: "Women's Boots",
    price: 89.99,
    description: "Fashionable women's boots perfect for winter.",
    category: "Shoes",
    image: "https://example.com/images/womens_boots.jpg",
  },
  {
    id: 32,
    name: "Men's Flip Flops",
    price: 14.99,
    description: "Casual men's flip flops ideal for the beach.",
    category: "Shoes",
    image: "https://example.com/images/mens_flip_flops.jpg",
  },
  {
    id: 33,
    name: "Women's Flip Flops",
    price: 14.99,
    description: "Comfortable women's flip flops available in various colors.",
    category: "Shoes",
    image: "https://example.com/images/womens_flip_flops.jpg",
  },
  {
    id: 34,
    name: "Men's Swim Trunks",
    price: 24.99,
    description: "Stylish men's swim trunks perfect for the pool or beach.",
    category: "Swimwear",
    image: "https://example.com/images/mens_swim_trunks.jpg",
  },
  {
    id: 35,
    name: "Women's Swimsuit",
    price: 29.99,
    description: "Elegant women's swimsuit available in various styles.",
    category: "Swimwear",
    image: "https://example.com/images/womens_swimsuit.jpg",
  },
  {
    id: 36,
    name: "Men's Sunglasses",
    price: 19.99,
    description: "Stylish men's sunglasses with UV protection.",
    category: "Accessories",
    image: "https://example.com/images/mens_sunglasses.jpg",
  },
  {
    id: 37,
    name: "Women's Sunglasses",
    price: 19.99,
    description: "Fashionable women's sunglasses with UV protection.",
    category: "Accessories",
    image: "https://example.com/images/womens_sunglasses.jpg",
  },
  {
    id: 38,
    name: "Men's Watch",
    price: 49.99,
    description: "Elegant men's watch with a leather strap.",
    category: "Accessories",
    image: "https://example.com/images/mens_watch.jpg",
  },
  {
    id: 39,
    name: "Women's Watch",
    price: 49.99,
    description: "Chic women's watch with a metal strap.",
    category: "Accessories",
    image: "https://example.com/images/womens_watch.jpg",
  },
];

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.run((err) => {
      if (err) {
        reject("Error creating table: " + err.message);
      } else {
        resolve();
      }
    });
  });
};

const countProducts = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
      if (err) {
        reject("Error counting products: " + err.message);
      } else {
        resolve(row.count);
      }
    });
  });
};

const initializeProducts = async () => {
  try {
    const stmt = db.prepare(
      "INSERT INTO products (id, name, price, description, category, image) VALUES (?, ?, ?, ?, ?, ?)"
    );
    products.forEach((product) => {
      stmt.run(
        product.id,
        product.name,
        product.price,
        product.description,
        product.category,
        product.image
      );
    });
    stmt.finalize();
  } catch (error) {
    console.error(error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  }
};

initializeProducts();
