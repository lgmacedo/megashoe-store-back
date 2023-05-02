import { ObjectId } from "mongodb";
import db from "./database.connect.js";

async function buscarProdutosComIds(objectIds) {
  try {
    const produtos = await db
      .collection("produtos")
      .find({ _id: { $in: objectIds } })
      .toArray();
    return produtos;
  } catch (err) {
    throw Error(err.message);
  }
}

async function checarEstoqueDeProdutos(produtosComprados) {
  const produtosEmEstoque = await buscarProdutosComIds(
    produtosComprados.map((p) => p.idProduto)
  );

  for (let produto of produtosComprados) {
    const produtoNoEstoque = produtosEmEstoque.find((produtoEstoque) =>
      produto.idProduto.equals(produtoEstoque._id)
    );

    if (produtoNoEstoque.quantidade < produto.quantidadeSelecionada) {
      return {
        success: false,
        error: `Quantidade indisponível de ${produtoNoEstoque.nome}`,
      };
    }
  }

  return { success: true, error: null };
}

async function realizarBaixaDeProduto(produto) {
  try {
    const { idProduto, quantidadeSelecionada } = produto;
    return await db.collection("produtos").updateOne(
      {
        _id: idProduto,
        quantidade: { $gte: quantidadeSelecionada },
      },
      { $inc: { quantidade: -quantidadeSelecionada } },
      { upsert: true }
    );
  } catch (err) {
    throw Error(err.message);
  }
}

async function realizarBaixaDeProdutos(produtos) {
  try {
    const promises = produtos.map(async (produto) => {
      return realizarBaixaDeProduto(produto);
    });
    return await Promise.all(promises);
  } catch (err) {
    throw Error(err.message);
  }
}

export {
  buscarProdutosComIds,
  realizarBaixaDeProdutos,
  checarEstoqueDeProdutos,
};
