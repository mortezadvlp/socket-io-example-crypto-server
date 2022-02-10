const http = require('http');
const {Server} = require('socket.io');

const handeler = (req, res) => {
    res.write('Hello World!');
    res.end();
}

const server = http.createServer(handeler);

server.listen(3001);
console.log('Server started at', server.address().port);

const io = new Server(server, {
    cors: {
        origin: true
    }
})

//Initialize coins data
var coins = [
    {
        title: 'Bitcoin',
        currentValue: '42832.75',
        changeRate: '+2.37', //%
        changeStatus: '+'
    },
    {
        title: 'Ethereum',
        currentValue: '3065.64',
        changeRate: '-2.43', //%
        changeStatus: '-'
    },
    {
        title: 'Binance Coin',
        currentValue: '411.8',
        changeRate: '-5.03', //%
        changeStatus: '-'
    },
    {
        title: 'Cardano',
        currentValue: '1.150',
        changeRate: '+0.17', //%
        changeStatus: '+'
    },
    {
        title: 'Solana',
        currentValue: '111.71',
        changeRate: '-5.00', //%
        changeStatus: '-'
    }
];

io.on('connection', (socket) => {
    console.log('User Connected.');

    var disconnect = false; //For controling timer

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        disconnect = true;
    })

    //Setup timer
    const sendTimer = () => {
        setTimeout(() => {
            const btc = Math.round(Math.random() * 1000 * 100)/100 - 500
            const btcOld = Number(coins[0].currentValue)
            coins[0].currentValue = (btcOld + btc).toFixed(2)
            coins[0].changeRate = (btc >= 0 ? '+' : '') + (Math.round(10000 * btc/btcOld)/100).toFixed(2)
            coins[0].changeStatus = (btc >= 0 ? '+' : '-')

            const eth = Math.round(Math.random() * 100 * 100)/100 - 50
            const ethOld = Number(coins[1].currentValue)
            coins[1].currentValue = (ethOld + eth).toFixed(2)
            coins[1].changeRate = (eth >= 0 ? '+' : '') + (Math.round(10000 * eth/ethOld)/100).toFixed(2)
            coins[1].changeStatus = (eth >= 0 ? '+' : '-')

            const bic = Math.round(Math.random() * 10 * 100)/100 - 5
            const bicOld = Number(coins[2].currentValue)
            coins[2].currentValue = (bicOld + bic).toFixed(2)
            coins[2].changeRate = (bic >= 0 ? '+' : '') + (Math.round(10000 * bic/bicOld)/100).toFixed(2)
            coins[2].changeStatus = (bic >= 0 ? '+' : '-')

            const car = Math.round(Math.random() * 0.1 * 100)/100 - 0.05
            const carOld = Number(coins[3].currentValue)
            coins[3].currentValue = (carOld + car).toFixed(2)
            coins[3].changeRate = (car >= 0 ? '+' : '') + (Math.round(10000 * car/carOld)/100).toFixed(2)
            coins[3].changeStatus = (car >= 0 ? '+' : '-')

            const sol = Math.round(Math.random() * 10 * 100)/100 - 5
            const solOld = Number(coins[4].currentValue)
            coins[4].currentValue = (solOld + sol).toFixed(2)
            coins[4].changeRate = (sol >= 0 ? '+' : '') + (Math.round(10000 * sol/solOld)/100).toFixed(2)
            coins[4].changeStatus = (sol >= 0 ? '+' : '-')

            socket.emit('updateCoins', {
                coins
            });
            if(!disconnect)
                {sendTimer();}
        }, 3000);
    }

    sendTimer();

})

