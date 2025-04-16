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

            <div class="image-container">
                <img src="${work.imageUrl}" alt="${work.title}">
                <div class="trash-image"> 
                    <i class="fa-solid fa-trash-can delete-icon" id="${work.id}"></i> 

                </div>
            </div>

        `).join("");

        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                const workId = this.id;
                console.log("Suppression de l’image avec ID :", workId);
        
                const token = localStorage.getItem('token');
        
                fetch(`${API_BASE_URL}/works/${workId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Échec de la suppression.");
                    }
        
                    const imageContainer = icon.closest('.image-container');
                    imageContainer.remove();
        
                    const galleryFigures = document.querySelectorAll('.gallery figure');
                    galleryFigures.forEach(figure => {
                        const img = figure.querySelector('img');
                        if (img && img.src.includes(workId)) {
                            figure.remove();
                        }
                    });
        
                    fetchWorks();

                    const overviewImage = document.querySelector(".newPicture");
                    overviewImage.innerHTML = '<i class="fa-solid fa-image"></i>';
                })
                .catch(error => {
                    console.error("Erreur lors de la suppression :", error);
                });
            });
        });











        


    })
    .catch((error) => {
        console.error(error); 
    });

}
























//-------------------Button pour ajouter des photos---------------------------------------------

const editButtons = document.querySelectorAll('.edit');
const modal = document.getElementsByClassName('modal')[0];
const modal2 = document.getElementsByClassName('modal2')[0];
const closeModal = document.getElementsByClassName('closeModal')[0];
const closeModal2 = document.getElementsByClassName('closeModal2')[0];
const backModal = document.getElementsByClassName('backModal')[0];
const addPicture = document.getElementsByClassName('addPicture')[0];


editButtons.forEach(button => {
    button.addEventListener('click', function() {
        modal.style.display = 'block';
        document.querySelector('.backgroundModal').style.display = 'flex';
        fetchWorksGalleryModal();

    });
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.querySelector('.backgroundModal').style.display = 'none';
});

closeModal2.addEventListener('click', function() {
    modal2.style.display = 'none';
    document.querySelector('.backgroundModal').style.display = 'none';
});

backModal.addEventListener('click', function() {
    modal2.style.display = 'none';
    modal.style.display = 'block';
});



addPicture.addEventListener('click', function() {
    const modalAdd = document.getElementsByClassName('addPicture')[0];
    if (modalAdd) {
        modal.style.display = 'none';
        modal2.style.display = 'block';
    }

});

const fileInput = document.getElementById('uploadFile');
const addPictureBtn = document.querySelector('.addPictureModal2Button');

addPictureBtn.addEventListener('click', () => {
    fileInput.click();
});

//--------------------Affiche un apercu de l'image--------------------------

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;
        console.log(fileName);

        const overviewImage = document.querySelector(".newPicture"); 

        
        const imageURL = URL.createObjectURL(file);

        overviewImage.innerHTML = `<img style="max-width: 100%; max-height: 200px; border-radius: 10px;" src='${imageURL}'>`;

        const iconPreview = document.getElementsByClassName('fa-solid fa-image');
        iconPreview[0].style.display = 'none';
    }
});







//----------------Les catégories provenant de l'API Modal 2--------------------------


document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("categorie-select");

    const apiUrl = "http://localhost:5678/api/categories";
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        
        data.forEach(categorie => {
            console.log(`Catégorie ID: ${categorie.id}, Nom: ${categorie.name}`);
            const option = document.createElement("option");
            option.value = categorie.id;
            option.textContent = categorie.name;
            select.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Erreur", error);
      });
  });





































//--------------Ajouter dans Modal 2 une oeuvre à la gallery--------------------------

const addModal2toGallery = document.getElementsByClassName('addModal2ToGallery')[0];

addModal2toGallery.addEventListener('click', () => {
    const imageInput = document.getElementById('uploadFile');
    const titleInput = document.querySelector('input[name="titre"]');
    categorySelect = document.getElementById('categorie-select');

    const token = localStorage.getItem('token');

    if (!imageInput.files.length || !titleInput.value || !categorySelect.value) {
        alert("Merci de remplir tous les champs !");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    fetch(`${API_BASE_URL}/works`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'image.");
        }
        return response.json();
    })
    .then(newWork => {
        console.log("Image ajoutée :", newWork);
        addWorksToGallery([...document.querySelectorAll(".gallery figure")].map(fig => ({
            imageUrl: fig.querySelector("img").src,
            title: fig.querySelector("figcaption").innerText
        })).concat(newWork));

        modal2.style.display = 'none';
        modal.style.display = 'none';
        document.querySelector('.backgroundModal').style.display = 'none';
    })
    .catch(error => {
        console.error(error);
        alert("Échec de l'envoi.");
    });
});



document.querySelector('.backgroundModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('backgroundModal')) {
        modal.style.display = 'none';
        modal2.style.display = 'none';
        document.querySelector('.backgroundModal').style.display = 'none';
    }
});





















































//----------------------------Boutton logout---------------------------------------------

const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', function() {
    localStorage.removeItem('token');
});


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

        const filters = document.querySelector('.filters');
        filters.style.display = 'none';

    }
});