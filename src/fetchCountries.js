function fetchCountries(name){
    const BASE_URL = 'https://restcountries.com/v3.1/name'
    
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,languages,flags`)
        .then((resp) => {
            if(!resp.ok){
                // upgreatMarkup(refs.list.innerHTML, refs.info.innerHTML);
            throw new Error(resp.status)
            }
            return resp.json()
        })
}

export {fetchCountries}

