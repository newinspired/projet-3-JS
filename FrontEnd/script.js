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
    worksGlobal = works;
    const gallery = document.querySelector(".gallery"); 

    gallery.innerHTML = works.map(work => `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `).join("");
}

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


//--------------------------------------------------------------------------------
/*
function filterAll(works) {
    addWorksToGallery(works);
}

function filtersObjects(works) {
    const objects = works.filter(work => work.categoryId === 2);
    addWorksToGallery(objects);
}

/*
// Fonction pour filtrer les œuvres par categoryId
function filterWorksByCategory(categoryId, works) {
    let filteredWorks = [];

    if (categoryId === "all") {
        filteredWorks = works;
    }

    if (categoryId === "objects") {
        filteredWorks = works.filter(work => work.categoryId === 2);
    }

    addWorksToGallery(filteredWorks);
        
    }
/*
    function setupFilterListeners(works) {
        const filters = document.querySelectorAll(".filters-button");
    
        filters.forEach(filter => {
            filter.addEventListener("click", (event) => {
                const categoryId = event.target.getAttribute("data-category");
                filterWorksByCategory(categoryId, works); // Filtrer les œuvres selon le categoryId
            });
        });
    }





















    /*
    works.forEach(work => {
        // Créer un nouvel élément <figure> pour chaque travail
        const figure = document.createElement("figure");
    
        // Créer une balise <img> pour l'image
        const img = document.createElement("img");
        img.src = work.imageUrl; // Définir l'URL de l'image
        img.alt = work.title;     // Définir le texte alternatif
    
        // Créer une balise <figcaption> pour le titre
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title; // Définir le texte du titre
    
        // Ajouter l'image et le figcaption au <figure>
        figure.appendChild(img);
        figure.appendChild(figcaption);
    
        // Ajouter le <figure> à la galerie
        gallery.appendChild(figure);
    });
    */


