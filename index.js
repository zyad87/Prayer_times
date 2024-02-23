
let citys =[
    {
        arname:"مكه المكرمه",
        eneme: "Makkah al Mukarramah"
    },
    {
        arname:"الرياض",
        eneme: "Ar Riyāḑ"
    },
    {
        arname:"الشرقية",
        eneme: "Ash Sharqīyah"
    }, 
    {
        arname:"المدينة المنورة",
        eneme: "Al Madīnah al Munawwarah"
    }
]

for(let cityloop of citys){


    const comtant = `
    <option>${cityloop.arname}</option>

    `
    document.getElementById("select_cited").innerHTML += comtant
}

document.getElementById("select_cited").addEventListener("change", function (){
    document.getElementById("name_city").innerHTML = this.value
    let cityname = ''
    for(let cityx of citys){
        if(cityx.arname == this.value){
            cityname = cityx.eneme
        }
        getporptytimecity(cityname)
    }

})



function getporptytimecity(cityname){
    let param_s = {
        country : "SA",
        city: cityname
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {

    params: param_s
  })
  .then(function (response) {
    const timings = response.data.data.timings;
    felltime("timeFajr",timings.Fajr)
    felltime("timesun",timings.Sunrise)
    felltime("timedhuhr",timings.Dhuhr)
    felltime("timeasr",timings.Asr)
    felltime("timemaghrib",timings.Maghrib)
    felltime("timeisha",timings.Isha)


    const wooked = response.data.data.date.hijri.weekday.ar
    const yeared = response.data.data.date.hijri.year
    const monthed = response.data.data.date.hijri.month.number

    document.getElementById("date_s").innerHTML = `
    <h4>${wooked} ${monthed} / ${yeared}</h4>

    `
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })



}


  function felltime(id,time){
    document.getElementById(id).innerHTML = time

  }



  getporptytimecity("Makkah al Mukarramah")


  function felltime(id, time) {
    const element = document.getElementById(id);
    element.classList.remove("animate__pulse", "animate__bounceIn");
    setTimeout(() => {
        element.innerHTML = time;
        element.classList.add("animate__pulse", "animate__bounceIn");
    }, 100);
}

