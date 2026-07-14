"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: '*' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const swaggerPath = 'api-docs';
    app.use(`/${swaggerPath}`, (req, res, next) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Surrogate-Control', 'no-store');
        next();
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pasar Baru School API')
        .setDescription('API for Pasar Baru Gurmukhi & Kirtan Class management')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(swaggerPath, app, document, {
        customSiteTitle: 'Pasar Baru School API',
        customCss: `
      .swagger-ui .topbar { display: none; }
      .swagger-ui { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      .swagger-ui .info .title { color: #1A237E; }
    `,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map