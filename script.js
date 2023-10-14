document.addEventListener("DOMContentLoaded", function () {
    // Array de nombres de las imágenes
    var images = ["1.jpg", "2.jpg", "3.jpg"];
  
    // Obtén la referencia al elemento con la clase "carousel-inner"
    var carouselInner = document.querySelector(".hero-c");
  
    // Recorre el array de imágenes y crea elementos <div> con las clases necesarias
    images.forEach(function (imageName, index) {
      var carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      carouselItem.classList.add("hero-carouserl");
      
      if (index === 0) {
        carouselItem.classList.add("active");
      }
  
      var img = document.createElement("img");
      img.classList.add("d-block", "w-100");
      img.src = "HomeNews/" + imageName;
      img.alt = "Imagen " + (index + 1);
  
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    });
  });
  