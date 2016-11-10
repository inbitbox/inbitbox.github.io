var profit_per_hash;
var revenue;
var cost;
var hashrate; //In hashes per second
var power_consumption;
var energy_per_hash;
var electricity_cost;
var difficulty;
var block_reward;
var cost_per_hash;
var profit_per_hour;
let rent;
let exchangeRate;
let analysis={};



function calculate(cb) {
    console.log("calculating");
    analysis={
        cost_per_hash:electricity_cost*energy_per_hash,
        profit_per_hash:(block_reward/(2^32*difficulty))-cost_per_hash,
        profit_per_hour:hashrate*this.profit_per_hash*60*60,
        profit_per_day:this.profit_per_hour*24,
        profit_per_week:this.profit_per_day*7,
        profit_per_month:this.profit_per_day*30.5,
    }
    if(cb) {cb(null, analysis);} else{return;};                        
}

function display(){
    for (element of document.forms.calculatorForm.elements){
        let elementName=element.id;
        window[elementName]=element.value;
    }

    console.log("Refreshing\n");
    calculate(function(err, analysis){
        if (err){console.log(`Error: ${err}\n`)}

        for (metric in analysis){
            console.log(`Metric: ${metric} – ${analysis[metric]}`);
            document.forms.screenForm.elements[metric].innerHTML = analysis[metric];
        }
    });
    
    
}
