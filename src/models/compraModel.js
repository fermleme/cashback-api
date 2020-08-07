export default (mongoose) => {
  const schemaCompra = mongoose.Schema({
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    cpf: {
      type: String,
      required: true
    },
    anoMes: {
      type: String,
    },
    anoMesDia: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
    }
  });

  const Compras = mongoose.model('compras', schemaCompra);
  return Compras;
};
