let playName = "Mario";
let currentLive = 3;
const coinLevel = {
    "level 1": 25,
    "level 2": 30,
    "level 3": 45,   
}

const sumCoin = (coinLevel) => {
    let totalCoin = 0;
    for (let level in coinLevel){
        totalCoin += coinLevel[level];
    }
    return totalCoin;
}

const averageCoin = sumCoin(coinLevel)/Object.keys(coinLevel).length;
const remainingCoinAfterDevice = sumCoin(coinLevel)%Object.keys(coinLevel).length;

console.log("Total coin of all levels is " + sumCoin(coinLevel));
console.log(`Average coin: ${averageCoin.toFixed(2)}`);
console.log(`Remaining coin after devide is ${remainingCoinAfterDevice}`);

//coin level
