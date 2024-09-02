import logger from "pino";

const log = logger({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            timestamp: "SYS:yyyy-mm-dd HH:MM",
        }
    },
    base: {
        pid: false,
    },
});

export default log;
