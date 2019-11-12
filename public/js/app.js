const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');

const paragraph1 = document.querySelector('#paragraph1');
const paragraph2 = document.querySelector('#paragraph2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = weatherInput.value;

    paragraph1.textContent = 'Loading...';
    paragraph2.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paragraph1.textContent = data.error;
                paragraph2.textContent = '';
                return;
            }
            paragraph2.textContent = data.forecast.summary + ' It is currently ' +
            data.forecast.temperature + ' degrees C with ' +
            (100*data.forecast.chance_precipitation) + '% chance of rain. Temperature high is ' + 
            data.forecast.temperature_high + ', low is ' + data.forecast.temperature_low;

            paragraph1.textContent = data.location;
        });
    });
});