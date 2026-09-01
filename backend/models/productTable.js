import database from "../database/db.js";

export const createProductsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) DEFAULT 0 CHECK (price >= 0),
        category VARCHAR(100) NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
        images JSONB DEFAULT '[]'::JSONB,
        stock INT NOT NULL CHECK (stock >= 0),
        created_by UUID NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    await database.query(query);

    console.log("Products table created successfully");
  } catch (error) {
    console.log("Error creating products table:", error);
    process.exit(1);
  }
};
