const os = require('os');

const networkInterfaces = os.networkInterfaces();

const ipv4Addresses = [];
Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach((iface) => {
        if (iface.family === 'IPv4' && !iface.internal) {
            ipv4Addresses.push(iface.address);
        }
    });
});

module.exports = { ipv4Addresses };
