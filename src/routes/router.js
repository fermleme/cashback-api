import revendedorController from '../controllers/revedendorController.js';
import compraController from '../controllers/compraController.js';

const useRouter = (router) => {

  router.get('/revendedor/login', revendedorController.findUser);
  router.post('/revendedor', revendedorController.create);

  router.post('/compra', compraController.create);
  router.put('/compra', compraController.update);
  router.delete('/compra', compraController.remove);
  router.get('/compra', compraController.getAllPeriod);

  router.get('/cashback', compraController.getCashback);
}

export { useRouter };
