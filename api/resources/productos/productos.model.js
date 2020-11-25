const oracle = require("./../../libs/conection");
const bcrypt = require("bcrypt");
const saltRounds = 5;

async function obtenerProductos() {
	let connection = null;
	try {
		const sql = `SELECT * FROM PRODUCTO`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		results = await connection.execute(
			sql,
			{},
			{ autoCommit: true }
		);
		console.log("results", results);
		if (results && results.rows) {
			return results.rows;
		}
		connection.close();
		return results;
	} catch (err) {
		console.log("err", err);
		return null;
	}
}


module.exports = {
	obtenerProductos,
};
