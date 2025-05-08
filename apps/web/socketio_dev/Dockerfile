# Gebruik een officiële Node.js-image
FROM node:22

# Stel de werkdirectory in de container in
WORKDIR /usr/src/app

# Kopieer package.json en package-lock.json (indien aanwezig) naar de container
COPY package*.json ./

# Installeer de projectafhankelijkheden
RUN npm install

# Kopieer de rest van de applicatiebestanden naar de container
COPY . .

# Expose de poort waarop de app draait
EXPOSE 3000

# Start de app
CMD ["node", "index.js"]