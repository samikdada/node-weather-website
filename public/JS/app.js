
console.log('Client side javascipt has been loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';
    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.summary;
        }
    })
})
})