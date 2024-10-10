const express = require("express");

const { obtenerJoyas } = require("./consultas"); //Importamos el paquete externo express.

const app = express(); //Instanciamos express.

app.listen(3000, console.log("Servidor encendido por el puerto 3000")); //Usando el método listen.

app.use(express.json()); //Argumento middleware.

//Utilizamos el query recién creado.

app.get("/inventario", async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await obtenerJoyas(queryStrings);
    const HATEOAS = await prepararHATEOAS(inventario);
    res.json(HATEOAS);
    res.json(inventario);
    const { limits, order, page } = req.body;
    await obtenerJoyas(limits, order, page);
    res.send("El post fue agregado con éxito");
  } catch (error) {
    res
      .status(400)
      .send(
        "Se ha violado la restricción NOT NULL en uno de los campos de la tabla"
      );
  }
  res.status(500).send(error.message);
});

app.get("/inventario/joyas/filtros", async (req, res) => {
  const queryStrings = req.query;
  const joyas = await obtenerJoyasPorFiltros(queryStrings);
  res.json(joyas);
});
