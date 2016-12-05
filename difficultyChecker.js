window.onload=function(){
    console.log('getting difficulty');
    var difficultyChecker = createCORSRequest('GET', 'https://blockexplorer.com/api/status?q=getDifficulty');
    
    difficultyChecker.onload = function() {
        console.log(JSON.parse(difficultyChecker.response).difficulty);
        document.forms.calculatorForm.elements['difficulty'].value=JSON.parse(difficultyChecker.response).difficulty;   
    };
    difficultyChecker.onerror = function() {
        console.log('Woops, there was an error getting the Bitcoin Difficulty.');
    };
    difficultyChecker.send();
}