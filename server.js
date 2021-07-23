require('dotenv').config();
const app= require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`El servidor está escuchando sobre el puerto ${PORT}`);
});