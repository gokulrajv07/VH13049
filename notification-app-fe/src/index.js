import express from 'express';
import axios from 'axios';
// If your custom logger path differs, keep it but use the import statement
import logger from '../../logging-middleware/loggingMiddleware.js'; 

const app = express();
app.use(express.json());

// Enable CORS explicitly for your frontend port (5173) to avoid data blocking
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const PRIORITY_MAP = {
    'Placement': 3,
    'Result': 2,
    'Event': 1
};

app.get('/api/priority-notifications', async (req, res) => {
    logger.info("Triggered: Fetching Priority Notifications Inbox.");
    try {
        const response = await axios.get('http://4.224.186.213/evaluation-service/notifications');
        const notifications = response.data.notifications;

        const sortedData = notifications.sort((a, b) => {
            const priorityA = PRIORITY_MAP[a.Type] || 0;
            const priorityB = PRIORITY_MAP[b.Type] || 0;

            if (priorityB !== priorityA) {
                return priorityB - priorityA; 
            }
            return new Date(b.Timestamp) - new Date(a.Timestamp);
        });

        logger.info(`Successfully prioritized. Dispatched items.`);
        return res.status(200).json({ success: true, data: sortedData });

    } catch (error) {
        logger.error(`Critical error on notification processing: ${error.message}`);
        return res.status(500).json({ error: "Failed processing notification weights." });
    }
});

app.listen(3000, () => logger.info('Notification Microservice online on port 3000'));