//import Binance from 'binance-api-node'
const Binance = require('binance-api-node').default

var Bitstamp = require('bitstamp');

const commisionBinance = 0.1/100
const commisionBitstamp = 0.1/100
let rounds = 0
console.log('module.exports = [')


const interval = setInterval(() => {

        const publicBitstamp = new Bitstamp()
        const clientBinance = Binance()

        publicBitstamp.ticker('ethbtc', (err, bitstamp) =>

            clientBinance.dailyStats({symbol: 'ETHBTC'}).then( binance => {

                    if(binance.bidPrice * (1-commisionBinance) > bitstamp.ask * (1+commisionBitstamp)) {
                        console.log(
                            `{bitstamp_bid:${bitstamp.bid},bitstamp_ask:${bitstamp.ask},binance_bidPrice:${binance.bidPrice},binance_askPrice:${binance.askPrice}}`
                        )
                        console.error('-- buy binance sell bitstamp')
                        rounds = rounds + 1
                    }
                    else if(bitstamp.bid * (1-commisionBitstamp) > binance.askPrice * (1+commisionBinance)) {
                        console.log(
                            `{bitstamp_bid:${bitstamp.bid},bitstamp_ask:${bitstamp.ask},binance_bidPrice:${binance.bidPrice},binance_askPrice:${binance.askPrice}}`
                        )
                        console.error('-- buy binance sell bitstamp')
                        rounds = rounds + 1
                    }

                    if(rounds > 30){
                        console.log(']')
                        clearInterval(interval)
                    }

                }

            )
        )
    },
    1000
);

