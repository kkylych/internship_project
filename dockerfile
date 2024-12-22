# Базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Команда запуска приложения
CMD ["node", "index.js"]
