function listOrders(req, res) {
  res.send("Listando pedidos");
}

function createOrder(req, res) {
  res.status(201).send(req.body);
}

export { listOrders, createOrder };
