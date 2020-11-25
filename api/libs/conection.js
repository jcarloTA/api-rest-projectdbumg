const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OBJECT;

// hr schema password
var password = '1234' 
// checkConnection asycn function
async function getConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "system",
        password: password,
        // connectString: "localhost:1521"
    });
    console.log('connected to database');
    return connection;
} catch (err) {
    console.log('err conection',err);
    console.error(err.message);
    return null;
}

//    finally {
//     if (connection) {
//       try {
//         // Always close connections
//         await connection.close(); 
//         console.log('close connection success');
//       } catch (err) {
//         console.error(err.message);
//       }
//     }
//   }
}

module.exports = {
    getConnection
}