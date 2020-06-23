const pizzas = {
    cap: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        sausage: 2,
        mashroom: 3,
        cheez: 1,
    },
    onions: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        meat: 1,
        cheez: 1,
    },
    king_one: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        mayo: 1,
        mashroom: 3,
        tomato: 2,
        cheeze: 3,
        dill: 2,
        parsley: 2
    },
    gavay: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        ananas: 1,
        cheez: 2,
    },
    tonno: {
        dough: 1,
        tomato_sauce: 1,
        tuna: 2,
        kappers: 1,
        cheez: 1,
    },
    vegeterian: {
        dough: 1,
        tomato_sauce: 1,
        tomato: 2,
        kappers: 1,
        cucumber: 2,
        onion: 2,
        cheez: 1,
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    const pizzasClassList = ['col-md-4', 'col-sm-6', 'text-center', 'pizza-item']
    const pizzas_page = document.getElementById("pizzas_page")
    const popular_page = document.getElementById("popular_page")
    const popular_link = document.getElementById("popular_link")
    const home_link = document.getElementById("home_link")
    let orders_badge = document.getElementById("orders_badge")
    renderContent(pizzas, pizzas_page, pizzasClassList)
    let lastPizzas = [];

    function renderContent(obj, domElement, classList) {
        for (let key in obj) {
            const wrapper = document.createElement("div")

            const button = document.createElement("button")
            const buttonText = document.createTextNode("Order")
            button.classList.add("btn", "btn-success")
            button.appendChild(buttonText)
            button.setAttribute('data-id', key)
            button.setAttribute('name', 'order')

            const pizzaName = document.createTextNode(key.toUpperCase())
            const h3 = document.createElement('h3')
            h3.appendChild(pizzaName)

            const imgwrapper = document.createElement("div")
            const img = new Image()
            img.src = `img/${key}.jpg`
            imgwrapper.appendChild(img)

            const valueswrapper = document.createElement("div")

            let ingridients = Object.keys(obj[key]).toString().toUpperCase().replace(/[(),]/g, '<br>')
            valueswrapper.innerHTML = ingridients
            wrapper.classList.add(...classList)
            wrapper.appendChild(imgwrapper)
            wrapper.appendChild(h3)
            wrapper.appendChild(button)
            wrapper.appendChild(valueswrapper)

            domElement.appendChild(wrapper);
        }
    }
    // if (window.localStorage) {
    //     if (localStorage.getItem('orders_list')) {
    //         lastPizzasJson = localStorage.getItem('lastPizzas');
    //         lastPizzas = lastPizzasJson ? JSON.parse(lastPizzasJson) : []
    //         console.log("Ordered Pizzas: " + localStorage.getItem('orders_list'));
    //         orders_badge.innerHTML = ("Orders:" + lastPizzas.length)
    //     }
    //     else {
    //         orders_list = new Array();
    //         console.log('Orders not found in localstorage')
    //     }
    // }
    pizzas_page.addEventListener("click", function (e) {
        if (e.target.getAttribute("name") == "order" && e.target.getAttribute("data-id") != null) {
            lastPizzas = lastPizzas.concat(e.target.getAttribute("data-id"))
            console.log(lastPizzas, 'lastPizzas')
            localStorage.setItem('orders_list', JSON.stringify(lastPizzas))
            orders_badge.innerHTML = ("Orders:" + lastPizzas.length)
        }
    })

    popular_link.addEventListener('click', function () {
        popular_page.style.display = ""
        pizzas_page.style.display = "none"
        document.getElementsByTagName('h1')[0].innerHTML = "Popular pizzas"
        let popularPizzas = getPizzaInfo(lastPizzas)
        console.log(popularPizzas.stringResult, 'popularPizzas')
        popular_page.innerText = popularPizzas.stringResult

    })

    home_link.addEventListener('click', function () {
        popular_page.style.display = "none"
        pizzas_page.style.display = ""
        document.getElementsByTagName('h1')[0].innerHTML = "All Pizzas"
    })

    // ******************************
    function getPizzaInfo(arr) {
        let stringResult;
        let objResult = {};
        let array = arr
        function getPopular(arr) {
            for (let len = arr.length, i = len; --i >= 0;) {
                if (arr[arr[i]]) {
                    arr[arr[i]] += 1;
                    arr.splice(i, 1);
                } else {
                    arr[arr[i]] = 1;
                }
            }
            arr.sort(function (a, b) {
                return arr[b] - arr[a];
            });
            stringResult = JSON.stringify(
                arr,
                function (k, v) {
                    // eslint-disable-next-line
                    if (k == "") return v;
                    // getIngr(v, arr[v]);
                    objResult[v] = array[v];
                    return `${v} - ${arr[v]}`;
                },
                1
            );
            console.log("stringResult:", stringResult);
            return arr;
        }

        return {
            popular: getPopular(array),
            ingridients: [],
            stringResult: stringResult
        };
    }
    // ******************************
});