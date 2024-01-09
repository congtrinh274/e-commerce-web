const db = require('../config/db').promise();

const Product = {
  getAllProducts: async () => {
    try {
      const [rows] = await db.query(`
        SELECT
          products.product_id,
          products.name,
          GROUP_CONCAT(DISTINCT IFNULL(product_variants.price, '')) AS prices,
          GROUP_CONCAT(DISTINCT IFNULL(product_variants.img_url, '')) AS image_urls
        FROM
          products
          LEFT JOIN product_variants ON products.product_id = product_variants.product_id
        GROUP BY
          products.product_id, products.name
      `);

      const productsWithImagesAndPrices = rows.map(row => ({
        product_id: row.product_id,
        name: row.name,
        prices: row.prices ? row.prices.split(',').map(price => (price ? parseFloat(price) : null)) : [],
        image_urls: row.image_urls ? row.image_urls.split(',') : [],
      }));

      return productsWithImagesAndPrices;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching products');
    }
  },


  getProductById: async (productId) => {
    try {
      const [rows] = await db.query(`
        SELECT
          products.product_id,
          products.name,
          products.description,
          shops.shop_name,
          GROUP_CONCAT(DISTINCT IFNULL(product_variants.price, '')) AS prices,
          GROUP_CONCAT(DISTINCT IFNULL(product_variants.img_url, '')) AS url_img,
          GROUP_CONCAT(DISTINCT IFNULL(colors.name, '')) AS colors,
          GROUP_CONCAT(DISTINCT IFNULL(sizes.name, '')) AS sizes
        FROM
          products
          LEFT JOIN product_variants ON products.product_id = product_variants.product_id
          LEFT JOIN shops ON products.user_id = shops.user_id
          LEFT JOIN colors ON product_variants.color_id = colors.color_id
          LEFT JOIN sizes ON product_variants.size_id = sizes.size_id
        WHERE
          products.product_id = ?
        GROUP BY
          products.product_id, products.name
      `, [productId]);
  
      if (rows.length === 0) {
        throw new Error('Product not found');
      }
  
      // Split prices, url_img, color_ids, and size_ids into arrays
      const productDetails = {
        product_id: rows[0].product_id,
        name: rows[0].name,
        description: rows[0].description,
        shop_name: rows[0].shop_name,
        prices: rows[0].prices ? rows[0].prices.split(',').map(price => (price ? parseFloat(price) : null)) : [],
        url_img: rows[0].url_img ? rows[0].url_img.split(',') : [],
        colors: rows[0].colors ? rows[0].colors.split(',') : [],
        sizes: rows[0].sizes ? rows[0].sizes.split(',') : [],
      };
  
      return productDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching product details');
    }
  },
  


  createProduct: async (user_id, productName, description, category, variations) => {
    try {
      if (!productName) {
        throw new Error('Product name cannot be null');
      }
  
      // Insert into the products table
      const [productResult] = await db.query(
        'INSERT INTO products (user_id, name, description, category_id) VALUES (?, ?, ?, ?)',
        [user_id, productName, description, category]
      );
  
      const productId = productResult.insertId;
  
      // Insert product variants
      const variantPromises = variations.map(async (variant, index) => {
        const { color, size, price, image } = variant;
  
        // Insert into colors table or get existing color_id
        const [colorResult] = await db.query('SELECT color_id FROM colors WHERE name = ?', [color]);
        const colorId = colorResult.length > 0 ? colorResult[0].color_id : (await db.query('INSERT INTO colors (name) VALUES (?)', [color]))[0].insertId;
  
        // Insert into sizes table or get existing size_id
        const [sizeResult] = await db.query('SELECT size_id FROM sizes WHERE letter = ?', [size]);
        const sizeId = sizeResult.length > 0 ? sizeResult[0].size_id : (await db.query('INSERT INTO sizes (letter) VALUES (?)', [size]))[0].insertId;
  
        // Insert into product_variants (including img_url)
        const [variantResult] = await db.query(
          'INSERT INTO product_variants (product_id, color_id, size_id, price, quantity, img_url) VALUES (?, ?, ?, ?, ?, ?)',
          [productId, colorId, sizeId, price, 0, image]
        );
  
        const variantId = variantResult.insertId;
  
        return variantId;
      });
  
      await Promise.all(variantPromises);
  
      return productId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },


  updateProduct: async (productId, name, description, price) => {
    await db.query('UPDATE products SET name = ?, description = ?, price = ? WHERE product_id = ?', [name, description, price, productId]);
  }
};

module.exports = Product;
