import { ObjectId } from "mongodb";
import db from "../database/database.connect.js";
import {
  buscarPedido,
  buscarPedidos,
  checarEstoqueDeProdutos,
  obterProdutosComDetalhes,
  realizarBaixaDeProdutos,
} from "../database/database.services.js";

async function getPedido(req, res) {
  const { idUsuario } = res.locals.sessao;
  const { idPedido } = req.params;
  try {
    const pedido = await buscarPedido(idPedido);

    if (!pedido) return res.sendStatus(404);
    if (!pedido.idUsuario.equals(idUsuario)) return res.sendStatus(401);

    pedido.produtos = await obterProdutosComDetalhes(pedido);

    res.send(pedido);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function listarPedidos(_, res) {
  const { idUsuario } = res.locals.sessao;
  try {
    const pedidos = await buscarPedidos(idUsuario);
    if (!pedidos) return res.sendStatus(404);

    for (let pedido of pedidos) {
      pedido.produtos = await obterProdutosComDetalhes(pedido);
    }

    res.send(pedidos);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function criarPedido(req, res) {
  const { produtos } = req.body;
  const { idUsuario } = res.locals.sessao;
  try {
    const disponibilidade = await checarEstoqueDeProdutos(produtos);

    if (disponibilidade.error) {
      return res.status(401).send(disponibilidade.error);
    }

    await realizarBaixaDeProdutos(produtos);
    const { insertedId } = await db.collection("pedidos").insertOne({
      idUsuario,
      produtos,
      criadoEm: Date.now(),
    });
    res.status(201).send(insertedId);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listarPedidos, criarPedido, getPedido };
