const { Classeviva } = require('classeviva.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const cv = new Classeviva();

    try {
        console.log(`Tentativo di connessione per: ${username}... - server.js:14`);
        await cv.login(username, password);
        
        const grades = await cv.getGrades();
        
        // Pulizia dei voti: prendiamo solo i valori numerici validi
        const votiVeri = grades
            .filter(v => v.decimalValue > 0)
            .map(v => v.decimalValue);

        res.json({
            success: true,
            nome: cv.user.firstName,
            voti: votiVeri
        });
        console.log("✅ Dati inviati con successo al browser! - server.js:29");

    } catch (error) {
        console.error("❌ Errore login: - server.js:32", error.message);
        res.status(401).json({ success: false, message: "Credenziali errate o errore Spaggiari" });
    }
});

app.listen(5500, () => {
    console.log("");
    console.log("🚀 SERVER DIARIO SMART ATTIVO SULLA PORTA 5500 - server.js:39");
    console.log("");
});