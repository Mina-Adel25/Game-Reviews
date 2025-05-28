import { Details } from "./details.js";


export class Ui {


  constructor() {

    this.details = document.querySelector(".details");
    this.home = document.querySelector(".home");

  }

  displyeGames(data) {


    let gamesBox = "";

    for (let i = 0; i < data.length; i++) {
      let videoPath = data[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");

      gamesBox += `
      <div class="col-md-6 col-lg-3 pb-3 pb-md-0" >
        <div class="card h-100 game-card " id="${data[i].id}">
          <figure class="p-2 mb-0 position-relative">
            <img src="${data[i].thumbnail}" class="card-img-top" alt="${data[i].title}">
            <video muted preload="none" loop class="w-100 h-100 position-absolute top-0 start-0 z-3 d-none">
              <source src="${videoPath}" type="video/webm">
            </video>
          </figure>
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="card-title">${data[i].title}</h3>
              <span class="p-2 rounded-2 free">Free</span>
            </div>
            <p class="card-text text-center pt-1">${data[i].short_description.split(" ", 8)}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <span class="p-1 rounded-2">${data[i].genre}</span>
            <span class="p-1 rounded-2">${data[i].platform}</span>
          </div>
        </div>
      </div>
    `;
    }

    document.getElementById("gameData").innerHTML = gamesBox;


    document.querySelectorAll(".card").forEach(item => {
      item.addEventListener("click", () => {
        this.home.classList.add("d-none");
        this.details.classList.remove("d-none");

        new Details(item.id);
      });
    });
  }

  displyDetails(data) {


    let screenshotsHtml = "";
    if (data.screenshots && data.screenshots.length > 0) {
      data.screenshots.forEach((img, index) => {
        screenshotsHtml += `<div class="col-4 "><img src="${img.image}" data-index="${index}" class="img-fluid rounded-2 me-2 mb-2 screenshot-img " style=" cursor: pointer;"></div>`;
      });
    }


    let gamesBox = "";
      gamesBox= `
         <div class="col-lg-5 details-img  ">
               
                <img src="${data.thumbnail}" alt="" class="w-100 mb-4">
                <div class=" row">
                <h3>Throne And Liberty Screenshots</h3>
                    ${screenshotsHtml}
                </div>

                <video muted preload="none" loop class=" w-100 opacity-50 rounded-2  d-none">
                    <source src="https://www.freetogame.com/g/590/videoplayback.webm" type="video/webm">
                </video>


            </div>
            <div class="col-lg-7 details-text ">
                <div class="">
                    <h3 class="mb-4">${data.title}</h3>
                    <ul>
                        <li>Category : <span class="btn btn-outline-warning disabled p-1 mb-2 "> ${data.genre}</span></li>
                        <li>platform : <span class="btn btn-outline-warning disabled p-1 mb-2"> ${data.platform}</span> </li>
                        <li>status : <span class="btn btn-outline-warning disabled p-1 mb-2"> ${data.status}</span> </li>
                    </ul>
                    <p class="ms-3">${data.description}<p>
                </div>
                <a href="${data.freetogame_profile_url}" class="ms-3 btn btn-outline-info ">show game</a>
                
            </div>`;

    document.getElementById("detailsData").innerHTML = gamesBox;

    let bgImage = data.thumbnail.replace('thumbnail', 'background');

   this.details.style.cssText = `
       background-image: 
         linear-gradient(to bottom, 
           rgba(0, 0, 0, 0.6) 0%, 
           rgba(39, 43, 48, 0.8) 70%, 
           rgba(39, 43, 48,1) 100%
         ),
         url(${bgImage});
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;
      `;


  }
}


