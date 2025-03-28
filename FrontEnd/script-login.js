document.querySelector("#login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    console.log("Tentative de connexion avec :", email, password);

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log("Réponse reçue :", response);

        const data = await response.json();
        console.log("Données de la réponse :", data);
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            document.querySelector("#error-message").textContent = "Mot de passe ou identifiant incorrect";
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
});

