require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const recorridosRoutes = require('./routes/recorridos.routes');
const itinerariosRoutes = require('./routes/itinerarios.routes');
const hermandadRoutes = require('./routes/hermandad.routes');
const traccionRoutes = require('./routes/traccion.routes');
const fechaRoutes = require('./routes/fecha.routes');
const horaRoutes = require('./routes/horas.routes');
const jornadaRoutes = require('./routes/jornada.routes');
const toponimoRoutes = require('./routes/toponimos.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const parcelaRoutes = require('./routes/parcela.routes')

const app = express();

app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Protección CSRF solo para rutas sensibles (por ejemplo: login, CRUDs)
const csrfProtection = csrf({ cookie: true });

app.use('/api/auth', authRoutes);
app.use('/api/recorridos', recorridosRoutes);
app.use('/api/itinerarios', itinerariosRoutes); 
app.use('/api/hermandades', hermandadRoutes);
app.use('/api/tracciones', traccionRoutes);
app.use('/api/fechas', fechaRoutes);
app.use('/api/horas', horaRoutes);
app.use('/api/jornadas', jornadaRoutes);
app.use('/api/toponimos', toponimoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/parcelas', parcelaRoutes);

// Ruta para comprobar que el backend funciona
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
