const { Pool } = require("pg");
const format = require("pg-format");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "tienda_de_joyas",
  port: 5432,
  allowExitOnIdle: true,
});
// consulta.js
// ...
// Agregamos la función obtenerJoyas
const obtenerJoyas = async ({ limits = 10, order_by = "id_ASC", page = 0 }) => {
  //let consulta = "SELECT * FROM inventario LIMIT $1";
  const [columna, order] = order_by.split("_");
  const offset = page * limits;
  let consulta = format(
    "SELECT * FROM inventario ORDER BY id %$ %$ LIMIT %$ OFFSET %$ ",
    columna,
    orden,
    limits,
    offset
  );
  console.log = consulta;
  console.log = order_by;
  console.log = columna;
  console.log = orden;
  const { rows: inventario } = await pool.query(consulta);
  return { total: 100, results: inventario };
};

//

const joyasFiltros = async ({ limits = 10, order_by = "id_ASC", page = 0 }) => {
  //let consulta = "SELECT * FROM inventario LIMIT $1";
  const [columna, order] = order_by.split("_");
  const offset = page * limits;
  let consulta = format(
    "SELECT * FROM inventario ORDER BY categoria %$ MAYOR %$ MENOR %$ metal %$ ",
    categoria,
    mayor,
    menor,
    metal
  );
  console.log = precio_mayor;
  console.log = precio_menor;
  console.log = categoria;
  console.log = metal;
  const { rows: inventario } = await pool.query(consulta);
  return { total: 100, results: inventario };
};

//Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base de datos.

const prepararHATEOAS = (joyas) => {
  const results = inventario
    .map((m) => {
      return {
        name: m.nombre,
        href: `/inventario/joyas/${m.id}`,
      };
    })
    .slice(0, 4);
  const total = inventario.length;
  const HATEOAS = {
    total,
    stock,
    results,
  };
  return HATEOAS;
};

// Exportamos la función
module.exports = { obtenerJoyas };
