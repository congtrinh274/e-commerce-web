import config from '~/config';
import { AdminHome, Brands, Categories, Users } from '~/pages/Admins';
import Home from '~/pages/Homes';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import { Verifying, Verified } from '~/pages/Verify';

// Public routes
const publicRoutes = [
    { path: config.routes.home, components: Home },
    { path: config.routes.admin, components: AdminHome },
    { path: config.routes.categoriesManager, components: Categories },
    { path: config.routes.brandsManager, components: Brands },
    { path: config.routes.usersManager, components: Users },
    { path: config.routes.login, components: Login },
    { path: config.routes.register, components: Register },
    { path: config.routes.verifying, components: Verifying },
    { path: config.routes.verified, components: Verified },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
