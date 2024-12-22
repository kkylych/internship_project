require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const resetDatabase = require('./db'); // Импорт функции сброса базы данных
const path = require('path');

// Инициализация Express приложения
const app = express();
const port = process.env.PORT || 3000;

// Миддлвары
app.use(bodyParser.json());

// Импорт маршрутов
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Подключение маршрутов
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Подключение статических файлов
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Создаём HTTP сервер с использованием Express
const server = http.createServer(app);

// Сброс базы данных перед запуском сервера
resetDatabase().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Failed to reset the database:', error);
  process.exit(1);
});
