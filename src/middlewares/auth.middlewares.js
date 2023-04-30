import db from "../database/database.connect.js";

export async function autentica(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("O token não existe!");
  try {
    const sessao = await db.collection("sessoes").findOne({ token });
    if (!sessao) return res.status(401).send("Token inválido!");

    res.locals.sessao = sessao;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
