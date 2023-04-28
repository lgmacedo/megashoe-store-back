import { ObjectId } from "mongodb";
import db from "../database/database.connect.js";

function listarPedidos(req, res) {
  res.send("Listando pedidos");
}

function quantidadeDeProdutosPorId(produtosDoPedido) {
  const quantidadePorId = {};
  produtosDoPedido.forEach((produto) => {
    quantidadePorId[produto.idProduto] = produto.quantidadeSelecionada;
  });
  return quantidadePorId;
}

function checarQuantidadeAposBaixa(produtosNoEstoque, quantidadeComprada) {
  const produtosAposBaixa = produtosNoEstoque.map((p) => ({ ...p }));
  produtosAposBaixa.forEach((produto) => {
    const qty = quantidadeComprada[produto._id];
    produto.quantidade -= qty;
    if (produto.quantidade < 0) {
      return {
        error: `Não há disponibilidade de ${qty} unidades de ${produto.nome}`,
      };
    }
  });
  return produtosAposBaixa;
}

async function criarPedido(req, res) {
  const { produtos } = req.body;
  const quantidadeCompradaPorId = quantidadeDeProdutosPorId(produtos);
  try {
    const objectIds = produtos.map(({ idProduto }) => new ObjectId(idProduto));
    const produtosNoEstoque = await buscarProdutosComIds(objectIds);
    const produtosAposBaixa = checarQuantidadeAposBaixa(
      produtosNoEstoque,
      quantidadeCompradaPorId
    );

    if (produtosAposBaixa.error) {
      return res.status(401).send(produtosAposBaixa.error);
    }

    for (let { _id, quantidade } of produtosAposBaixa) {
      await db
        .collection("produtos")
        .updateOne({ _id: new ObjectId(_id) }, { $set: { quantidade } });
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
