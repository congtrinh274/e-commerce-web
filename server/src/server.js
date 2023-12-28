
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const variationRoutes = require('./routes/variationRoutes');
const { specs, swaggerUi } = require('./swagger');
const cors = require('cors');
require('dotenv').config();



const app = express();
app.use(bodyParser.json());
app.use(cors());



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/variations', variationRoutes);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
