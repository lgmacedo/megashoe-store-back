import { v4 as uuid } from "uuid";
import db from "../database/database.connect.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { email, senha } = req.body;
  try {
    const user = await db.collection("usuarios").findOne({ email });
    if (!user) return res.status(404).send("O email não foi cadastrado!");

    const senhaValida = bcrypt.compareSync(senha, user.senha);
    if (!senhaValida) return res.status(401).send("A senha está incorreta!");

    const token = uuid();
    await db.collection("sessoes").insertOne({ idUsuario: user._id, token });

    res.status(200).send({
      idUsuario: user._id,
      nome: user.nome,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function cadastro(req, res) {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await db.collection("usuarios").findOne({ email });
    if (usuario) return res.status(409).send("E-mail já foi cadastrado!");

    const senhaCript = bcrypt.hashSync(senha, 10);

    await db
      .collection("usuarios")
      .insertOne({ nome, email, senha: senhaCript });

    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
