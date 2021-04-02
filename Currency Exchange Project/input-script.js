
var isFunOne = true;

//ENDpoints and API Key for latest
var latestURL = "http://data.fixer.io/api/latest?access_key=4f8b69ba7fbf96653323a90afd77bde4&base=EUR";
//DECLARE xhrLatest as a new request + xhrConvert
var xhrLatest = new XMLHttpRequest();
var xhrConvert = new XMLHttpRequest();

//open the request
xhrLatest.open("GET", latestURL);
//not sure what the request header does. But we set is gosh dang it.
xhrLatest.setRequestHeader("Accept", "application/json");
//START REQUEST FUNCTION (Checking to see if the request has finished "readystate 4")
xhrLatest.onreadystatechange = function () 
{
   if (xhrLatest.readyState === 4) 
   {
        //console.log('xhrLatest readystate === 4');

        //get two elements for me, the drop down box boys
        const menu1 = document.getElementById('dropDown1');
        const menu2 = document.getElementById('dropDown2');

        //turn our "response" JSON into an object called "selectData"
        var selectData = JSON.parse(xhrLatest.response);

            console.log(selectData.rates);

        // for each selectData.rates property (the names of the currencies) - creating options in the selections
        for (x in selectData.rates)
        {
            const rateName1 = document.createElement('option');
            const rateName2 = document.createElement('option');
            rateName1.setAttribute('value', x);
            rateName1.setAttribute('value', x);
            rateName1.innerHTML = x;
            rateName2.innerHTML = x;
            menu1.appendChild(rateName1);
            menu2.appendChild(rateName2);
        }
    }
};
xhrLatest.send();
//END POPULATE SELECT ELEMENT FUNCTION


//var selectData = xhrLatest.response.rates;
//console.log(`value of USD = ${selectData}`);

        //make client validation for the number inputs, if it's not a number say so, format the number after they put it in. ($1,000,000) < N/A errors? what else can cause an error?
        //https://www.ofx.com/en-us/currency-converter/  << look at that guy
        //https://www.xe.com/currencyconverter/ << him too
        //FLAGS ? maybe there is a better way - https://www.countryflags.io/
        // can you make a search bar in the drop down like that?
            //maybe at this point all i need to do is put in the flags and do some cool guy css, oh and client validation i guess




//Making our big boy onInput function for the text boxes
function inputSide1(){isFunOne = true; textInput();}
function inputSide2(){isFunOne = false; textInput();}
function textInput() 
{

    // get our input elements and parse them into floats
    var num1 = parseFloat(document.getElementById('numInput1').value);
    var num2 = parseFloat(document.getElementById('numInput2').value);

    var curName1 = document.getElementById('dropDown1').value;
    var curName2 = document.getElementById('dropDown2').value;

    xhrConvert.open('GET', latestURL);
    xhrConvert.setRequestHeader("Accept", "application/json");
    xhrConvert.onreadystatechange = function()
    {
        if(xhrConvert.readyState === 4)
        {
            var convertData = JSON.parse(xhrConvert.response);
            var numInputBox1 = document.getElementById('numInput1');
            var numInputBox2 = document.getElementById('numInput2');
            var answerForTwo = convertData.rates[curName2] / convertData.rates[curName1] * num1;
            var answerForOne = convertData.rates[curName1] / convertData.rates[curName2] * num2;
            
            if (isFunOne){
                numInputBox2.value = answerForTwo.toFixed(2);}
            if (!isFunOne){
                numInputBox1.value = answerForOne.toFixed(2);}
        }
    }
    xhrConvert.send();
}
//END TEXTINPUT FUNCTION

//TEST BUTTON
function testFunction(){
    console.log("TEST!!!");
    //document.getElementById('testDropDown').classList.toggle('show');
    console.log(document.getElementById('testDropDown').classList)
}

//JSON stuff
// we are going to need two tags for the countries, currency tags, and flag tags.
// we are going to need the pictures as well.
// https://en.wikipedia.org/wiki/List_of_circulating_currencies

var flagJSON = $.getJSON("flag-object.json",
    function (flagData) {
        console.log(flagData.USD.Name);
        console.log(flagData.EUR.PNG);
        console.log(flagData.ALL.Name);
        
    }
)
