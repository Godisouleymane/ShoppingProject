const categoryTitle = document.querySelectorAll('.category-title');
const AllCategoryPosts = document.querySelectorAll('.all');
const allCard = document.querySelectorAll('.card');
const cartIcon = document.querySelectorAll(".cart-icon");
const cartAmount = document.querySelector(".cartAmount");
const cartTitle = document.querySelector(".cartTitle");
const categoryName = document.querySelectorAll(".category-name");
const prix = document.querySelectorAll(".amount");
const AllDepense = document.querySelector(".AllDepense");
const prixNom = document.querySelectorAll(".prix-nom");
const mesImages = document.querySelectorAll(".card-img-top");
const allCakes = document.querySelectorAll(".cakes")
const deleteButton = document.querySelectorAll(".delete-button");
const searchIcon = document.getElementById('search-icon');
const monInput = document.getElementById("input-search");
const itemCount = document.querySelector('.itemCount');
const clearCartButton = document.getElementById('clear-cart-button');
const monAlert = document.querySelector('.alertCard');
const totalPrix = document.getElementById('totalPrix')
const totalSurButton = document.querySelector('.totalSurButton')
let valeurActuele = 1;
let quantiteActuelle;

for (let i = 0; i < categoryTitle.length; i++) {
    categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));

}

function filterPosts(item) {
    changeActivePosition(item);
    for (let i = 0; i < AllCategoryPosts.length; i++) {
        if (AllCategoryPosts[i].classList.contains(item.attributes.id.value)) {
            AllCategoryPosts[i].style.display = 'block';
            AllCategoryPosts[i].style.padding = '0';

        } else {
            AllCategoryPosts[i].style.display = 'none';
            AllCategoryPosts[i].style.display = '0';
        }

    }
}

function changeActivePosition(activeItem) {
    for (let i = 0; i < categoryTitle.length; i++) {
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add("active");
};

const star = document.querySelectorAll('.star');

for (let i = 0; i < star.length; i++) {

    // Écoutez l'événement de clic sur l'icône d'étoile
    star[i].addEventListener('click', () => {
        // Vérifiez si l'icône d'étoile est déjà remplie
        if (star[i].classList.contains('filled')) {
            // Si elle est remplie, retirez la classe "filled" pour la vider
            star[i].classList.remove('filled');
        } else {
            // Sinon, ajoutez la classe "filled" pour la remplir
            star[i].classList.add('filled');
        }
    });

}

for (let i = 0; i < AllCategoryPosts.length; i++) {
    AllCategoryPosts[i].addEventListener('mouseenter', () => {
        cartIcon[i].classList.remove('hidden')
    })

    AllCategoryPosts[i].addEventListener('mouseleave', () => {
        cartIcon[i].classList.add('hidden')
    })

}


function saveToLocalStorage(title, price, image,) {
    // verifier si les cartItems sont deja stocker dans le localStorage 
    let getItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Créer un nouvel objet représentant le cartItem
    const newCartItem = {
        title: title,
        price: price,
        image: image,
        
    };

    // Ajouter le nouvel objet à la liste des cartItems
    getItems.push(newCartItem);

    // Enregistrer la liste mise à jour dans le localStorage
    localStorage.setItem('cartItems', JSON.stringify(getItems));


}



function notification(element, message) {
    element.classList.remove('hidden')
    element.innerHTML = ` <div class="alert alert-primary d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2 " role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
    <div class="text-center mt-3">
     <p class="text-center">${message}</p>
    </div>
  </div>`

    setTimeout(() => {
        element.classList.add('hidden')
    }, 2000);
}



cartIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        const item = icon.parentElement;
        const title = item.querySelector('.category-name').textContent;
        const price = item.querySelector('.amount').textContent;
        const numberPrice = price.split('$')[0];
        const image = item.querySelector('.card-img-top').src;
        saveToLocalStorage(title, numberPrice, image);
        afficherElementsDansPanier()
        notification(monAlert, "Element ajouter avec succes");
    })
})



const afficherElementsDansPanier = () => {
    AllDepense.innerHTML = '';
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="d-flex mt-4 justify-content-evenly">
                <div class="imgCart">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="d-flex flex-column ms-5">
                    <span class="cartTitle fs-4">${item.title}</span>
                    <span class="cartAmount">${item.price}</span>
                </div>
                <div class="mt-2">
                    <button class="delete-button bg-white text-danger fs-3 border-0">
                           <i class="bi bi-trash-fill"></i>
                       </button>
                </div>
            </div>
        `;
         const total =  JSON.parse(localStorage.getItem('resultat'))
        // Mettez à jour le total et affichez-le sur le bouton
        totalPrix.textContent = `${total}$`;
        totalSurButton.textContent = total;


        const deleteButton = cartItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            // Supprimez l'élément du tableau dans le localStorage
            const buttonParent = deleteButton.parentElement.parentElement;
            buttonParent.remove();

            // Récupérez la liste des cartItems du localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Recherchez l'index de l'élément que vous souhaitez supprimer
            const itemIndex = cartItems.findIndex(cartItem => cartItem.title === item.title);

            // Si l'élément a été trouvé, supprimez-le
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                // Mettez à jour le localStorage avec la liste mise à jour
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
               

            }

            mettreAJourValeur();
        });
        mettreAJourValeur()
        AllDepense.appendChild(cartItem);
    });
}

afficherElementsDansPanier();

function mettreAJourValeur() {
    const cart = JSON.parse(localStorage.getItem('cartItems'))
    itemCount.textContent = "";
    itemCount.textContent = cart ? cart.length: 0;
    let total = 0;
    if (cart) {
        cart.forEach(element => {
            total += parseInt(element.price)
        })
    }
    localStorage.setItem('resultat', total.toString());
    totalPrix.textContent = `${total}$`;
    totalSurButton.textContent = total;
}








function recherche() {
    const inputValue = monInput.value.toLowerCase();

    for (let i = 0; i < AllCategoryPosts.length; i++) {
        const element = AllCategoryPosts[i].textContent.toLowerCase();

        if (element.includes(inputValue)) {
            AllCategoryPosts[i].style.display = 'block'
        } else {
            AllCategoryPosts[i].style.display = 'none'
        }
    }
}


searchIcon.addEventListener('click', (event) => {
    event.preventDefault();
    recherche()
})


clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('resultat');
    while (AllDepense.firstChild) {
        AllDepense.removeChild(AllDepense.firstChild);
    }
    mettreAJourValeur()
    notification(monAlert, "Elements supprimer avec succes")
})