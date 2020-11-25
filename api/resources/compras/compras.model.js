const oracle = require("./../../libs/conection");
const { v4: uuidv4 } = require("uuid");

async function obtenerTipoDeCompras() {
	let connection = null;
	try {
		const sql = `SELECT * FROM TIPO_COMPRA`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		results = await connection.execute(sql, {}, { autoCommit: true });
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

async function obtenerTiposDePagos() {
	let connection = null;
	try {
		const sql = `SELECT * FROM TIPO_PAGO`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		results = await connection.execute(sql, {}, { autoCommit: true });
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

async function crearCompraPorCliente(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO COMPRA(referencia, id_cliente, id_status, id_tipo_compra, fecha_creacion) 
					VALUES(:referencia, :id_cliente, :id_status, :id_tipo_compra, :fecha_creacion)`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		const reference = uuidv4();
		let results = await connection.execute(
			sql,
			{
				referencia: reference,
				id_cliente: body.id_usuario,
				id_status: 1,
				id_tipo_compra: 2,
				fecha_creacion: new Date(),
			},
			{ autoCommit: true }
		);
		if (!results || !results.rowsAffected) {
			return null;
		}
		console.log("results", results);
		const sql_select = `SELECT id FROM COMPRA WHERE referencia = :referencia`;
		let resultsSelect = await connection.execute(
			sql_select,
			{
				referencia: reference,
			},
			{ autoCommit: true }
		);
		if (!resultsSelect || !resultsSelect.rows) {
			return null;
		}
		const compraNueva = resultsSelect.rows[0];
		console.log("compraNueva", compraNueva);
		for (let i = 0; i < body.productos.length; i++) {
			let sql_product_compra = `INSERT INTO PRODUCTO_COMPRA(id_compra, id_producto, cantidad) 
			VALUES(:id_compra, :id_producto, :cantidad)`;
			let results_product_compra = await connection.execute(
				sql_product_compra,
				{
					id_compra: compraNueva.ID,
					id_producto: body.productos[i].id_producto,
					cantidad: body.productos[i].cantidad,
				},
				{ autoCommit: true }
			);
			console.log("results_product_compra", results_product_compra);
		}
		console.log("resultsSelect", resultsSelect);
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

async function crearCompraPorEmpleado(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO COMPRA(referencia, id_vendedor, id_status, id_tipo_compra, fecha_creacion) 
					VALUES(:referencia, :id_vendedor, :id_status, :id_tipo_compra, :fecha_creacion)`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		const reference = uuidv4();
		let results = await connection.execute(
			sql,
			{
				referencia: reference,
				id_vendedor: body.id_vendedor,
				id_status: 1,
				id_tipo_compra: 2,
				fecha_creacion: new Date(),
			},
			{ autoCommit: true }
		);
		if (!results || !results.rowsAffected) {
			return null;
		}
		console.log("results", results);
		const sql_select = `SELECT id FROM COMPRA WHERE referencia = :referencia`;
		let resultsSelect = await connection.execute(
			sql_select,
			{
				referencia: reference,
			},
			{ autoCommit: true }
		);
		if (!resultsSelect || !resultsSelect.rows) {
			return null;
		}
		const compraNueva = resultsSelect.rows[0];
		console.log("compraNueva", compraNueva);
		for (let i = 0; i < body.productos.length; i++) {
			let sql_product_compra = `INSERT INTO PRODUCTO_COMPRA(id_compra, id_producto, cantidad) 
			VALUES(:id_compra, :id_producto, :cantidad)`;
			let results_product_compra = await connection.execute(
				sql_product_compra,
				{
					id_compra: compraNueva.ID,
					id_producto: body.productos[i].id_producto,
					cantidad: body.productos[i].cantidad,
				},
				{ autoCommit: true }
			);
			console.log("results_product_compra", results_product_compra);
		}
		console.log("resultsSelect", resultsSelect);
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

async function actualizarEstadoCompra(body) {
	let connection = null;
	try {
		const sql = `UPDATE COMPRA set id_status = :id_status WHERE id = :id_compra`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		let results = await connection.execute(
			sql,
			{
				id_status: body.id_status,
				id_compra: body.id_compra,
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

async function crearPago(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO PAGO(id_compra, monto, id_tipo_pago) 
					VALUES(:id_compra, :monto, :id_tipo_pago) `;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		let results = await connection.execute(
			sql,
			{
				id_compra: body.id_compra,
				monto: body.monto,
				id_tipo_pago: body.id_tipo_pago,
			},
			{ autoCommit: true }
		);
		console.log("results", results);
		if (!results || !results.rowsAffected) {
			return null;
		}
		const resultUpdateStatus = await actualizarEstadoCompra({
			id_status: 5,
			id_compra: body.id_compra,
		});
		console.log("resultUpdateStatus", resultUpdateStatus);
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
	obtenerTipoDeCompras,
	obtenerTiposDePagos,
	crearCompraPorCliente,
	crearCompraPorEmpleado,
	actualizarEstadoCompra,
	crearPago,
};
