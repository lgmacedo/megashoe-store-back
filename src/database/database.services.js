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

export { buscarProdutosComIds };
