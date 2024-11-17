import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  //спочатку підєднуємось до бази
  await initMongoDB();
  //потім запускаємо сервер
  startServer();
};
bootstrap();

//b9UdqDY6ofixIvtq
