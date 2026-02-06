# 📋 Guida ai Parametri di Configurazione

Questa guida elenca tutti i parametri (`chiavi`) utilizzabili per personalizzare i dati e il comportamento dei template.

Questi parametri possono essere definiti a tre livelli, in ordine di priorità crescente:

1. **Globale** (`GLOBAL_DEFAULTS` in `branding.js`): Impostazioni valide per tutto il club.
2. **Sport** (`SPORT_DEFAULTS` in `config.js` del club): Impostazioni per tutti i template di uno sport.
3. **Template** (`defaultData` o proprietà dirette in `templates.js`): Sovrascrittura specifica per il singolo template.

---

## 🏗️ 1. Identità e Squadre (Branding & Teams)

Questi parametri definiscono i protagonisti della grafica.

| Parametro | Descrizione | Valore Esempio |
| :--- | :--- | :--- |
| `homeTeam` | Nome della squadra in casa | `"Duo Ligones"` |
| `homeLogo` | URL o path del logo squadra casa | `"/clubs/duo/logos/main.png"` |
| `awayTeam` | Nome della squadra ospite | `"La Volta"` |
| `awayLogo` | URL o path del logo squadra ospite | `"/logos/opponents/volta.png"` |

---

## 🏠 2. Informazioni Match (MatchInfo / Details)

Gestiti dai blocchi `MatchInfo` e `MatchDetails`.

| Parametro | Descrizione | Fallback |
| :--- | :--- | :--- |
| `headerTitle` | Titolo principale (es. "MATCH DAY") | `"TITLE"` |
| `headerValue` | Sottotitolo/Fase (es. "FINALE") | `""` |
| `championship`| Nome del torneo/campionato | `""` |
| `date` | Data della partita | `""` |
| `time` | Orario di inizio | `""` |
| `building` | Nome dell'impianto | `""` |
| `address` | Indirizzo dell'impianto | `""` |
| `labelDate` | Etichetta campo Data | `"Data"` |
| `labelTime` | Etichetta campo Ora | `"Ora"` |
| `labelBuilding` | Etichetta campo Impianto | `"Impianto"` |
| `labelAddress` | Etichetta campo Indirizzo | `"Indirizzo"` |

---

## 🏀 3. Parametri Basket

Specifici per il `BasketResult` e `BasketLineup`.

| Parametro | Descrizione | Fallback |
| :--- | :--- | :--- |
| `homeScore` | Punteggio finale casa | `"0"` |
| `awayScore` | Punteggio finale trasferta | `"0"` |
| `topScorer` | MVP / Top Scorer (es. "Rossi 24") | `""` |
| `rosterList` | Elenco giocatori (`Numero Nome` x riga) | `""` |
| `labelMvp` | Etichetta per MVP | `"MVP / Top Scorer"` |
| `labelCoach` | Etichetta Allenatore | `"Allenatore"` |
| `labelBench` | Etichetta Panchina | `"Panchina"` |

---

## ⚽ 4. Parametri Calcio

Specifici per il `SoccerResult` e `SoccerFormation`.

| Parametro | Descrizione | Fallback |
| :--- | :--- | :--- |
| `homeScore` | Gol squadra casa | `"0"` |
| `awayScore` | Gol squadra ospite | `"0"` |
| `homeGoals` | Marcatori Casa (`Minuto' Nome` x riga) | `""` |
| `awayGoals` | Marcatori Ospiti (`Minuto' Nome` x riga) | `""` |
| `teamFormation`| Elenco convocati (`Numero Nome` x riga) | `""` |
| `module` | Modulo tattico (es. "3-2-1") | `"3-2-1"` |
| `mister` | Nome dell'allenatore | `"---"` |
| `labelGoals` | Etichetta per la sezione Gol | `"Gol"` |
| `labelMister` | Etichetta Allenatore | `"Allenatore"` |
| `labelBench` | Etichetta Panchina | `"Panchina"` |

---

## 📊 5. Classifica (Ranking)

Parametri per il controllo della tabella classifica.

| Parametro | Descrizione | Note |
| :--- | :--- | :--- |
| `ranking` | Array di dati o Testo Formattato | Manuale o via Sync |
| `highlightTeam`| Nome squadra da evidenziare | Colore accentato riga |
| `rankingSync` | Hook di sincronizzazione | Es. `useCsiRanking` |
| `season` | Testo stagione (es. "2024/25") | Piedini tabella |
| `columnsString` | Legenda colonne (es. "V-Vinte...") | Piedini tabella |
| `showDraws` | Mostra colonna Pareggi (P/D) | `Boolean` (Template Level) |
| `showAverages` | Mostra colonna Medie (PF/PS) | `Boolean` (Template Level) |
| `showStats` | Mostra statistiche (V/P/S) | `Boolean` (Data Level) |
| `labelPoints` | Etichetta colonna Punti | `"PT"` |
| `labelPlayed` | Etichetta colonna Giocate | `"G"` |
| `labelWon` | Etichetta colonna Vinte | `"V"` |
| `labelDrawn` | Etichetta colonna Pareggiate | `"P"` |
| `labelLost` | Etichetta colonna Perse | `"S"` |
| `labelScored` | Etichetta colonna Fatti/Segnati | `"GF" / "PF"` |
| `labelConceded`| Etichetta colonna Subiti | `"GS" / "PS"` |

---

## 📅 6. Recap Settimana (WeekRecap)

| Parametro | Descrizione |
| :--- | :--- |
| `weekEvents` | Array di oggetti evento |

### Struttura Evento

- `sport`: Nome sport (es. "Basket")
- `date`: Testo data (es. "SAB 15 FEB")
- `time`: Orario (es. "20:30")
- `homeTeam`: Nome squadra casa
- `awayTeam`: Nome squadra ospite
- `location`: Campo/Impianto
- `championship`: Torneo/Campionato
- `color`: ID Tema personalizzato (opzionale)

---

## ⚙️ 7. Configurazioni Speciali (Top-Level)

Queste non vanno in `defaultData` ma sono proprietà dell'oggetto template:

- `id`: Identificativo unico (es. `result_basket`).
- `name`: Nome visualizzato nel selettore.
- `icon`: Componente Lucide Icon.
- `defaultTheme`: Colore tema iniziale (es. `orange`, `blue`).
