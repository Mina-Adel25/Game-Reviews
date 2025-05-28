import { Ui } from "./UI.js";

export class Home {
    constructor() {

        this.ui = new Ui;
        this.getGames("mmorpg");




        let allLink = document.querySelectorAll(".nav-link");

        allLink.forEach((link) => {

            link.addEventListener("click", () => {
                let activeLink = document.querySelector(".navbar-nav .active");

                activeLink.classList.remove("active");
                link.classList.add("active");

                let cat = link.getAttribute("data-ccategory");
                this.getGames(cat);

            })
        });


    }

    async getGames(cat) {

        const lodeng = document.querySelector(".lodeng");

        lodeng.classList.remove("d-none");

        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, {
            method: "get",
            headers: {
                'x-rapidapi-key': 'c512b4c4efmshc2febc2e66f9dd9p1cac02jsn8211e559cb15',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        }
        )
        const res = await api.json();

        lodeng.classList.add("d-none");
        this.ui.displyeGames(res);

        const cards = document.querySelectorAll(".game-card");
        cards.forEach(card => {
            card.addEventListener("mouseenter", (e) => {
                const video = e.target.querySelector("video");


                if (video) {
                    video.currentTime = 0;
                    video.classList.remove("d-none");
                    video.play().catch((error) => {
                    });
                }
            });
            card.addEventListener("mouseleave", (e) => {
                const video = e.target.querySelector("video");
                if (video) {
                    video.pause();
                    video.classList.add("d-none");
                }
            });
        });
    }
}


