document.addEventListener("DOMContentLoaded", () => {

    /* Global Variables */
    const apiKey = '48d822c4ee1593378de00e53e60d2f64&units=imperial';
    const baseApi = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const temp= document.getElementById('temp');
    const content=document.getElementById('content');
    const date=document.getElementById("date");
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = (d.getMonth() +1)+ '.' + d.getDate() + '.' + d.getFullYear();
    // function of handling the requestes
    function getweather() {
      
        let zipcode = document.getElementById('zip').value;
        let feel = document.getElementById('feelings').value;

        getdata(baseApi, zipcode, apiKey)
            .then(function (data) {
              
                postData('postweatherdata', { temperature:data.main.temp, feel:feel,date:newDate });
            }
            ).then(()=>{
                updateUI();
            });

    }
    // async functions
    let getdata = async (baseapi, zipcode, apikey) => {
        const response = await fetch(baseapi + zipcode + ',us' + '&APPID=' + apikey);
      
        try {
            const newData = await response.json();
            return newData;
        } catch (error) {
     console.log(error);
        }
    }
    let postData = async (url = "", data = {}) => {
    console.log(data);
        let req = await fetch(url, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        try {
            let res = await req.json();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    //get all data from our local server
    const getAllData=async(url="")=>{
const Alldata=await fetch(url);
try {
    let allData=await Alldata.json();
  
    return allData;
} catch (error) {
    console.log(error);
}
    }
//update the ui function 
function updateUI(){
getAllData("/all")
.then((data)=>{
  
    temp.innerHTML = Math.round(data.temperature)+ 'degrees';
    content.innerHTML = data.feel;
    date.innerHTML =data.date;
});
}
    // Event handler
    let generatebtn = document.getElementById('generate');
    generatebtn.addEventListener('click', () => {
        temp.textContent ='';
        content.textContent = '';
        date.textContent ='';
        getweather();
        updateUI();
       
    });
});