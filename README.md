# Movie List App

**Este archivo en princiopio es un registro del desarrollo de la app.**
---

## Inciando el proyecto

* Teniendo el ambiente de desorrollo listo comenzamos con iniciar el controlador de versiones y que es un proyecto de node. Con los siguientes dos comandos.

        git init
        npm init -y

* sincronizamos el proyecto con un repositorio de github

        git add .
        git commit -m "npm init"
        git branch -M main
        git remote add origin http://github.com/ltrzalez-lits.git
        git push --set-upstream origin main

* Agremamos esta archivo .md para tener un registro del desarrollo y pusheamos el proyecto. Asi queda todo re monono

## Instalacion de depencias

Agremamos webpack y los comandos start y build en el archivo package.json 

    npm install --save-dev webpack webpack-cli

    "start": "webpack --mode development",
    "build": "webpack --mode production"

Creamos el archivo index.js(el punto incial de la app mas adelante por ahora solo tendra un console.log("")) en un nuevo directorio "/src" y depaso .gitignore para node_modules.

    npm start

Con este comando webpack nos crea el directorio /dist con el archivo main.js, la version "empaquetada" de nuestra app

Agregamos react y react-dom que son la escencia de React.

    npm install react react-dom

Agregamos babel para que la app corra bien en distintos navegadores

    npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

Y para que estas depencias funcionen correctamente todas juntas creamos el archivo webpack.config.js en el directorio root del proyecto. 

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'"babel-loader',
                },
            },
        ],
    },
}
```

Een este archivo le decimos que use babel-loader para todos los archivos .js del proyecto y que excluya node_modules. 
Crearemos el .babelrc para configurar babel-loader con los siguiente

```javascript
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ],
        "@babel/react"
    ]
}
```
Podria declararse la config de babel en webpack pero lo hacemos en archivos separados para "mantenerlo limpio"

## Implementando React

creemos nuestro primer componente en el archivo index y declaramos que renderize la app en elemento html con id "root"
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return <h1>Titulo del componente</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```
Creamos el documento index.html en /src para encontrar el elemento con id "root"

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initialscale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>movieList</title>
</head>
<body>
    <section id="root"></section>
</body>
</html>
```

Para que esto funcione correctamente agregamos webpack para html

    npm install --save-dev html-webpack-plugin

y editamos webpack.config.js

```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
})

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: '"babel-loader',
                },
            },
        ],
    },
    plugins: [htmlPlugin]
}
```

Ahora podemos correr npm start y ver nuestra app funcionando

![App Funcioando](readmeSrc\01app-funcionando.jpg)

## Server de desarrollo

Para hacer mas dinamico el desarrollo de la app utilizaremos un dev-server de webpack