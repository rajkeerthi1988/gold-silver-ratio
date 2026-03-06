function calculate(){

let gold = document.getElementById("gold").value
let silver = document.getElementById("silver").value

let ratio = gold / silver

document.getElementById("result").innerHTML =
"Gold-Silver Ratio: " + ratio.toFixed(2)

}


const ctx = document.getElementById("ratioChart")

new Chart(ctx,{

type:"line",

data:{
labels:["Jan","Feb","Mar","Apr","May"],
datasets:[{
label:"Gold Silver Ratio",
data:[78,82,80,85,84]
}]
}

})