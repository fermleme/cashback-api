import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Revendedor = db.revendedor;

const create = async (req, res) => {
  const { nome_completo, cpf, email, senha } = req.body;
  const revendedor = new Revendedor({ nome_completo, cpf, email, senha });

  try {
    const data = await revendedor.save(revendedor);
    res.status(201).json(data);

    logger.info(`POST /revendedor - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /revendedor - ${JSON.stringify(error.message)}`);
  }
};

const findUser = async (req, res) => {
  const { cpf, senha } = req.query;

  try {
    const revendedor = await Revendedor.findOne({ cpf });

    if (!revendedor) return res.status(404).json({ status: false, message: "Revendedor não cadastrado." })
    if (revendedor.senha !== senha) return res.status(400).json({ status: false, message: "Senha incorreta" })

    res.status(200).json({ status: true, message: revendedor });

    logger.info(`GET /revendedor`);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /revendedor - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const cpf = req.query.cpf;
  const query = { cpf };

  try {
    const umRevendedor = await Revendedor.find(query);

    res.status(200).json(umRevendedor);
    logger.info(`GET /revendedor`);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Erro ao listar o documento' });
    logger.error(`GET /revendedor - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Sem dados para atualizar.',
    });
  }

  const id = req.params.id;

  try {
    await Revendedor.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).json({ message: 'Revendedor atualizado com successfully!' });

    logger.info(`PUT /Revendedor - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o Revendedor id: ' + id });
    logger.error(`PUT /Revendedor - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Revendedor.deleteOne({ _id: id });
    res.status(200).json({ message: 'The Revendedor foi deletado com sucesso!' });

    logger.info(`DELETE /revendedor - ${id}`);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Não foi possivel deletar o  Revendedor ID: ' + ID });
    logger.error(`DELETE /Revendedor - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findUser, remove, update, findOne };
