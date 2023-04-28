function listarPedidos(req, res) {
  res.send("Listando pedidos");
}

function criarPedido(req, res) {
  res.status(201).send(req.body);
}

export { listarPedidos, criarPedido };
