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



function calculate(block_reward, difficulty, electricity_cost, energy_per_hash, hashrate,cb) {
    console.log("calculating");
    console.log(`electricity_cost: ${electricity_cost} energy_per_hash: ${energy_per_hash}`);
    console.log(`difficulty: ${difficulty} block_reward: ${block_reward}`)
    analysis={
        cost_per_hash:electricity_cost*energy_per_hash,
        get cost_per_hour() { return this.cost_per_hash*hashrate*60*60},
        get cost_per_day()  { return this.cost_per_hour*24}
        get cost_per_week() { return this.cost_per_day*7}
        get cost_per_month(){return this.cost_per_week*4.29}

        
        /* Revenue*/
        get revenue_per_hash() {return (block_reward/((2**32)*difficulty))},
        get revenue_per_hour() {return this.revenue_per_hash*hashrate*60*60},
        get revenue_per_day()  {return this.revenue_per_hour*24},
        get revenue_per_week() {return this.revenue_per_day*7},
        get revenue_per_month(){retun this.revenue_per_week*4.29},

        /*Profit*/
        get profit_per_hash() {return this.revenue_per_hash-this.cost_per_hash},
        get profit_per_hour() {return hashrate*this.profit_per_hash*60*60},
        get profit_per_day()  {return this.profit_per_hour*24},
        get profit_per_week() {return this.profit_per_day*7},
        get profit_per_month(){return this.profit_per_week.4.29}

        /*Financials*/



    }
    if(cb) {cb(null, analysis);} else{return;};                        
}

function display(){
    for (element of document.forms.calculatorForm.elements){
        let elementName=element.id;
        window[elementName]=element.value;
        console.log(`${elementName}:${element.value}`);
    }
    console.log("Refreshing\n");
    calculate(block_reward, difficulty, electricity_cost, energy_per_hash, hashrate, function(err, analysis){
        if (err){console.log(`Error: ${err}\n`)}
        console.log("Analysis" + JSON.stringify(analysis));
        console.log("Cost per hash +1: " +analysis.cost_per_hash_p1);
        for (metric in analysis){
            console.log(`Metric: ${metric} – ${analysis[metric]}`);
            document.forms.screenForm.elements[metric].innerHTML = analysis[metric];
        }
    });
    
    
}
