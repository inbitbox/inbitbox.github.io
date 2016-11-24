//converter.js

/*var ticker = new XMLHttpRequest();


function tick() {
    ticker.open("GET", "http://api.coindesk.com/v1/bpi/currentprice.json", true);
    ticker.send();
    //console.log("Some response " + ticker.responseText);
}
setInterval(tick(), 2000);

$(document).ready(
    $.get("http://api.coindesk.com/v1/bpi/currentprice.json", function(){
        alert('success');
    })
    .done(console.log("Some data: "))
    .error()
    .fail(console.log("Failure!!!: "))    

)*/
setInterval(tick, 2000);

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



// Make the actual CORS request.
function tick() {
  // This is a sample server that supports CORS.
  var url = 'http://api.coindesk.com/v1/bpi/currentprice/USD.json';
  
  var ticker = createCORSRequest('GET', url);
  if (!ticker) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  ticker.onload = function() {
    console.log(JSON.parse(ticker.response).bpi.USD.rate);    
  };

  ticker.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  ticker.send();
}
