const oracle = require("./../../libs/conection");
const bcrypt = require("bcrypt");
const saltRounds = 5;

async function getUsers() {
	const sql = "SELECT * FROM rol";
	const connection = await oracle.getConnection();
	results = await connection.execute(sql);
	if (results && results.rows) {
		return results.rows;
	}
	return [];
}

async function createRol(body) {
	try {
		const sql = `INSERT INTO ROL(nombre) VALUES(:nombre)`;
		console.log("sql: ", sql);
		const connection = await oracle.getConnection();
		results = await connection.execute(
			sql,
			{ nombre: body.nombre },
			{ autoCommit: true }
		);
		console.log("results", results);
		if (results && results.rowsAffected) {
			return results.rowsAffected;
		}
		connection.close();
		return results;
	} catch (err) {
		console.log("err", err);
		return null;
	}
}

async function createClient(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO USUARIO(nombre, email, password, id_rol) 
		VALUES(:nombre, :email, :password, :id_rol)`;
		connection = await oracle.getConnection();
		const hashedPwd = await bcrypt.hash(body.password, saltRounds);
		console.log("password", hashedPwd);
		results = await connection.execute(
			sql,
			{
				nombre: body.nombre,
				email: body.email,
				password: hashedPwd,
				id_rol: 2,
			},
			{ autoCommit: true }
		);
		if (results && results.rowsAffected) {
			return results.rowsAffected;
		}
		connection.close();
		return results;
	} catch (err) {
		if (connection) {
			connection.close();
		}
		console.log("err", err);
		return null;
	}
}

async function loginUser(body) {
	let connection = null;
	try {
		const sql = `SELECT id, nombre, email, password, id_rol FROM USUARIO 
					WHERE email = :email`;
		connection = await oracle.getConnection();
		results = await connection.execute(
			sql,
			{ email: body.email },
			{ autoCommit: true }
		);
		if(!results || !results.rows.length) {
			return null;
		}
		const passwordHashed = results.rows[0][3];
		const user = {
			id: results.rows[0][0],
			nombre: results.rows[0][1],
			email: results.rows[0][2],
			id_rol: results.rows[0][4],
		};
		console.log("user", user);
		console.log("passwordHashed", passwordHashed);
		const cmp = await bcrypt.compare(body.password, passwordHashed);
		console.log("cmp", cmp);
		connection.close();
		if(cmp) {
			return user;
		} else {
			return null;
		}
	} catch (err) {
		if (connection) {
			connection.close();
		}
		console.log("err", err);
		return null;
	}
}

async function crearDireccion(body) {
	let connection = null;
	try {
		const sql = `INSERT INTO DIRECCION (nombre, descripcion, id_usuario) 
		VALUES(:nombre, :descripcion, :id_usuario)`;
		connection = await oracle.getConnection();
		results = await connection.execute(
			sql,
			{
				nombre: body.nombre,
				descripcion: body.descripcion,
				id_usuario: body.id_usuario,
			},
			{ autoCommit: true }
		);
		console.log('results', results);
		if (results && results.rowsAffected) {
			return results.rowsAffected;
		}
		connection.close();
		return null;
	} catch (err) {
		if (connection) {
			connection.close();
		}
		console.log("err", err);
		return null;
	}
}

async function obtenerComprasByCliente(id_usuario) {
	let connection = null;
	try {
		const sql = `SELECT * FROM DIRECCION WHERE id_usuario = :id_usuario`;
		console.log("sql: ", sql);
		connection = await oracle.getConnection();
		results = await connection.execute(
			sql,
			{ id_usuario: id_usuario },
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
    
};
