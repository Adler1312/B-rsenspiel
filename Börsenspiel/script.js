let portfolio = {
    startkapital: 10000,
    barvermoegen: 10000,
    aktien: {}
};

const aktien = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
    { symbol: 'FB', name: 'Facebook, Inc.' },
    { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc.' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
    { symbol: 'WMT', name: 'Walmart Inc.' },
    { symbol: 'PG', name: 'Procter & Gamble Company' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'MA', name: 'Mastercard Incorporated' },
    { symbol: 'DIS', name: 'The Walt Disney Company' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'HD', name: 'The Home Depot, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'BA', name: 'The Boeing Company' },
    { symbol: 'VZ', name: 'Verizon Communications Inc.' },
    { symbol: 'INTC', name: 'Intel Corporation' },
    { symbol: 'PFE', name: 'Pfizer Inc.' },
    { symbol: 'CSCO', name: 'Cisco Systems, Inc.' },
    { symbol: 'KO', name: 'The Coca-Cola Company' },
    { symbol: 'PEP', name: 'PepsiCo, Inc.' },
    { symbol: 'ORCL', name: 'Oracle Corporation' }
];


window.onload = () => {
    ladePortfolio();
    initialisiereSpiel();
    testApi();
    initialiseDropdown();
};

function initialisiereSpiel() {
    let gespeichertesKapital = portfolio.startkapital;
    document.getElementById('startkapital').value = gespeichertesKapital;
    portfolio.barvermoegen = gespeichertesKapital;
    aktualisiereUI();
}

function initialiseDropdown() {
    const aktienAuswahl = document.getElementById('aktienAuswahl');
    aktien.forEach(aktie => {
        let option = new Option(aktie.name, aktie.symbol);
        aktienAuswahl.appendChild(option);
    });
}

const apiKey = 'RJQ0ZYJYKCSKYZRB'; 

async function ladeAktienPreis(aktienSymbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${aktienSymbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data['Time Series (Daily)']) {
            let lastRefreshed = data['Meta Data']['3. Last Refreshed'];
            let latestData = data['Time Series (Daily)'][lastRefreshed];
            return parseFloat(latestData['4. close']);
        } else {
            throw new Error('Keine Daten für das angegebene Symbol gefunden.');
        }
    } catch (error) {
        console.error('Fehler beim Laden der Aktienpreise:', error);
        return null;
    }
}

async function kaufen() {
    let aktienName = document.getElementById('aktienAuswahl').value;
    let anzahl = parseInt(document.getElementById('aktienAnzahl').value);
    let aktienPreis = await ladeAktienPreis(aktienName);

    if (aktienPreis && portfolio.barvermoegen >= aktienPreis * anzahl) {
        portfolio.barvermoegen -= aktienPreis * anzahl;
        if (!portfolio.aktien[aktienName]) {
            portfolio.aktien[aktienName] = 0;
        }
        portfolio.aktien[aktienName] += anzahl;
        protokolliereTransaktion(aktienName, anzahl, aktienPreis, 'kaufen');
        aktualisiereUI();
        speicherePortfolio();
    } else {
        alert('Nicht genug Geld für diesen Kauf oder Preis nicht verfügbar!');
    }
}

async function verkaufen() {
    let aktienName = document.getElementById('aktienAuswahl').value;
    let anzahl = parseInt(document.getElementById('aktienAnzahl').value);
    let aktienPreis = await ladeAktienPreis(aktienName);

    if (aktienPreis && portfolio.aktien[aktienName] && portfolio.aktien[aktienName] >= anzahl) {
        portfolio.aktien[aktienName] -= anzahl;
        portfolio.barvermoegen += aktienPreis * anzahl;
        protokolliereTransaktion(aktienName, anzahl, aktienPreis, 'verkaufen');
        aktualisiereUI();
        speicherePortfolio();
    } else {
        alert('Nicht genug Aktien zum Verkaufen oder Preis nicht verfügbar!');
    }
}

function protokolliereTransaktion(aktienName, anzahl, preis, aktion) {
    let jetzt = new Date();
    let zeitstempel = jetzt.toLocaleString();
    let logEintrag = document.createElement('li');
    logEintrag.textContent = `${zeitstempel} - Aktion: ${aktion}, Aktie: ${aktienName}, Anzahl: ${anzahl}, Preis: ${preis.toFixed(2)}, Barvermögen: ${portfolio.barvermoegen.toFixed(2)}`;
    document.getElementById('transaktionen').appendChild(logEintrag);
}

function aktualisiereUI() {
    document.getElementById('barvermoegen').textContent = portfolio.barvermoegen.toFixed(2);
    // Hier können Sie weitere UI-Aktualisierungen hinzufügen, z.B. für die Portfolio-Tabelle
}

function initialiseDropdown() {
    const aktienAuswahl = document.getElementById('aktienAuswahl');
    const aktien = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
    { symbol: 'FB', name: 'Facebook, Inc.' },
    { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc.' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
    { symbol: 'WMT', name: 'Walmart Inc.' },
    { symbol: 'PG', name: 'Procter & Gamble Company' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'MA', name: 'Mastercard Incorporated' },
    { symbol: 'DIS', name: 'The Walt Disney Company' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'HD', name: 'The Home Depot, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'BA', name: 'The Boeing Company' },
    { symbol: 'VZ', name: 'Verizon Communications Inc.' },
    { symbol: 'INTC', name: 'Intel Corporation' },
    { symbol: 'PFE', name: 'Pfizer Inc.' },
    { symbol: 'CSCO', name: 'Cisco Systems, Inc.' },
    { symbol: 'KO', name: 'The Coca-Cola Company' },
    { symbol: 'PEP', name: 'PepsiCo, Inc.' },
    { symbol: 'ORCL', name: 'Oracle Corporation' }
    ];

    aktien.forEach(aktie => {
        let option = new Option(aktie.name, aktie.symbol);
        aktienAuswahl.appendChild(option);
    });
}

function speicherePortfolio() {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

function ladePortfolio() {
    let gespeichertesPortfolio = localStorage.getItem('portfolio');
    if (gespeichertesPortfolio) {
        portfolio = JSON.parse(gespeichertesPortfolio);
    }
}


async function testApi() {
    const symbol = 'IBM'; // Ein Beispiel-Aktiensymbol
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            console.log('API-Schlüssel ist gültig. Antwort:', data);
        } else {
            throw new Error(`Problem bei der API-Anfrage. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Fehler beim Testen des API-Schlüssels:', error);
    }
}
