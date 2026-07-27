const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// The file currently has:
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <section class="hero" aria-labelledby="hero-titulo">

// Let's replace the top part until <section class="hero"
const topPart = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Club Tolosano | Inicio</title>
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>

  <!-- ==================== HEADER ==================== -->
  <header class="header" id="top">
    <div class="container header__container">
      <div class="header__marca">
        <img class="header__logo" src="assets/logo-tolosano.png" alt="Escudo del Club Tolosano">
        <span class="header__nombre">TOLOSANO</span>
      </div>

      <nav class="header__nav nav" aria-label="Navegación principal">
        <ul class="nav__lista">
          <li class="nav__item"><a class="nav__link nav__link--activo" href="#inicio">Inicio</a></li>
          <li class="nav__item"><a class="nav__link" href="#noticias">Noticias</a></li>
          <li class="nav__item"><a class="nav__link" href="#deportes">Deportes</a></li>
          <li class="nav__item"><a class="nav__link" href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main" id="inicio">

    <!-- ==================== HERO ==================== -->
`;

html = html.replace(/<head>[\s\S]*?<section class="hero"/i, topPart + '    <section class="hero"');

// Wait, the first line is currently:
// <!DOCTYPE html>
// <html lang="es">
// Let's just do a clean replace from start to <section class="hero"
html = html.replace(/^[\s\S]*?<section class="hero"/i, topPart + '    <section class="hero"');

fs.writeFileSync(indexHtmlPath, html, 'utf8');

console.log('Fixed index.html');
