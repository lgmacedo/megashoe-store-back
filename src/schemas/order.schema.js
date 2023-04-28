import Joi from "joi";
import { ObjectId } from "mongodb";

function validarIdProduto(value) {
  if (!ObjectId.isValid(value)) throw Error("O id do produto é inválido");
  return value;
}

const orderProdutoSchema = Joi.object({
  idProduto: Joi.string().custom(validarIdProduto).required(),
  quantidade: Joi.number().positive().integer().required(),
});

const orderSchema = Joi.object({
  idUsuario: Joi.string().required(),
  produtos: Joi.array().min(1).items(orderProdutoSchema).required(),
});

export default orderSchema;
