import { ObjectId } from "mongodb";
import db from "../database/database.connect.js";

export async function getProdutos(req, res) {
  try {
    const produtos = await db.collection("produtos").find().toArray();
    return res.status(200).send(produtos);
  } catch (err) {
    return res.status(500).send("Erro inesperado. Tente novamente.");
  }
}

export async function addToCart(req, res) {
  console.log("entrou!");
  const { id } = req.body;
  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: new ObjectId(id) });
    if (!produto) return res.status(404).send("Produto não encontrado");
    if (produto.quantidade === 0)
      return res.status(404).send("Produto esgotado");
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send("Erro inesperado. Tente novamente.");
  }
}

export async function getProdutoById(req, res) {
  const { id } = req.params;
  try {
    const produto = await db
      .collection("produtos")
      .findOne({ _id: new ObjectId(id) });
    if (!produto) return res.status(404).send("Produto não encontrado");
    delete produto.quantidade;
    res.send(produto);
  } catch (err) {
    res.sendStatus(500);
  }
}
