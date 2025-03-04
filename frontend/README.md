# Get started

## Requirements

- [Node.js](https://nodejs.org/en/) >= v20.10.0 (LTS)
- [NPM](https://www.npmjs.com/) >= v10.2.3 (Should be installed with Node.js, check with `npm -v` if you have it installed before installing it again) 

## clone the repo

```bash
git clone https://github.com/CESI-GRP-4/ressources_relationnelles.git
```

## Go to the frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Usage

Start the development server
```bash
npm run dev
```
Access the frontend at:
```bash
 http://localhost:3000
```
## Build

```bash
npm run build
npm run start
```
Access the frontend at:
```bash
 http://localhost:3000
```



# Create docker image


## Create Dockerfile

```Dockerfile
# Étape 1 : Construire l'application Next.js
FROM node:18.17.0 AS build

# Définir le répertoire de travail
WORKDIR /frontend

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Compiler l'application Next.js
RUN npm run build

# Étape 2 : Démarrer le serveur Next.js
FROM node:18.17.0

# Définir le répertoire de travail
WORKDIR /frontend

# Copier les fichiers de build et les dépendances installées
COPY --from=build /frontend/.next /frontend/.next
COPY --from=build /frontend/node_modules /frontend/node_modules
COPY --from=build /frontend/package.json /frontend/package.json

# Exposer le port utilisé par Next.js
EXPOSE 3000

# Définir les variables d'environnement pour Next.js
ENV PORT 3000
ENV HOST 0.0.0.0

# Démarrer le serveur Next.js
CMD ["npx", "next", "start", "--port", "3000", "--hostname", "0.0.0.0"]
```


## Build Image

```shell
docker build -t nextjs -f Dockerfile .
```

## Création conteneur

```shell
docker run -it -p 3000:3000 --name ressource_relationnelles nextjs
```