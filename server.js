const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// ⚙️ Configuration OpenWeatherMap
const apiKey = process.env.OPENWEATHERMAP_KEY; // stocke ta clé dans les variables d'environnement Azure
const city = "Rabat";

// Sert les fichiers statiques (ton index.html, CSS, JS)
app.use(express.static(__dirname));

// API REST pour récupérer la météo
app.get("/api/weather", async (req, res) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();

    // On renvoie uniquement les infos utiles
    const result = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      updated_at: new Date().toISOString()
    };

    res.json(result);
  } catch (error) {
    console.error("Erreur API météo:", error);
    res.status(500).json({ error: "Impossible de récupérer la météo" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Backend météo en ligne sur port ${port}`);
});
