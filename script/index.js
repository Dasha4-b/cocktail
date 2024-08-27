const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const GET_ALL_COCKTAILS = API + `filter.php?c=Cocktail`
const GET_BY_NAME = API + `search.php?s=`
const GET_BY_FILTER = API + `filter.php?a=`
const GET_DETAIL = API + `lookup.php?i=`
const GET_RANDOM_COCKTAIL = API + `random.php`
const GET_INGRIDIENT = API + `search.php?i=vodka`

const form = document.querySelector('form')
const input = document.querySelector('#inp')
const filter = document.querySelector('#filter')
const output = document.querySelector('#output')

const getAllCocktails = async () => {
    const req = await fetch(GET_ALL_COCKTAILS)
    const res = await req.json()
    renderCocktails(res.drinks);
}

const getByName = async () => {
    const req = await fetch(GET_BY_NAME + input.value)
    const res = await req.json()
    renderCocktails(res.drinks);

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value.trim().length) {
        getByName()
    }
})

const getByFilter = async () => {
    const req = await fetch(GET_BY_FILTER + filter.value)
    const res = await req.json()
    renderCocktails(res.drinks);

}

filter.addEventListener('change', (e) => {
    if (e.target.value == 'All') {
        getAllCocktails()
    } else {
        getByFilter()
    }
})

const getDeatil = async (id) => {
    const req = await fetch(GET_DETAIL + id)
    const res = await req.json()
    renderDetail(res.drinks[0]);
}

const renderCocktails = (data) => {
    output.innerHTML = ''
    data.forEach(el => {
        // console.log(el);
        const card = document.createElement('div')
        card.classList.add('card')
        const img = document.createElement('img')
        const name = document.createElement('h2')
        const btnMore = document.createElement('button')

        img.src = el.strDrinkThumb
        name.textContent = el.strDrink
        name.title = el.strDrink
        btnMore.textContent = 'Подробнее'

        btnMore.addEventListener('click', () => {
            getDeatil(el.idDrink)
        })

        card.append(img, name, btnMore)
        output.append(card)
    })
}

const renderDetail = (cocktail) => {
    output.innerHTML = ''
    // console.log(cocktail);
    const card = document.createElement('div')
    card.classList.add('wrapper_cocktail')
    const img = document.createElement('img')
    img.classList.add('cocktail')
    const name = document.createElement('h1')
    name.classList.add('name')
    const ul = document.createElement('ul')
    ul.classList.add('ingridients')


    img.src = cocktail.strDrinkThumb
    name.textContent = cocktail.strDrink

    for (let key in cocktail) {
        // console.log(cocktail[key]);
        if (key.includes('strIngredient') && cocktail[key] !== null) {
            const li = document.createElement('li')
            li.textContent = cocktail[key]
            ul.append(li)
        }
    }

    card.append(img, name, ul)
    output.append(card)
}

output.onload = getAllCocktails()

const random = document.querySelector('#random')


const getRandom = async () => {
    const req = await fetch(GET_RANDOM_COCKTAIL)
    const res = await req.json()
    renderGetRandom(res.drinks[0]);

}
random.addEventListener('click', () => {
    output.innerHTML = ''
    getRandom()

})

const renderGetRandom = (cocktail) => {
    // console.log(cocktail);
    const card = document.createElement('div')
    const img = document.createElement('img')
    img.classList.add('randomCocktail')
    const name = document.createElement('h1')
    name.classList.add('randomName')
    const ul = document.createElement('ul')
    ul.classList.add('randomIngridients')


    img.src = cocktail.strDrinkThumb
    name.textContent = cocktail.strDrink

    for (let key in cocktail) {
        // console.log(cocktail[key]);
        if (key.includes('strIngredient') && cocktail[key] !== null) {
            const li = document.createElement('li')
            li.textContent = cocktail[key]
            ul.append(li)
        }
    }
    card.append(img, name, ul)
    output.append(card)

}
const aboutIng = async () => {
    const req = await fetch(GET_INGRIDIENT)
    const res = await req.json()
    console.log(res.ingredients[0]);
}