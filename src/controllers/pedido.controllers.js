import db from "../database/database.connect.js";
import { realizarBaixaDeProdutos } from "../database/database.services.js";

function listarPedidos(_, res) {
  res.send("Listando pedidos");
}

async function criarPedido(req, res) {
  const { produtos } = req.body;
  try {
    const houveBaixa = await realizarBaixaDeProdutos(produtos);

    if (!houveBaixa) {
      return res.status(401).send("Quantidade de produtos indisponível");
    }

    const { insertedId } = await db.collection("pedidos").insertOne({
      idUsuario: "imagine o id de alguém aqui",
      criadoEm: Date.now(),
      produtos,
    });

    res.status(201).send(insertedId);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { listarPedidos, criarPedido };
