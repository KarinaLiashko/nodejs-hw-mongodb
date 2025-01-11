import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  //спочатку підєднуємось до бази
  await initMongoDB();
  //потім запускаємо сервер
  setupServer();
};
bootstrap();
