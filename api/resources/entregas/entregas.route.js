const express = require("express");

entregaModel = require("./entregas.model");

entregasRoute = express.Router();

entregasRoute.post("/", async (req, res) => {
	try {
		console.log("body", req.body);
		if (
			!req.body.id_cliente ||
			!req.body.id_compra ||
			!req.body.calificacion ||
			!req.body.comentarios
		) {
			res
				.status(400)
				.send(
					"Los campos id_cliente, id_compra, calificacion, comentarios  y podructos es necesario"
				);
			return;
		}
		const response = await entregaModel.crearEncuesta(req.body);
		if (response) {
			res.status(200).json({ success: true });
		} else {
			res.status(500).json({ success: false });
		}
	} catch (err) {
		console.log("err", err);
		res.status(500).send("Error al crear encuesta");
	}
});

module.exports = entregasRoute;
