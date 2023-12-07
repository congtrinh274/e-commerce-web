const userRouter = require('./user.routes');

function route(app) {
    app.use('/users', userRouter);
}

module.exports = route;
