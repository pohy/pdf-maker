import { htmlToPdfRouteHandler } from './htmlToPdfRouteHandler';
import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';
import { PORT } from './config';
import { expressLogger } from './tools/logger';

if (typeof process.env.SLIMERJSLAUNCHER === 'undefined') {
    throw new Error(
        'SLIMERJSLAUNCHER environment variable must be set to a Firefox 59.0 executable',
    );
}

const app = express();

app.use(expressLogger('pdf-maker'));

app.use(json());
app.use(cors());

app.get('/html/pdf', htmlToPdfRouteHandler);

app.get('/kill', () => {
    process.exit();
});

app.listen(PORT, () => {
    console.log(
        `█████████████████████████████████████████████████████████████████████`,
    );
    console.log(`API is running at http://localhost:${PORT}`);
});

function messageJSON(message: string) {
    return {
        message,
    };
}
