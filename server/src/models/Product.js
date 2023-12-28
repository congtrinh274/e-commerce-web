const db = require('../config/db').promise();

const Product = {
  getAllProducts: async () => {
    try {
      const [rows] = await db.query(`
        SELECT
          products.product_id,
          products.name,
          GROUP_CONCAT(DISTINCT product_variants.price) AS prices,
          GROUP_CONCAT(DISTINCT product_images.image_url) AS image_urls
        FROM
          products
          LEFT JOIN product_variants ON products.product_id = product_variants.product_id
          LEFT JOIN product_images ON products.product_id = product_images.product_id
        GROUP BY
          products.product_id, products.name
      `);

      const productsWithImagesAndPrices = rows.map(row => ({
        product_id: row.product_id,
        name: row.name,
        prices: row.prices ? row.prices.split(',').map(parseFloat) : [],
        image_urls: row.image_urls ? row.image_urls.split(',') : [],
      }));

      return productsWithImagesAndPrices;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching products');
    }
  },

  getProductById: async (productId) => {
    const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    return rows[0];
  },
  createProduct: async (productName, description, category, variations, images) => {
    try {
      if (!productName) {
        throw new Error('Product name cannot be null');
      }

      const [productResult] = await db.query(
        'INSERT INTO products (name, description, category) VALUES (?, ?, ?)',
        [productName, description, category]
      );

      const productId = productResult.insertId;

      const variantPromises = variations.map(async (variant) => {
        const { color, size, price } = variant;

        // Assuming you have color, size, and style tables
        // and you retrieve their IDs based on the provided names
        const [colorResult] = await db.query('SELECT color_id FROM colors WHERE name = ?', [color]);
        const colorId = colorResult[0].color_id;

        const [sizeResult] = await db.query('SELECT size_id FROM sizes WHERE letter = ?', [size]);
        const sizeId = sizeResult[0].size_id;

        // Insert into product_variants
        const [variantResult] = await db.query(
          'INSERT INTO product_variants (product_id, color_id, size_id, price, quantity) VALUES (?, ?, ?, ?, ?)',
          [productId, colorId, sizeId, price, 0] // 0 là số lượng mặc định, bạn có thể cập nhật sau
        );

        const variantId = variantResult.insertId;

        // Thêm hình ảnh vào bảng product_images
        for (const image of images) {
          await db.query(
            'INSERT INTO product_images (variant_id, image_url) VALUES (?, ?)',
            [variantId, image]
          );
        }

        return variantId;
      });

      await Promise.all(variantPromises);

      return productId;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error or handle it as needed
    }
  },
  
  updateProduct: async (productId, name, description, price) => {
    await db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE product_id = ?', [name, description, price, productId]);
  }
};

module.exports = Product;
