import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { doc } from './doc.js';
import { useRouter } from './routes/router.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);
    process.exit();
  }
})();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
useRouter(app);
app.use('/', swaggerUi.serve, swaggerUi.setup(doc));

app.listen(process.env.PORT || 8081, () => {
  console.log("Servidor iniciado");
  logger.info(`Servidor em execução na porta ${process.env.PORT}`);
});
