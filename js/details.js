import { Ui } from "./UI.js";

export class Details {
    constructor(id) {
        this.ui = new Ui;
        document.querySelector(".xmark").addEventListener("click", () => {
            document.querySelector(".details").classList.add("d-none");
            document.querySelector(".home").classList.remove("d-none");
        });

        if (id) {
            this.getDetails(id)
        }

    }

    async getDetails(id) {
        document.getElementById("detailsData").innerHTML = "";
        const lodeng = document.querySelector(".lodeng");
        lodeng.classList.remove("d-none");
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c512b4c4efmshc2febc2e66f9dd9p1cac02jsn8211e559cb15',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        )

        const res = await api.json();
        this.ui.displyDetails(res);
        lodeng.classList.add("d-none");


        document.querySelectorAll(".screenshot-img").forEach(img => {
            img.addEventListener("click", () => {
                const modal = document.getElementById("imageModal");
                const modalImg = document.getElementById("modalImage");

                modalImg.src = img.src;
                modal.classList.remove("d-none");
            });
        });

        document.getElementById("imageModal").addEventListener("click", () => {
            document.getElementById("imageModal").classList.add("d-none");
        });


    }
}