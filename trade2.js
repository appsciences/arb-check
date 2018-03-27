let binanceEth = 10
let binanceBtc = 0
let bitstampEth = 0
let bitstampBtc = 0.5
const commisionBinance = 0.1/100
const commisionBitstamp = 0.25/100

let message = ''
let lastTrade = -1

const data = require('./trade-data')

console.log(`Start Total: ${binanceEth*500+binanceBtc*10000+bitstampEth*500+bitstampBtc*10000}`)

data.forEach((quote) => {
// process.stdout.write("-");

    if((quote.binance_bidPrice - quote.bitstamp_ask) > (commisionBitstamp + commisionBinance) && (lastTrade === -1 || lastTrade === 2)) {
        // console.log(
        //     (new Date).toLocaleString() +
        //     `,${quote.bitstamp_bid},${quote.bitstamp_ask},${quote.binance_bidPrice},${quote.binance_askPrice},bn-bs`)

        //Buy BTC on binance
        binanceBtc += (binanceEth * quote.binance_askPrice)*(1-commisionBinance)
        binanceEth = 0
        lastTrade = 1

        message = `Bought Btc on binance. Balances binanceEth:${binanceEth}, binanceBtc:${binanceBtc}`
        console.log(message)

        //sell BTC on bitstamp
        bitstampEth += (bitstampBtc / quote.binance_askPrice)*(1-commisionBitstamp)
        bitstampBtc = 0

        message = `Sold Btc on bitstamp. Balances binstampEth:${bitstampEth}, bitstampBtc:${bitstampBtc}`
        console.log(message)
    }

    else if((quote.bitstamp_bid - quote.binance_askPrice) > (commisionBitstamp + commisionBinance) && (lastTrade === -1 || lastTrade === 1)) {
        // console.log(
        //     (new Date).toLocaleString() +
        //     `,${bitstamp.bid},${bitstamp.ask},${binance.bidPrice},${binance.askPrice},bs-bn`)

        //buy btc on bitstamp
        bitstampBtc += (bitstampEth * quote.bitstamp_ask) * (1-commisionBitstamp)
        bitstampEth = 0

        lastTrade = 2

        message = `Bought Btc on bitstamp. Balances bitstampEth:${bitstampEth}, bitstampBtc:${bitstampBtc}`
        console.log(message)

        //sell btc on binance
        binanceEth += (binanceBtc / quote.binance_askPrice) * (1-commisionBinance)
        binanceBtc = 0

        message = `Sold Btc on bitstamp. Balances binstampEth:${bitstampEth}, bitstampBtc:${bitstampBtc}`
        console.log(message)

    }
    else
        console.log('skip')

})

console.log(`Final balances -- binanceEth:${binanceEth}, binanceBtc:${binanceBtc},  binstampEth:${bitstampEth}, bitstampBtc:${bitstampBtc} `)
console.log(`End Total: ${binanceEth*500+binanceBtc*10000+bitstampEth*500+bitstampBtc*10000}`)