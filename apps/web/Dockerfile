# Stap 1: Kies een basisafbeelding met Node.js
FROM node:22

# Stap 2: Stel de werkmap in binnen de container
WORKDIR /usr/src/app

# Stap 3: Kopieer het package.json bestand en installeer de dependencies
COPY package*.json ./
RUN npm install

# Stap 4: Kopieer de rest van de applicatie
COPY . .

# Stap 5: Exposeer de poort waarop de React-app draait
EXPOSE 4000

# Stap 6: Start de React-app in development mode
CMD ["npm", "start"]
