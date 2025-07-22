const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Backend escuchando en http://localhost:${config.port}`);
});
