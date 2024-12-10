"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const { PORT } = process.env;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT, PATCH, DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Estimate app')
        .setDescription('api for estimate app')
        .setVersion('1.0')
        .addTag('estimate')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('documentation', app, documentFactory);
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map