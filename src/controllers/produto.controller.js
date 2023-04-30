import { ObjectId } from "mongodb";
import db from "../database/database.connect.js";
import { buscarProdutosComIds } from "../database/database.services.js";

export async function getTodosProdutos(_, res) {
  try {
    const produtos = await db.collection("produtos").find().toArray();
    return res.status(200).send(produtos);
  } catch (err) {
    return res.status(500).send("Erro inesperado. Tente novamente.");
  }
}

export async function getProduto(req, res) {
  const { idProduto } = req.params;
  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: new ObjectId(idProduto) });
    if (!produto) return res.status(404).send("Produto não encontrado");
    return res.status(200).send(produto);
  } catch (err) {
    return res.status(500).send("Erro inesperado. Tente novamente.");
  }
}

export async function checarDisponibilidadeProduto(req, res) {
  const { idProduto } = req.params;
  if (!ObjectId.isValid(idProduto)) return res.sendStatus(422);
  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: new ObjectId(idProduto) });
    if (!produto) return res.status(404).send("Produto não encontrado");
    if (produto.quantidade === 0)
      return res.status(404).send("Produto esgotado");
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send("Erro inesperado. Tente novamente.");
  }
}

export async function getProdutosComIds(req, res) {
  const { ids } = req.query;
  if (!Array.isArray(ids) || ids.length === 0) return res.sendStatus(422);
  const objectIds = ids
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));
  try {
    const produtos = await buscarProdutosComIds(objectIds);
    res.send(produtos);
  } catch (err) {
    res.status(500).send("Erro inesperado. Tente novamente.");
  }
}
