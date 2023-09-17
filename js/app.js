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
let valeurActuele = 0;

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


function saveToLocalStorage(title, price, image) {
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

function getValeurDuLocalStorage() {
    const valeurLocalStorage = localStorage.getItem('resultat');
    let resultat = 0; // Valeur par défaut si la clé n'existe pas dans le local storage

    if (valeurLocalStorage !== null && !isNaN(valeurLocalStorage)) {
        resultat = parseInt(valeurLocalStorage);
    }

    return resultat;
}

// Initialisez le résultat avec la valeur stockée dans le local storage
let resultat = getValeurDuLocalStorage();
totalPrix.textContent = `${resultat}$`;


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
        const image = item.querySelector('.card-img-top').src;
        const cartItem = document.createElement('div');
        saveToLocalStorage(title, price, image,);
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
                <div class="d-flex mt-4 justify-content-evenly">
                    <div class="imgCart">
                    <img src="${image}" alt="${title}">
                    </div>
                    <div class="d-flex flex-column ms-5">
                        <span class="cartTitle fs-4">${title}</span>
                        <span class="cartAmount">${price}</span>
                    </div>
                       <div class="mt-2">
                        <button class="delete-button bg-white text-danger fs-3 border-0">
                               <i class="bi bi-trash-fill"></i>
                           </button>
                    </div>
                </div>
                `;

        const prixTotal = cartItem.querySelector('.cartAmount');
        const valeurAjoutee = parseInt(prixTotal.textContent);
        // Ajoutez la valeur extraite à la valeur actuelle du résultat
        resultat += valeurAjoutee;
        // Mettez à jour le total et affichez-le sur le bouton
        totalPrix.textContent = `${resultat}$`;
        totalSurButton.textContent = resultat;
        localStorage.setItem('resultat', resultat.toString());

        const button = cartItem.querySelector('.delete-button')
        button.addEventListener('click', () => {
            // Supprimez l'élément du panier
            const buttonParent = button.parentElement.parentElement;
            buttonParent.remove();

            // recuperer la liste du cartItem du localStorage 
            let mesCarts = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Recherchez l'index de l'élément que vous souhaitez supprimer
            const itemIndex = mesCarts.findIndex(item => item.title === title);

            // Si l'élément a été trouvé, supprimez-le
            if (itemIndex !== -1) {
                mesCarts.splice(itemIndex, 1);
                // Mettez à jour le localStorage avec la liste mise à jour
                localStorage.setItem('cartItems', JSON.stringify(mesCarts));
            }

            mettreAJourValeur();
        })
        AllDepense.appendChild(cartItem);
        mettreAJourValeur();
        notification(monAlert, "Element ajouter avec succes");
    })
})



// Charger les données du localStorage lors du chargement de la page
window.addEventListener('load', () => {
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
        }
        );

        AllDepense.appendChild(cartItem);
    });
});


function mettreAJourValeur() {
    const divsDeNiveauSuperieur = Array.from(AllDepense.children).filter(element => element.tagName === 'DIV');
    const nombreElements = divsDeNiveauSuperieur.length;
    itemCount.textContent = nombreElements;
}

mettreAJourValeur();




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

})