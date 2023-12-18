const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const storeRouter = require('./store.routes');
const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
    app.use('/store', storeRouter);
    app.use('/category', categoryRouter);
    app.use('/products', productRouter);
}

module.exports = route;
