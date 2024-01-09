const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { specs, swaggerUi } = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const variationRoutes = require('./routes/variationRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variations', variationRoutes);
app.use('/api/categories', categoriesRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
