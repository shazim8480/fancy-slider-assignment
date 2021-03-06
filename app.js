const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

const getImages = (query) => {
  toggleFunction();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(error => displayError("Sorry,failed to load data..please try again later!"))
}

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  toggleFunction();
  gallery.innerHTML = '';
  images.forEach(image => {
    // show gallery title
    galleryHeader.style.display = 'flex';
    //  //
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img id="image-thumbnail" class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);

  })

}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    toggleSelect(true);
  } else {
    toggleSelect(false);
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // create slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image area
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  if (duration > 0) {
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
      sliderContainer.appendChild(item);
    })
    changeSlide(0);
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  } else {
    alert("please put a valid duration!!");
    imagesArea.style.display = 'block';
  }

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value);
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider();
})

// toggle function //
const toggleFunction = () => {
  const spinner = document.getElementById("spinner-load");
  const images = document.getElementById("image-container");
  spinner.classList.toggle('d-none');
  images.classList.toggle('d-none');
}
const toggleSelect = (show) => {
  let imageThumb = document.getElementById("image-thumbnail");
  if (show) {
    imageThumb.classList.add('added');
  } else {
    imageThumb.classList.remove('added');
  }
}
// let toggleImage = document.getElementById("image-thumbnail")
// toggleImage.addEventListener("click", function () {
//   toggleSelect(true);
//   toggleSelect(false);
// })
// Enter key trigger search//
let searchButton = document.getElementById("search-btn");
let searchField = document.getElementById("search");
searchField.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});
// // error function //
const displayError = error => {
  const errorTag = document.getElementById("error-message");
  errorTag.innerText = error;
}