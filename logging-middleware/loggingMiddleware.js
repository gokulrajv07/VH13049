const logger = {
    info: (message) => {
        const timestamp = new Date().toISOString();
        console.log(`[INFO] [${timestamp}] ${message}`);
    },
    error: (message) => {
        const timestamp = new Date().toISOString();
        console.error(`[ERROR] [${timestamp}] ${message}`);
    },
    warn: (message) => {
        const timestamp = new Date().toISOString();
        console.warn(`[WARN] [${timestamp}] ${message}`);
    }
};

export default logger;