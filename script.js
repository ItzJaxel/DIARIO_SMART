async function loginClasseViva() {
    const user = prompt("Codice Utente ClasseViva (es. S1234567X):");
    const pass = prompt("Password:");

    if (!user || !pass) {
        alert("Inserimento annullato o dati mancanti.");
        return;
    }

    const btn = document.querySelector('.btn-cv');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sincronizzazione...';
    btn.style.opacity = "0.7";
    btn.disabled = true;

    try {
        // --- MODIFICA QUI ---
        // Sostituiamo localhost con l'indirizzo del tuo server su Render
        const response = await fetch('https://diario-smart.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: user, 
                password: pass 
            })
        });

        const data = await response.json();

        if (data.success) {
            db.user = data.nome;
            db.voti = data.voti; 
            
            save();
            render();
            
            alert(`✅ Sincronizzazione riuscita! Ciao ${data.nome}.`);
        } else {
            alert("❌ Errore: " + data.message);
        }
    } catch (error) {
        console.error("Errore di connessione: - script.js:44", error);
        alert("⚠️ Impossibile connettersi al server su Render.\n\nAssicurati che il Web Service su Render sia attivo (Status: Live).");
    } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = "1";
        btn.disabled = false;
    }
}