"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const whatsapp_routes_1 = __importDefault(require("./api/routes/whatsapp.routes"));
const webhook_routes_1 = __importDefault(require("./api/routes/webhook.routes"));
const email_routes_1 = __importDefault(require("./api/routes/email.routes"));
const email_controller_1 = require("./api/controllers/email.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Middleware para logar todas as requisições (debug)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Recebida requisição: ${req.method} ${req.originalUrl}`);
    // Log headers for more details
    // console.log('Headers:', req.headers);
    next();
});
// Direct route for email sending to bypass routing issues
app.post('/email/send-email', (req, res) => {
    console.log('[DIRECT ROUTE] Email send-email route hit!');
    (0, email_controller_1.sendEmail)(req, res);
});
// Routes
app.use('/api/whatsapp', whatsapp_routes_1.default);
app.use('/webhook', webhook_routes_1.default);
app.use('/api/email', email_routes_1.default);
// Rota raiz para testar se o servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'API running' });
});
// Rota para listar todas as rotas (debug)
app.get('/debug/routes', (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({
                method: Object.keys(middleware.route.methods)[0].toUpperCase(),
                path: middleware.route.path
            });
        }
        else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        method: Object.keys(handler.route.methods)[0].toUpperCase(),
                        path: middleware.regexp.toString()
                            .replace('\\^', '')
                            .replace('\\/?(?=\\/|$)', '')
                            .replace(/\\\//g, '/') + handler.route.path
                    });
                }
            });
        }
    });
    res.json({ routes });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
