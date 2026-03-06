async function getPrices(){

let goldResponse = await fetch("https://api.gold-api.com/price/XAU")
let goldData = await goldResponse.json()

let silverResponse = await fetch("https://api.gold-api.com/price/XAG")
let silverData = await silverResponse.json()

let gold = goldData.price
let silver = silverData.price

document.getElementById("gold").innerHTML = "$" + gold
document.getElementById("silver").innerHTML = "$" + silver

let ratio = gold / silver

document.getElementById("ratio").innerHTML =
ratio.toFixed(2)

}

getPrices()