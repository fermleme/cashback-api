import mongoose from 'mongoose';
import compraModel from './compraModel.js'
import revendedorModel from './revendedorModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;
db.compra = compraModel(mongoose);
db.revendedor = revendedorModel(mongoose);

export  { db };