const oracle = require("./../../libs/conection");

async function crearEncuesta(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO ENCUESTA(id_cliente, id_compra, calificacion, comentarios) 
					VALUES(:id_cliente, :id_compra, :calificacion, :comentarios) `;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		let results = await connection.execute(
			sql,
			{
				id_cliente: body.id_cliente,
				id_compra: body.id_compra,
				calificacion: body.calificacion,
				comentarios: body.comentarios,
			},
			{ autoCommit: true }
		);
		console.log("results", results);
		if (!results || !results.rowsAffected) {
			return null;
		}
		connection.close();
		return results;
	} catch (err) {
		console.log("err", err);
		if (connection) {
			connection.close();
		}
		return null;
	}
}

module.exports = {
    
	crearEncuesta,
};
