//import Binance from 'binance-api-node'
const Binance = require('binance-api-node').default

var Bitstamp = require('bitstamp');

console.log('Bitstamp-Bid,Bitstamp-Ask,Binance-bid,Binance-ask')


const allData = () =>
    setInterval(() => {

            const publicBitstamp = new Bitstamp();
            const clientBinance = Binance()

            publicBitstamp.ticker('xrpbtc', (err, resp1) =>

                clientBinance.dailyStats({symbol: 'XRPBTC'}).then( resp2 =>
                    console.log(`${resp1.bid},${resp1.ask},${resp2.bidPrice},${resp2.askPrice}`)
                )
            )
        },
        1000
    );

const goodData = () =>
    setInterval(() => {

            // process.stdout.write("-");

            const publicBitstamp = new Bitstamp();
            const clientBinance = Binance()

            publicBitstamp.ticker('ethbtc', (err, bitstamp) =>

                clientBinance.dailyStats({symbol: 'ETHBTC'}).then( binance => {

                        if((binance.bidPrice - bitstamp.ask) > 0)
                            console.log(
                                (new Date).toLocaleString() +
                                `,${bitstamp.bid},${bitstamp.ask},${binance.bidPrice},${binance.askPrice},bn-bs`)
                        else if((bitstamp.bid - binance.askPrice) > 0) {
                            console.log(
                                (new Date).toLocaleString() +
                                `,${bitstamp.bid},${bitstamp.ask},${binance.bidPrice},${binance.askPrice},bs-bn`)

                            console.error('-------------Fuck Yeah-----------')
                        }

                    }
                )
            )
        },
        1000
    );


},
1000
);

goodData()