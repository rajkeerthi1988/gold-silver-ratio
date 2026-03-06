async function getPrices(){

try{

let goldResponse = await fetch("https://api.gold-api.com/price/XAU")
let goldData = await goldResponse.json()

let silverResponse = await fetch("https://api.gold-api.com/price/XAG")
let silverData = await silverResponse.json()

let gold = goldData.price
let silver = silverData.price

document.getElementById("gold").innerHTML = "$" + gold
document.getElementById("silver").innerHTML = "$" + silver

let ratio = gold / silver

document.getElementById("ratio").innerHTML = ratio.toFixed(2)

let signal = ""

if(ratio > 80){
signal = "Silver may be undervalued"
}
else if(ratio < 50){
signal = "Gold may be undervalued"
}
else{
signal = "Ratio in normal range"
}

document.getElementById("signal").innerHTML = signal

}catch(error){

console.log("Price fetch failed")

}

}

getPrices()

setInterval(getPrices,60000)