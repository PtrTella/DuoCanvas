# 📖 Guida ai Parametri dei Template (Schema Dati)

Questa guida spiega tutti i parametri che possono essere configurati nei template di DuoCanvas. I dati sono divisi tra **Globali** (comuni a tutte le grafiche) e **Specifici** (propri di ogni tipo di template).

---

## 🌍 Dati Globali (Sessione)

Questi parametri sono condivisi tra tutti i template. Se ne cambi uno (es. il logo avversario), rimarrà lo stesso anche cambiando template.

| Chiave | Tipo | Descrizione |
| :--- | :--- | :--- |
| `homeTeam` | String | Nome della squadra di casa |
| `awayTeam` | String | Nome della squadra ospite |
| `homeLogo` | URL/Base64 | Percorso o immagine del logo casa |
| `awayLogo` | URL/Base64 | Percorso o immagine del logo ospite |
| `championship` | String | Nome della competizione (es. "Serie B") |
| `date` | String | Data dell'evento (es. "15 Febbraio") |
| `time` | String | Orario dell'evento (es. "20:30") |
| `arena` | String | Luogo o Palazzetto |
| `arenaAddress` | String | Indirizzo del luogo |

---

## 🏗️ Blocchi e Parametri Specifici

### 1. MatchInfo (Testata superiore)

Utilizzato in quasi tutti i template per il titolo principale.

- `headerTitle`: Testo principale in bianco (es. "GIORNATA")
- `headerValue`: Testo colorato/accentato (es. "15" o "FINALE")

### 2. MatchScore (Punteggio Risultato)

- `homeScore`: Punteggio squadra casa
- `awayScore`: Punteggio squadra ospite

### 3. BasketMatchExtra (Solo Basket Risultato)

- `topScorer`: Testo per l'MVP o miglior marcatore (es. "M. Jordan (32)")
- `labelMvp`: Etichetta personalizzata (default: "MVP / TOP SCORER")

### 4. GoalTimeline (Solo Calcio Risultato)

- `homeGoals`: Testo multi-riga. Formato: `Minuto' Nome` (es. `12' Rossi\n24' Bianchi`)
- `awayGoals`: Testo multi-riga. Stesso formato sopra.
- `labelGoals`: Titolo del blocco (default: "GOL")

### 5. SoccerFormation (Formazione Calcio)

- `module`: Modulo tattico (es. "3-2-1", "2-3-1", etc.)
- `teamFormation`: Lista giocatori. Formato: `Numero Cognome` (un giocatore per riga). I primi 7 sono titolari.
- `mister`: Nome dell'allenatore.

### 6. BasketRoster (Convocazioni Basket)

- `rosterList`: Lista giocatori. Formato: `Numero Cognome`. I primi 5 sono titolari.
- `coach`: Nome dell'allenatore.
- `director`: Nome del Direttore Sportivo.

### 7. TeamsRanking (Classifica)

- `ranking`: Array di oggetti squadra (solitamente gestito via Sync o Parser Manuale).
- `isManual`: Boolean. Se `true`, usa il testo manuale invece della sync.
- `manualText`: Testo grezzo per il parsing manuale (copia-incolla da siti/chat).
- `highlightTeam`: Nome della squadra da evidenziare con il colore del tema.
- `csiGironeId`: ID del girone per la sincronizzazione automatica remota.
- `showStats`: Mostra/nasconde colonne G, V, P, S.
- `showAverages`: Mostra/nasconde colonne medie PF/PS (specifico basket).

---

## 🎨 Come aggiungere un nuovo parametro

1. **Nel Blocco**: Aggiungi il campo in `data.nomeCampo` nel componente `Render` e `Controls`.
2. **Nel Template**: Se il parametro è specifico di un solo template, aggiungilo in `defaultData` dentro `src/templates/SportTemplates.jsx`.
3. **Nel Club**: Se vuoi che un club abbia un valore predefinito diverso, aggiungilo in `defaultData` nel file `src/config/clubs/[nome]/templates.js`.

---

## 🛠️ Note Tecniche per lo Styling

- **Numeri**: Usano sempre il font `Impact` per un look sportivo.
- **Grandi Dimensioni**: Se un testo "rompe" il layout, verifica se puoi usare `truncate` nelle classi Tailwind o riduci il font nel componente specifico del blocco.
