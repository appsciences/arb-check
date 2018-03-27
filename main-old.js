const fetch = require('node-fetch');

setInterval(() => {

    fetch('https://api.binance.com/api/v3/ticker/price?symbol=XRPBTC')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            console.log(JSON.parse(myJson).price);
        });

}, 2000)