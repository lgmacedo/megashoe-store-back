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

async function realizarBaixaDeProdutos(produtos) {
  try {
    for (let { idProduto, quantidadeComprada } of produtos) {
      await db.collection("produtos").updateOne(
        {
          _id: new ObjectId(idProduto),
          quantidade: { $gte: quantidadeComprada },
        },
        { $inc: { quantidade: -quantidadeComprada } },
        { upsert: true, session: session }
      );
    }
    return true;
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
}

export { buscarProdutosComIds, realizarBaixaDeProdutos };
