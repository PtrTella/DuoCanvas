# 🎨 DuoCanvas - Generatore Grafiche Sportive

Web App progettata per la squadra **Duo Ligones**. Permette di generare rapidamente grafiche social (Risultati, Prossimo Turno, ecc.) direttamente da browser o smartphone, mantenendo uno stile coerente e professionale.

🔗 **Link Live:** [https://PtrTella.github.io/DuoCanvas/](https://PtrTella.github.io/DuoCanvas/)

## ✨ Funzionalità

* **Export PNG Alta Qualità:** Genera immagini pronte per Instagram (1080x1350px).
* **Mobile Experience Nativa:**
    * Interfaccia ottimizzata per smartphone.
    * Menu di modifica a comparsa ("Sheet") stile app.
    * Nessun lag con la tastiera virtuale (logica resize intelligente).
* **Sistema Modulare:** Facile aggiunta di nuovi template senza rompere il codice esistente.
* **Gestione Sponsor:** I loghi sponsor sono applicati automaticamente a tutti i template.
* **Temi Dinamici:** Cambio colore sociale (Arancione, Blu, Verde, Nero) istantaneo.

## 🛠 Tecnologia

* **Core:** React + Vite
* **Styling:** Tailwind CSS (v4)
* **Export:** html-to-image + downloadjs
* **Icons:** Lucide React
* **Hosting:** GitHub Pages

---

## 🚀 Come iniziare (Sviluppo Locale)

Se vuoi modificare il codice o aggiungere template sul tuo computer:

1.  **Clona la repository:**
    ```bash
    git clone [https://github.com/PtrTella/DuoCanvas.git](https://github.com/PtrTella/DuoCanvas.git)
    cd DuoCanvas
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Avvia il server di sviluppo:**
    ```bash
    npm run dev
    ```
    Visita il link mostrato (solitamente `http://localhost:5173/DuoCanvas/`).

---

## 📂 Struttura del Progetto

Il progetto segue un'architettura modulare per facilitare la manutenzione.

```text
DuoCanvas/
├── public/
│   └── logos/           # Immagini statiche (Sponsor, Favicon)
├── src/
│   ├── components/
│   │   ├── editor/      # Componenti dell'interfaccia (Pannello Controlli, Selettore)
│   │   └── UI/          # Componenti grafici base (BaseCard, MobileSheet)
│   ├── data/
│   │   └── templateRegistry.js  # IL CERVELLO: Qui si registrano i nuovi template
│   ├── templates/       # I LAYOUT: Qui vivono i file dei singoli template
│   │   ├── MatchResult.jsx
│   │   └── NextMatch.jsx
│   ├── App.jsx          # Logica principale e gestione stati
│   └── index.css        # Importazione Tailwind
└── vite.config.js       # Configurazione path base per GitHub Pages