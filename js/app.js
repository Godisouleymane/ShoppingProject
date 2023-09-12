const categoryTitle = document.querySelectorAll('.category-title');
const AllCategoryPosts = document.querySelectorAll('.all');
const allCard = document.querySelectorAll('.card');
const cartIcon = document.querySelectorAll(".cart-icon");


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