
import { db } from '../models/index.js';
import fetch from "node-fetch";
import { logger } from '../config/logger.js';

const Compra = db.compra;
const CPF_VIP = ["15350946056"];

const objectStructure = (objectReq) => {
  const { codigo, valor, anoMesDia, cpf } = objectReq;
  const dateResult = anoMesDia.split('-');

  const objectData = {
    codigo,
    valor,
    cpf,
    anoMesDia,
    anoMes: `${dateResult[0]}-${dateResult[1]}`,
    status: "Em validação",
  };
  return objectData;
};

const create = async (req, res) => {
  try {
    const compraObj = objectStructure(req.body);

    if (CPF_VIP.includes(compraObj.cpf)) compraObj.status = "Aprovado";

    const newCompra = new Compra(compraObj);
    const compra = await newCompra.save(newCompra);

    res.status(201).json(compra);
    logger.info(`POST /compra - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /compra - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      status: false,
      message: 'Data for empty update',
    });
  }

  const _id = req.body._id;

  try {
    const compra = await Compra.findOne({ _id });

    if (compra.status === "Aprovado") return res.status(400).json({ status: false, message: "Compra Aprovada não pode ser alterada." })

    await Compra.updateOne({ _id }, req.body);

    res.status(200).json({ status: true, message: 'A compra alterada com Sucesso!' });
    logger.info(`PUT /Compra - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).json({ staus: false, message: 'Erro ao atualizar a  compra _id: ' + _id });
    logger.error(`PUT /Compra - ${id} - ${JSON.stringify(req.body)}`);
  }
};

const remove = async (req, res) => {
  const codigo = req.query.codigo;

  try {

    const compra = await Compra.findOne({ codigo });

    if (compra.status === "Aprovado") return res.status(400).json({ status: false, message: "Compra Aprovada não pode ser deletada." })

    await Compra.deleteOne({ codigo });
    res.status(200).json({ status: true, message: 'The compra was deleted successfully!' });

    logger.info(`DELETE /compra - ${id}`);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: 'Não foi possível deletar a compra id: ' + _id });
    logger.error(`DELETE /compra - ${JSON.stringify(error.message)}`);
  }
};

const getAllPeriod = async (req, res) => {
  const { cpf, anoMes } = req.query;

  //corrigir mensagem
  if (!cpf || !anoMes) {
    return res.status(404).send({
      error:
        'É necessário informar o parâmetro "cpf e anoMes", cujo valor deve estar no formato yyyy-mm',
    });
  }

  try {
    const query = { cpf, anoMes };
    const projection = { _id: 0, codigo: 1, valor: 1, data: 1, status: 1 };
    const compras = await Compra.find(query, projection);

    let totalAprovado = 0;
    let totalEmAprovacao = 0;

    compras.forEach(({ status, valor }) => {
      if (status === "Aprovado") totalAprovado += valor;
      if (status === "Em validação") totalEmAprovacao += valor;
    });

    let porcentagem = 0;
    if (totalAprovado < 1000.01) {
      porcentagem = 10;
    }
    else if (totalAprovado < 1500.01) {
      porcentagem = 15;
    } else {
      porcentagem = 20;
    }

    const comprasFinal = {
      porcentagem: `${porcentagem}%`,
      credito: valueNumber((totalAprovado * porcentagem) / 100),
      totalAprovado: valueNumber(totalAprovado),
      totalEmAprovacao: valueNumber(totalEmAprovacao),
      compras
    }

    res.status(200).send(comprasFinal);
    logger.info(`DELETE /compra - ${id}`);

  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.info(`DELETE /compra - ${id}`);

  }
};

const valueNumber = (value) => {
  return Number(value.toFixed(2))
}

const getAPI = (cpf) => {
  const API = process.env.API_URL;
  const cashback = fetch(`${API}?cpf=${cpf}`, {
    method: "GET",
    headers: { token: "ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm" },
  })
    .then((data) => data.json())
    .then((response) => response.body.credit);

  return cashback;
};

const getCashback = async (req, res) => {
  const { cpf, anoMes } = req.query;

  //corrigir mensagem
  if (!cpf || !anoMes) {
    return res.status(404).send({
      status: false,
      message:
        'É necessário informar o parâmetro "cpf e anoMes", cujo valor deve estar no formato yyyy-mm',
    });
  }

  try {
    const query = { cpf, anoMes, status: "Aprovado" };
    const projection = { _id: 0, cpf: 1, anoMes: 1, valor: 1 };
    const compras = await Compra.find(query, projection);
    const apiResults = await getAPI(cpf);

    const totalAprovado = compras.reduce((acc, cur) => {
      return acc + cur.valor;
    }, 0)

    let porcentagem = 0;
    if (totalAprovado < 1000.01) {
      porcentagem = 10;
    } else if (totalAprovado < 1500.01) {
      porcentagem = 15;
    } else {
      porcentagem = 20;
    }

    const credito = valueNumber((totalAprovado * porcentagem) / 100);
    const cashback = {
      cpf,
      anoMes,
      porcentagem: `${porcentagem}%`,
      acumulado: valueNumber(totalAprovado),
      credito,
      api_credito: apiResults,
      total_resgate: valueNumber(apiResults + credito)
    }

    res.status(200).send(cashback);
    logger.info(`DELETE /compra - ${id}`);

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    logger.info(`DELETE /compra - ${id}`);
  }
};

export default { create, remove, update, getAllPeriod, getCashback };
