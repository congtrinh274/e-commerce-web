const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
}

module.exports = route;
