//converter.js



var price={};
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}


function changePrice(newPrice) {

    console.log('changing price');
    if (newPrice>price.value){
        price.delta=newPrice-price;
        price.value=newPrice;
        price.direction=1;
        document.getElementById('arrow').classList.toggle('up');
        console.log('Going up');

    }else{
        price.delta=newPrice-price;
        price.value=newPrice;
        price.direction=0;
        console.log('Going down');
    }
    document.getElementById('BTC/USD').innerHTML=price.value;


}
// Make the actual CORS request.
function tick() {
  // This is a sample server that supports CORS.
  var url = 'http://api.coindesk.com/v1/bpi/currentprice/USD.json';
  
  var ticker = createCORSRequest('GET', url);
  if (!ticker) {
    console.log('CORS not supported');
    return;
  }

  // Response handlers.
  ticker.onload = function() {
    if(JSON.parse(ticker.response).bpi.USD.rate != price){
        changePrice(JSON.parse(ticker.response).bpi.USD.rate);
    }
    console.log(JSON.parse(ticker.response).bpi.USD.rate);    
  };

  ticker.onerror = function() {
    console.log('Woops, there was an error making the request.');
  };

  ticker.send();
}

setInterval(tick, 2000);