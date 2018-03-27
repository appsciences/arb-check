//import Binance from 'binance-api-node'
const Binance = require('binance-api-node').default

const HitBtc = require('hitbtc-api').default;

const commisionBinance = 0.1/100
const commisionHitBtc = 0.1/100
let rounds = 0

console.log('module.exports = [')


const interval = setInterval(() => {

        const publicHitBtc = new HitBtc({isDemo:false})
        const clientBinance = Binance()

        publicHitBtc.getOrderBook('ETHBTC', {limit:1}).then( (hitBtc) =>

            clientBinance.dailyStats({symbol: 'ETHBTC'}).then( binance => {


                    if(binance.bidPrice * (1-commisionBinance) > hitBtc.asks[0].price * (1+commisionHitBtc)) {
                        console.log(
                            `{HitBtc_bid:${hitBtc.bids[0].price},HitBtc_ask:${hitBtc.asks[0].price},binance_bidPrice:${binance.bidPrice},binance_askPrice:${binance.askPrice}}`
                        )
                        console.error('-- buy binance sell HitBtc')
                        rounds = rounds + 1
                    }
                    else if(hitBtc.bids[0].price * (1-commisionHitBtc) > binance.askPrice * (1+commisionBinance)) {
                        console.log(
                            `{HitBtc_bid:${hitBtc.bids[0].price},HitBtc_ask:${hitBtc.asks[0].price},binance_bidPrice:${binance.bidPrice},binance_askPrice:${binance.askPrice}}`
                        )
                        console.error('-- buy binance sell HitBtc')
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

