export default (mongoose) => {
  const schemaRevendedor = mongoose.Schema({ 
    nome_completo: {
      type: String,
      required:true,
    },  
    cpf: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean, 
      default: false,
    }
  });

  const Revendedor = mongoose.model('revendedores', schemaRevendedor,'revendedores');

  return Revendedor
}
