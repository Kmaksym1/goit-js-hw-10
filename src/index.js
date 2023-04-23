import './css/styles.css';
import Notiflix from 'notiflix'
import {fetchCountries} from './fetchCountries'
import _ from 'lodash'

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input')
const countryInfo = document.querySelector('.country-info')
const countryListEL = document.querySelector('.country-list')

input.addEventListener('input', onInput)
function onInput(ev){
    currentCountries = ev.currentTarget.value.trim()
        if(currentCountries.length===0){
            countryListEL.innerHTML='';
            countryInfo.innerHTML='';
        }else if(currentCountries.length<=1){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
    }
    return fetchCountries(currentCountries)
        .then((data)=>{
            if(data.length===1){
                countryListEL.innerHTML='';
                countryInfo.innerHTML=(createMarkupCountry(data))
            }else{
                countryInfo.innerHTML ='';
                countryListEL.innerHTML=(createMarkupList(data))
            }}
    ).catch(err=> console.log('Error',err))
}
    
function createMarkupList(arr){
    return arr.map(({flags, name: {official}})=> 
        `<li style="list-style: none;style="display: flex;">
        <div style="display: flex; align-items: center;">
        <img style="width:40px; height:30px" src="${flags.svg}" alt="${official}">
        <p>${official}</p></div></li>`
        ).join('')
}
function createMarkupCountry(arr){
    return arr.map(({flags, name: {official}, languages, capital, population})=>
    `<h1><img style="width:40px; height:30px" src="${flags.svg}" alt="${official}"> ${official}</h1>
    <h2>Capital: <span style="font-weight: normal">${capital}</span></h2>
    <h2>Population: <span style="font-weight: normal">${population}</span></h2>
    <h2>Languages: <span style="font-weight: normal">${Object.values(languages)}</span></h2>`
        ).join('')
}