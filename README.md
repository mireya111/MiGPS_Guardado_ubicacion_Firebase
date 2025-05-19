# 📍 Elaborado por: Paul Cabrera & Mireya García

# 📍 Ionic GPS App

Una aplicación móvil desarrollada con **Ionic + Capacitor** que obtiene la ubicación actual del usuario y abre **Google Maps** para mostrarla. Ideal para proyectos de geolocalización o como base para apps más complejas con mapas. 🌍📱

---

## 🚀 Características

- 📡 Obtiene la ubicación GPS actual del dispositivo.
- 🗺️ Abre Google Maps con las coordenadas en el navegador o app de mapas.
- 💡 Interfaz sencilla y elegante con Ionic Components.
- ⚙️ Listo para compilar en Android con Capacitor.

---

## 🛠️ Requisitos

- Node.js
- Ionic CLI
- Capacitor
- Android Studio (para compilar en Android)
- Permisos de geolocalización configurados

---

## 📦 Instalación

```bash
npm install
ionic build
npx cap sync android
npx cap open android
