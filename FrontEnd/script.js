const API_BASE_URL = "http://localhost:5678/api";

async function fetchWorks() {
    return fetch(`${API_BASE_URL}/works`)
    .then((response) => response.json())
    .then(works => {                                  
        console.table(works);
        addWorksToGallery(works); 
    })
    .catch((error) => {
        console.error(error); 
    });
}

fetchWorks();

function addWorksToGallery(works) {
    const gallery = document.querySelector(".gallery"); 
    gallery.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `).join("");
}

//----------------------------Gallery Modal---------------------------------------------

async function fetchWorksGalleryModal(works) {

    fetch(`${API_BASE_URL}/works`)
    .then((response) => response.json())
    .then(works => {                                  


        const gallery = document.querySelector(".galleryModal"); 

        gallery.innerHTML = works.map(work => `
            <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
            </figure>
        `).join("");
    
    })
    .catch((error) => {
        console.error(error); 
    });

}

//----------------------------FILTRES---------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const categories = [
        { id: "0", name: "Tous" },
        { id: "1", name: "Objets" },
        { id: "2", name: "Appartements" },
        { id: "3", name: "Hotels et restaurants" }
    ];

    const filtersContainer = document.querySelector(".filters");

    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("filters-button");
        button.dataset.category = category.id;
        button.textContent = category.name;

        button.addEventListener("click", () => {
            filterImages(category.id);
            setActiveButton(button);
        });

        filtersContainer.appendChild(button);
    });

    function setActiveButton(activeButton) {
        document.querySelectorAll(".filters-button").forEach(button => {
            button.classList.remove("active");
        });
        activeButton.classList.add("active");
    }
});

function filterImages(categoryId) {
    console.log("categoryId", categoryId);
    if (categoryId === "0") {
        fetchWorks();
    }
    else {
        fetch(`${API_BASE_URL}/works`)
        .then((response) => response.json())
        .then(works => {
            const filteredWorks = works.filter(work => work.categoryId === categoryId);
            addWorksToGallery(filteredWorks);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
/*
function filterImages(categoryId) {
    console.log("categoryId", categoryId);
    if (categoryId === "0") {
        fetchWorks();
    }
    if (categoryId === "1") {
        fetch(`${API_BASE_URL}/works`)
        .then((response) => response.json())
        .then(works => {
            const filteredWorks = works.filter(work => work.categoryId === 1);
            addWorksToGallery(filteredWorks);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    if (categoryId === "2") {
        fetch(`${API_BASE_URL}/works`)
        .then((response) => response.json())
        .then(works => {
            const filteredWorks = works.filter(work => work.categoryId === 2);
            addWorksToGallery(filteredWorks);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    if (categoryId === "3") {
        fetch(`${API_BASE_URL}/works`)
        .then((response) => response.json())
        .then(works => {
            const filteredWorks = works.filter(work => work.categoryId === 3);
            addWorksToGallery(filteredWorks);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}
*/
function filterImages(categoryId) {
    console.log("categoryId", categoryId);
    if (categoryId === "0") {
        fetchWorks();
    } else {
        fetch(`${API_BASE_URL}/works`)
            .then((response) => response.json())
            .then(works => {
                const filteredWorks = works.filter(work => work.categoryId === parseInt(categoryId));
                addWorksToGallery(filteredWorks);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
//----------------------------ADMIN MODE---------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
        const adminMode = document.querySelectorAll('.adminMode');
        adminMode.forEach(element => {
            element.style.display = 'flex';
        });

        const login = document.querySelector('.login');
        login.style.display = 'none';

        const editMode = document.querySelector('.editMode');
        editMode.style.display = 'block';

        const edit = document.querySelector('.edit');
        edit.style.display = 'inline-flex';

        const logout = document.querySelector('.logout');
        logout.style.display = 'block';

    }
});

//-------------------Button pour ajouter des photos---------------------------------------------

const editButtons = document.querySelectorAll('.edit');
const modal = document.getElementsByClassName('modal')[0];
const closeModal = document.getElementsByClassName('closeModal')[0];
const addPicture = document.getElementsByClassName('addPicture')[0];

editButtons.forEach(button => {
    button.addEventListener('click', function() {
        modal.style.display = 'block';
        fetchWorksGalleryModal();
    });
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});


addPicture.addEventListener('click', function() {
    const modalAdd = document.getElementsByClassName('modalAdd')[0];
    if (modalAdd) {
        modalAdd.style.display = 'block';
    }
});

//----------------------------Boutton logout---------------------------------------------

const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', function() {
    localStorage.removeItem('token');
});


