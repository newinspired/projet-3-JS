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

//----------------------------FETCH POST---------------------------------------------

document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch("http://localhost:5678/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);

            window.location.href = "accueil.html";
        } else {
            document.querySelector("#error-message").textContent = "erreur";
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
});