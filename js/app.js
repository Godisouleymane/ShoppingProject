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



cartIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        const item = icon.parentElement.parentElement;
                const title = item.querySelectorAll('.category-name').textContent;
                const price = item.querySelectorAll('.amount').textContent;
                const image = item.querySelectorAll('.card-img-top').src;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                <div class="d-flex justify-content-evenly">
                    <div class="imgCart">
                    <img src="${image}" alt="${title}">
                    </div>
                    <div class="d-flex flex-column ms-5">
                        <span class="cartTitle fs-4">${title}</span>
                        <span class="cartAmount">${price}</span>
                    </div>
                       <div class="mt-2">
                        <button class="delete-button text-danger fs-3 border-0 ">
                               <i class="bi bi-trash-fill"></i>
                           </button>
                    </div>
                </div>
                `;

        AllDepense.appendChild(cartItem)

    })
})





































// function AjoutInCart() {
//     for (let i = 0; i < prixNom.length; i++) {
//         let name = categoryName.value
//         let valeur = prix.value
//         console.log(name);

//         const div = document.createElement("div")
//         div.innerHTML = `<div class="d-flex justify-content-evenly">
//         <div class="imgCart">
           
//         </div>
//         <div class="d-flex flex-column ms-5">
//             <span class="cartTitle fs-4">${name}</span>
//             <span class="cartAmount">${valeur}</span>
//         </div>
//         <div class="mt-2">
//             <button class="delete-button text-danger fs-3 border-0 ">
//                 <i class="bi bi-trash-fill"></i>
//             </button>
//         </div>
//     </div>`
        
//     AllDepense.appendChild(div)
//     }



// }



// for (let i = 0; i < cartIcon.length; i++) {
//     cartIcon[i].addEventListener('click', (event) => {
//         event.preventDefault();
//         AjoutInCart();
//     })
    
// }
