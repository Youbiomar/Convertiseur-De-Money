const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Autorise le frontend à parler au backend
app.use(express.json());

// REMPLACE PAR TA CLÉ (Inscris-toi sur https://www.exchangerate-api.com/ pour en avoir une gratuite)
const API_KEY = 'cc3dfab7044db1a8bacdd3fa'; 

// Route pour obtenir la liste des devises au chargement
app.get('/devises', async (req, res) => {
    try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;
        const response = await axios.get(url);
        res.json(response.data.supported_codes);
    } catch (error) {
        res.status(500).json({ erreur: "Impossible de charger les devises" });
    }
});

// Route pour effectuer la conversion
app.get('/convertir', async (req, res) => {
    const { de, vers, montant } = req.query;
    try {
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${de}/${vers}/${montant}`;
        const response = await axios.get(url);
        res.json({ resultat: response.data.conversion_result });
    } catch (error) {
        res.status(500).json({ erreur: "Erreur de conversion" });
    }
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});