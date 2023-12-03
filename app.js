const products = [
    {
        name: 'coca cola',
        productNumber: 'a1',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'sneakers',
        productNumber: 'a2',
        productPrice: 35,
        imageUrl: 'images/mars.png'
    },
    {
        name: 'coca cola',
        productNumber: 'a3',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'a4',
        productPrice: 35,
        imageUrl: 'images/snickers.png'
    },
    {
        name: 'coca cola',
        productNumber: 'a5',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'b1',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'b2',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'b3',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'b4',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },{
        name: 'coca cola',
        productNumber: 'b5',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'c1',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'c2',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'c3',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'c4',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'c5',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'd1',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'd2',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'd3',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'd4',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
    {
        name: 'coca cola',
        productNumber: 'd5',
        productPrice: 35,
        imageUrl: 'images/coca-cola.png'
    },
]
let selectedProductNumber;
if(!selectedProductNumber){
    document.querySelector('.pay').style.opacity = 0.35;
    document.querySelector('.pay').style.pointerEvents = 'none';
}
const pickProduct = (productNumber) => {
    if(selectedProductNumber === productNumber.id){
        selectedProductNumber = ''
    } else {
        selectedProductNumber = productNumber.id
    }
    if(!selectedProductNumber){
        document.querySelector('.pay').style.opacity = 0.35
    } else {
        document.querySelector('.pay').style.opacity = 1;
        document.querySelector('.pay').style.pointerEvents = 'all';
    }
    productNumber.classList.toggle('active')
    let parent = productNumber.parentNode
    let siblings = Array.from(parent.children).filter((item) => item !== productNumber)
    siblings.map((item) => item.classList.remove('active'))
    showPrice()
    // console.log(document.getElementById(productNumber))
}

const  payForProduct = () => {
    document.querySelector('.order-pop-up').classList.remove('hide');
    let product = products.filter((p) => p.productNumber === selectedProductNumber)[0]
    console.log(product)
    document.querySelector('.order-pop-up h4').innerHTML = product.name + ' x1';
    document.querySelector('.order-pop-up img').src = product.imageUrl;
}

const openInventory = () => {
    document.querySelector('.order-pop-up').classList.add('hide');
}

const pushProducts = (data) => {
    document.querySelector('.vending-machine').innerHTML = '';
    data.map((item) => {
        const {name, productNumber, productPrice, imageUrl} = item;
        document.querySelector('.vending-machine').innerHTML += `
        <section class="product" id=${productNumber} onclick="pickProduct(${productNumber})">
            <span class="product-number">${productNumber}</span>
            <div>
                <img src=${imageUrl} alt="">
            </div>
            <p class="price">${productPrice.toFixed(2)}</p>
        </section>
        `
    })
}

pushProducts(products)
const productNumberSearch = document.querySelector('.product-number-search')
document.querySelector('.backspace').addEventListener('click', () => {
    let val = productNumberSearch.value
    productNumberSearch.value = val.slice(0, -1)
})
document.querySelectorAll('.number').forEach(element => {
    element.addEventListener('click', () => {
        if(productNumberSearch.value.length < 2){
            productNumberSearch.setSelectionRange(0,0)
            productNumberSearch.focus()
            productNumberSearch.value += element.textContent
        }
    })
});
document.querySelector('.product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    selectProductNumber()
})
const selectProductNumber = () => {
    let selected = document.querySelector(`#${productNumberSearch.value.toLowerCase()}`);
    if (selected){
        pickProduct(document.querySelector(`#${productNumberSearch.value.toLowerCase()}`));
        selectedProductNumber = selected.id
    } else {
        Array.from(document.querySelector('.vending-machine').children).map((item) => item.classList.remove('active'))
        selectProductNumber = '';
    }
    showPrice()
    productNumberSearch.value = '';
}

const showPrice = () => {
    if(selectedProductNumber){
        document.querySelector('.product-form').classList.add('hide-header');
        document.querySelector('.price-form').classList.remove('hide-header');
        let product = products.filter((p) => p.productNumber === selectedProductNumber)[0]
        document.querySelector('.price-form input').value = product.productPrice.toFixed(2)
    } else {
        document.querySelector('.product-form').classList.remove('hide-header');
        document.querySelector('.price-form').classList.add('hide-header');
    }
}

const card = document.querySelector('.card')
const cash = document.querySelector('.cash')
card.addEventListener('click', () => {
    card.classList.add('method-active');
    cash.classList.remove('method-active');
})
cash.addEventListener('click', () => {
    card.classList.remove('method-active');
    cash.classList.add('method-active');
})
const toggleDisplay = () => {
    document.querySelector('.display').classList.toggle('hide')
}
document.addEventListener('keydown', evt => {
    if (evt.key === 'Home') {
        toggleDisplay();
    }
});
