const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    console.log(data);

    // destructive properties
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      </div>
      `;

    //   Update the night/Day & icon images
        // const iconSrc = 'img/icons/${weather.WeatherIcon}.svg';
        // icon.setAttribute('src', iconSrc);

        let timeSrc = null;
        if(weather.IsDayTime){
            timeSrc = 'https://th.bing.com/th/id/OIP.C_3_cxI4i1yQ4mia1ZjuFAHaFC?pid=ImgDet&rs=1';
        }else {
            timeSrc = 'https://th.bing.com/th/id/OIP.H95PL3EYs4yi5jXmkcIR0wAAAA?pid=ImgDet&rs=1';
        }
        time.setAttribute('src', timeSrc);

    //   Remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

const cityDets = await getCity(city);
const weather = await getWeather(cityDets.Key);

return {cityDets, weather};

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // Get city value 
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city 
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});