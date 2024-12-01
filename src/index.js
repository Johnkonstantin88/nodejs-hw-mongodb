import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const appLauncher = async () => {
  await initMongoConnection();
  setupServer();
};

appLauncher();
