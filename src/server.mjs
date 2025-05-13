import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config/index.mjs';
import { ApiRequest } from './apiRequest.mjs';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Handle all routes using ApiRequest
app.all('*', async (req, res, next) => {
    try {
        // Create ApiRequest instance from Express request
        // const apiRequest = ApiRequest.fromExpress(req);
        const apiRequest = await ApiRequest.create(req);

        // Add middleware
        // apiRequest
        //     .use(loggingMiddleware)
        //     .use(validationMiddleware);

        // // Log incoming request
        // logger.info('Incoming request', {
        //     method: apiRequest.httpMethod,
        //     path: apiRequest.path,
        //     query: apiRequest.queryParams
        // });

        // Route the request and get response
        // const result = await apiRequest.route();
        const processor = apiRequest.getProcessor();
        let result = null;
        if (res.headersSent) {
            return;
        }

        // Parse body only if it exists and is a string

        console.log(`processing ${processor.constructor.name}.${req.method} request`);
        switch (req.method) {
            case 'OPTIONS':
                result = await processor.onOptions();
                break;
            case 'GET':
                result = await processor.onGet();
                break;
            case 'POST':
                result = await processor.onPost();
                break;
            case 'DELETE':
                result = await processor.onDelete();
                break;
            case 'PUT':
                result = await processor.onPut();
                break;
            case 'PATCH':
                result = await processor.onPatch();
                break;
            default:
                throw new Error(`${req.method} not supported`);
        }

        let responseBody = '';
        if (result?.body) {
            try {
                responseBody = typeof result.body === 'string'
                    ? JSON.parse(result.body)
                    : result.body;
            } catch (e) {
                responseBody = result.body;
            }
        }

        res
            .status(result?.statusCode)
            .set(result?.headers || {})
            .json(responseBody);

    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    // Check if response has already been sent
    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        errorCode: 500,
        errorMessage: 'Internal Server Error'
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Give time for logging before exit
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', {
        promise,
        reason
    });
});

// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 30000);
};

// Listen for shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const port = config.port || 3000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Keep track of connections
let connections = [];

server.on('connection', (connection) => {
    connections.push(connection);
    connection.on('close', () => {
        connections = connections.filter(curr => curr !== connection);
    });
});

export default app;
