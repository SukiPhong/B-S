const SocketService = require('../services/socketService');

let socketService;

const initSocket = (io) => {
    socketService = new SocketService(io);

    io.on('connection', (socket) => {
        socketService.handleConnection(socket);
    });

    return socketService;
};

const getSocketService = () => {
    if (!socketService) {
        throw new Error('Socket service not initialized');
    }
    return socketService;
};

const emitToUser = async (userId, event, data) => {
    const service = getSocketService();
    return service.emitNotification(userId, data);
};

const emitToAdmin = async (event, data) => {
    const service = getSocketService();
    return service.emitSystemNotification(data);
};

module.exports = {
    initSocket,
    getSocketService,
    emitToUser,
    emitToAdmin
};

