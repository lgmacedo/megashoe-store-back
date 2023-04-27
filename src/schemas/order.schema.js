import Joi from "joi";

const orderSchema = Joi.object({
  idUsuario: Joi.string().required(),
  produtos: Joi.array().required(),
});

export default orderSchema;
