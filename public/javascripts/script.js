
let city=document.querySelector('#city');
let temp=document.querySelector('.temperature')
let desc=document.querySelector('.description');
let humidity=document.querySelector('#humidity');
let icons=document.querySelector('.weather-icon');
let visibility=document.querySelector('#visibility')
let windSpeed=document.querySelector('#windspeed')
let UVindex=document.getElementById('uvindex');
let sunrise=document.querySelector('#sunrise')
let sunset=document.querySelector('#sunset')
let todaytemp=document.querySelector("#today-temp")
let tomtemp=document.querySelector("#tom-temp")
let day3_temp=document.querySelector('#day3-temp')
let day4_temp=document.querySelector('#day4-temp')
let day_3=document.querySelector('#day-3');
let day_4=document.querySelector('#day-4');


async function fetchData() {

	try {
		let location=document.querySelector('#search-input').value;
		
		const url =await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=5QMP64HV6B2MERM9BAE75WQZK `);
		if (!url.ok) {
			console.error("data not found");
		}
		const data = await url.json();
		console.log(data)
        city.innerText=data.address.charAt(0).toUpperCase()+ data.address.slice(1);
        let degC=(data.currentConditions.temp-32)*5/9
        temp.innerText=`${degC.toFixed(1)}°C`;
        desc.innerText=data.description;
        humidity.innerText=`${data.currentConditions.humidity}%`
		if(data.currentConditions.conditions==="Partially cloudy"){
			icons.setAttribute('src',"/Icons/partiallycloudy.png")
		}
		visibility.innerText=`${data.currentConditions.visibility} Km`
		windSpeed.innerText=`${data.currentConditions.windspeed} Km/h`;
		UVindex.innerText=data.currentConditions.uvindex;
		sunrise.innerText=`${data.currentConditions.sunrise.slice(0,5)}`;
		sunset.innerText=`${data.currentConditions.sunset.slice(0,5)}`;
		let tod=(data.days[0].temp-32)*5/9
		todaytemp.innerText=`${tod.toFixed(1)}°C`
		let tom=(data.days[1].temp-32)*5/9
		tomtemp.innerText=`${tom.toFixed(1)}°C`;
		let day3=(data.days[2].temp-32)*5/9
		day3_temp.innerText=`${day3.toFixed(1)}°C`;

		let day4=(data.days[3].temp-32)*5/9
		day4_temp.innerText=`${day4.toFixed(1)}°C`;
		

		let date3 = new Date(data.days[2].datetime);
		const options1 = { year: 'numeric', month: 'long', day: 'numeric' };	
        day_3.innerText=date3.toLocaleDateString('en-US', options1);

		let date4 = new Date(data.days[3].datetime);
		const options2 = { year: 'numeric', month: 'long', day: 'numeric' };
		day_4.innerText=date4.toLocaleDateString('en-US', options2);
	}
	catch (error) {
		console.log(error);
	}
}
