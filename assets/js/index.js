window.addEventListener('DOMContentLoaded', function(event) {
    const inputProductName = document.querySelector("#input-product-name");
    const inputProductPrice = document.querySelector("#input-product-price");
    const inputProductImg = document.querySelector("#input-product-img");
    const allInputs = document.querySelectorAll('input');
    const buttonSave = document.querySelector('#button-save');
    const divProducts = document.querySelector('#div-products');
    const divEmpty = document.querySelector('#empty-list');

    document.cookie = "promo_shown=1; Max-Age=2600000; Secure";

    allInputs.forEach(input => {
        input.addEventListener('change', function(event) {

            if (event.target.value) {
                input.classList.remove('is-invalid');
            }
        })
    });

    divEmpty.style.display = "block";

    buttonSave.addEventListener('click', function(event) {
        event.preventDefault();
        let isValid = true;

        if (!inputProductName.value) {
            inputProductName.classList.add('is-invalid');
            isValid = false;
        }

        if (!inputProductPrice.value) {
            inputProductPrice.classList.add('is-invalid');
            isValid = false;
        }

        if (!inputProductImg.value) {
            inputProductImg.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            inputProductName.classList.remove('is-invalid');
            inputProductPrice.classList.remove('is-invalid');
            inputProductImg.classList.remove('is-invalid');

            if (divEmpty.style.display === 'block')
                divEmpty.style.display = 'none';

            let url = window.URL.createObjectURL(inputProductImg.files[0]);
            
            divProducts.innerHTML +=
                `<div class='col col-sm-6 col-md-4 col-lg-3 col-xl-2 p-3 d-block'>
                        <div class="card">
                            <img src="${url}" class="card-img-top">
                            <div class="card-body">
                                <output class="card-title">${inputProductPrice.value}</output>
                                <p class="card-text">${inputProductName.value}</p>
                            </div>
                        </div>
                    </div>`;

            inputProductName.value = "";
            inputProductPrice.value = null;
            inputProductImg.value = null;
        }

    });
    inputProductPrice.addEventListener('focus', onFocus);
    inputProductPrice.addEventListener('blur', onBlur);
});

function onFocus(e) {
    var value = e.target.value;
    e.target.value = value ? formatNumber(value) : '';
}

function onBlur(e) {
    var value = e.target.value;
    e.target.value = (value || value === 0) ?
        formatNumber(value) : '';
}

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    // Create our number formatter.
    let formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'USD',
        currencyDisplay: "symbol"
    });
    n = n.replace("$", '')
    if (n === 'NaN')
        return ''
    return formatter.format(n); /* $2,500.00 */
}
