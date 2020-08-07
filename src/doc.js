export const doc = {
  swagger: '2.0',
  info: {
    description: 'Cash Back Revendedores',
    version: '1.0.0',
    title: 'Cash Back Revendedores',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  tags: [
    {
      name: 'Compra',
      description: 'Compras dos Revendedores',
    },
    {
      name: 'Revendedor',
      description: 'Revendedores',
    }
  ],
  paths: {
    '/compra': {
      get: {
        tags: ['Compra'],
        summary: 'Compra',
        description: 'Retorna as Compras do Revendedor',
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'cpf',
            description: 'CPF do Revendedor',
            required: true,
          },
          {
            in: 'query',
            name: 'anoMes',
            description: 'Informe o período mês e ano. (yyyy-mm)',
            required: true,
          },
        ],
        responses: {
          '200': { description: 'Successful operation' },
          '500': {
            description: 'Error occurred',
            schema: { $ref: '#/definitions/Menssagem' },
          },
        },
      },
      post: {
        tags: ['Compra'],
        summary: 'Cria uma Compra',
        description: 'Create a new Revendedor with the received parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Compra object',
            required: true,
            schema: {
              type: 'object',
              required: ['codigo', 'valor', 'cpf', 'anoMesDia'],
              properties: {
                codigo: { type: 'string', description: "Codigo da compra" },
                valor: {
                  type: 'number',
                  format: 'double',
                  description: "Valor da compra",
                },
                cpf: { type: 'string', description: "CPF do Revendedor" },
                anoMesDia: { type: 'string', description: "Data da Compra" },
              },
            },
          },
        ],
        responses: {
          '201': {
            description: 'Successful operation',
            schema: { $ref: '#/definitions/Compra' },
          },
          '500': {
            description: 'Ocorreu um erro',
            schema: { $ref: '#/definitions/Menssagem' },
          },
        },
      },
      delete: {
        tags: ['Compra'],
        summary: 'Apaga uma Compra',
        description: '',
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'codigo',
            description: 'Código da compra',
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'Operação Feita com Sucesso!',
            schema: { $ref: '#/definitions/Menssagem' },
          },
          '500': {
            description: 'Ocorreu um erro.',
            schema: { $ref: '#/definitions/Menssagem' },
          },
        },
      },
      put: {
        tags: ['Compra'],
        summary: 'Atualiza uma compra',
        description: 'Update a compra with the received parameters',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'compra object',
            required: true,
            schema: { $ref: '#/definitions/Compra' },
          },
        ],
        responses: {
          '400': {
            description: 'validação de revendedor',
            schema: { $ref: '#/definitions/Menssagem' },
          },
          '200': {
            description: 'Operção feita com sucesso!', schema: { $ref: '#/definitions/Menssagem' }
          },
          '500': {
            description: 'Ocorreu um erro', schema: { $ref: '#/definitions/Menssagem' }
          },
        },
      },
    },
    '/cashback': {
      get: {
        tags: ['Compra'],
        summary: 'Retorna a quantidade do Cashback das Compras',
        description: 'Retorna a quantidade do Cashback das Compras',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'cpf',
            description: 'CPF do Revendedor',
            required: true,
          },
          {
            in: 'query',
            name: 'anoMes',
            description: 'Informe o período mês e ano. (yyyy-mm)',
            required: true,
          },
        ],
        responses: {
          '200': { description: 'Successful operation' },
          '404': {
            description: 'Error occurred', schema: { $ref: '#/definitions/Menssagem' }
          },
          '500': {
            description: 'Error occurred', schema: { $ref: '#/definitions/Menssagem' }
          },
        },
      },
    },
    '/revendedor': {
      post: {
        tags: ['Revendedor'],
        summary: 'Cadastro de novo revendedor',
        description: 'Cadastro de novo revendedor',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Objeto Revendedor',
            required: true,
            schema: {
              type: 'object',
              required: ['nome_completo', 'cpf', 'email', 'senha'],
              properties: {
                nome_completo: { type: 'string', description: "Nome Completo" },
                cpf: { type: 'string', description: "CPF do Revendedor" },
                valor: { type: 'string', description: "Email do Revendedor" },
                senha: {
                  type: 'string',
                  description: "Senha do Revendedor",
                },
              },
            },
          },
        ],
        responses: {
          '201': {
            description: 'Successful operation',
            schema: { $ref: '#/definitions/Menssagem' },
          },
          '500': {
            description: 'Ocorreu um erro',
            schema: { $ref: '#/definitions/Menssagem' },
          },
        },
      },
    },
    '/revendedor/login': {
      get: {
        tags: ['Revendedor'],
        summary: 'Verifica que o login e senha do Revendedor',
        description: 'Verifica que o login e senha do Revendedor',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'cpf',
            description: 'CPF do Revendedor',
            required: true,
          },
          {
            in: 'query',
            name: 'senha',
            description: 'Informe do revendedor',
            required: true,
          },
        ],
        responses: {
          '201': {
            description: 'Successful operation',
            schema: { $ref: '#/definitions/Revendedor' },
          },
          '400': {
            description: 'Ocorreu erro',
            schema: { $ref: '#/definitions/Menssagem' },
          },
          '404': {
            description: 'Ocorreu erro',
            schema: { $ref: '#/definitions/Menssagem' },
          },
          '500': {
            description: 'Ocorreu um erro',
            schema: { $ref: '#/definitions/Menssagem' },
          },
        },
      },
    },
  },
  definitions: {
    Revendedor: {
      type: 'object',
      required: ['nome_completo', 'cpf', 'email', 'senha'],
      properties: {
        _id: { type: 'string', },
        nome_completo: { type: 'string', description: "Nome do revendedor" },
        cpf: { type: 'string' },
        email: { type: 'string' },
        senha: { type: 'string' },
        status: { type: 'boolean' }
      },
    },
    Compra: {
      type: 'object',
      required: ['codigo', 'cpf', 'anoMesDia', 'valor'],
      properties: {
        _id: { type: 'string' },
        codigo: { type: 'string', description: "Código da compra" },
        cpf: { type: 'string', description: "CPF do revendedor" },
        anoMes: { type: 'string' },
        anoMesDia: { type: 'string', },
        valor: { type: 'number', format: 'double' },
        status: {
          type: 'string', enum: ['Em validação', 'Aprovado'],
        }
      },
    },
    Menssagem: {
      type: 'object',
      properties: {
        status: { type: 'boolean', example: "true: sucesso, false: falha." },
        message: { type: 'string', description: "Retorno da operação" },
      },
    },
  },
}