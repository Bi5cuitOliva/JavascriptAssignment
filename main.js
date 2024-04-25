function updateTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    
    hours = (hours<10) ? "0" + hours : hours;
    minutes = (minutes<10) ? "0" + minutes : minutes;
    seconds = (seconds<10) ? "0" + seconds : seconds; 
  
    document.querySelector('.time-number[data-time="hours"]').innerHTML = hours;
    document.querySelector('.time-number[data-time="minutes"]').innerHTML = minutes;
    document.querySelector('.time-number[data-time="seconds"]').innerHTML = seconds;
  }
  
  updateTime();
  setInterval(updateTime, 1000);

// Weather API endpoint
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'c7f7832141ea42bb815834cb6c1fd2aa';

// Function to fetch weather information
async function fetchWeather(city) {
  try {
    const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Function to update weather information in the UI
async function updateWeather(units = 'metric') {
  const city = 'Parklands'; // Example city
  const weatherData = await fetchWeather(city, units);
  if (weatherData) {
    let temperature = weatherData.main.temp;
    let unitSymbol = '°C';

    if (units === 'imperial') {
      // Convert temperature to Fahrenheit if imperial units are selected
      temperature = (temperature * 9) / 5 + 32;
      unitSymbol = '°F';
    }

    const description = weatherData.weather[0].description;
    document.getElementById('weather').textContent = `The weather is ${description} in ${city} and it's ${temperature}${unitSymbol} outside.`;
  } else {
    document.getElementById('weather').textContent = 'Failed to fetch weather data';
  }
}

// Function to handle radio button change event
function handleUnitChange(event) {
  if (event.target.id === 'celsius') {
    updateWeather('metric');
  } else if (event.target.id === 'fahr') {
    updateWeather('imperial');
  }
}

// Add event listener for radio button change event
const celsiusRadioButton = document.getElementById('celsius');
const fahrRadioButton = document.getElementById('fahr');
celsiusRadioButton.addEventListener('change', handleUnitChange);
fahrRadioButton.addEventListener('change', handleUnitChange);

// Update weather information on page load with default units
updateWeather();



document.addEventListener("DOMContentLoaded", function() {
    const imageFilenames = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const slideshowImage = document.getElementById('slideshow-image');
    let currentIndex = 0;
  
    // Function to update the slideshow image
    function updateSlideshow(index) {
      slideshowImage.src = `assets/gallery/${imageFilenames[index]}`;
      currentIndex = index;
    }
  
    // Create thumbnails and add click event listener
    imageFilenames.forEach((filename, index) => {
      const img = document.createElement('img');
      img.src = `assets/gallery/${filename}`;
      img.alt = 'Gallery Image';
      img.addEventListener('click', () => updateSlideshow(index)); // Add click event listener
      thumbnailsContainer.appendChild(img);
    });
  
    // Button click event listener
    updateButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imageFilenames.length;
      updateSlideshow(currentIndex);
    });
  
    // Update slideshow initially
    updateSlideshow(currentIndex);
});


document.addEventListener("DOMContentLoaded", function() {
  // Array of product filenames for each category
  const allProducts = ['img6.png','img1.png', 'img2.png', 'img3.png','img5.png','img4.png',];
  const paidProducts = ['img6.png', 'img1.png','img3.png','img4.png'];
  const freeProducts = ['img2.png','img5.png'];

  // Get the products area container
  const productsArea = document.querySelector('.products-area');

  // Function to populate the products area with images based on the selected filter
  function displayProducts(products) {
      // Clear the products area
      productsArea.innerHTML = '';

      // Loop through the product filenames array
      products.forEach(filename => {
          // Create an <img> element
          const img = document.createElement('img');
          // Set the src attribute to the filename
          img.src = `assets/products/${filename}`;
          // Set alt attribute for accessibility
          img.alt = 'Product Image';

          // Append the <img> element to the products area
          productsArea.appendChild(img);
      });
  }

  // Get the radio inputs
  const allRadio = document.getElementById('all');
  const paidRadio = document.getElementById('paid');
  const freeRadio = document.getElementById('free');

  // Add event listeners to radio inputs
  allRadio.addEventListener('change', () => displayProducts(allProducts));
  paidRadio.addEventListener('change', () => displayProducts(paidProducts));
  freeRadio.addEventListener('change', () => displayProducts(freeProducts));

  // Initially display all products
  displayProducts(allProducts);
});

document.addEventListener("DOMContentLoaded", function() {
  const productsArea = document.querySelector('.products-area');
 
  async function displayProducts(products) {
       productsArea.innerHTML = '';
       products.forEach(product => {
           const productDiv = document.createElement('div');
           productDiv.classList.add('product-item');
 
           const img = document.createElement('img');
           img.src = product.image;
           img.alt = product.title;
           productDiv.appendChild(img);
 
           // Create a div for product details
           const productDetails = document.createElement('div');
           productDetails.classList.add('product-details');
           
 
           // Create and append the title element to productDetails
           const title = document.createElement('h3');
           title.textContent = product.title;
           title.classList.add('product-title');
           productDetails.appendChild(title);
 
           // Create and append the author element to productDetails
           const author = document.createElement('p');
           author.textContent = `${product.author}`;
           author.classList.add('product-author');
           productDetails.appendChild(author);
 
           // Create and append the price element to productDetails
           const priceTitle = document.createElement('p');
           priceTitle.textContent = 'Price: ';
           priceTitle.classList.add('price-title'); // Add class 'price-title'
           productDetails.appendChild(priceTitle);

           // Create and append the price value element to productDetails
           const productPrice = document.createElement('span');
           if (product.price === 0) {
               productPrice.textContent = 'Free';
           } else {
               // Otherwise, format the price to two decimal places
               productPrice.textContent = `$${parseFloat(product.price).toFixed(2)}`;
           }
           productPrice.classList.add('product-price'); // Add class 'price-value'
           productDetails.appendChild(productPrice);

           // Append productDetails to productDiv
           productDiv.appendChild(productDetails);

           // Append the productDiv to the products area
           productsArea.appendChild(productDiv);
       });
 }

  async function fetchAndDisplayProducts(filter) {
      try {
          const response = await fetch('assets/json/products.json');
          const products = await response.json();

          if (filter === 'all') {
              displayProducts(products);
          } else {
              const filteredProducts = products.filter(product => {
                  if (filter === 'paid' && product.price > 0) {
                      return true;
                  } else if (filter === 'free' && product.price === 0) {
                      return true;
                  }
                  return false;
              });
              displayProducts(filteredProducts);
          }
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  }

  const allRadio = document.getElementById('all');
  const paidRadio = document.getElementById('paid');
  const freeRadio = document.getElementById('free');

  allRadio.addEventListener('change', () => fetchAndDisplayProducts('all'));
  paidRadio.addEventListener('change', () => fetchAndDisplayProducts('paid'));
  freeRadio.addEventListener('change', () => fetchAndDisplayProducts('free'));

  fetchAndDisplayProducts('all');
});

document.addEventListener('DOMContentLoaded', function() {
  const openNavMenu = document.getElementById('open-nav-menu');
  const closeNavMenu = document.getElementById('close-nav-menu');
  const navMenu = document.querySelector('.wrapper');
  const navItems = document.querySelectorAll('.wrapper ul li a'); // Select all menu items

  // Function to open the navigation menu
  function openMenu() {
      navMenu.classList.add('nav-open');
  }

  // Function to close the navigation menu
  function closeMenu() {
      navMenu.classList.remove('nav-open');
  }

  // Function to close the navigation menu when a menu item is clicked
  function closeMenuOnClick() {
      closeMenu();
  }

  // Add event listeners
  openNavMenu.addEventListener('click', openMenu);
  closeNavMenu.addEventListener('click', closeMenu);

  // Add event listener to each menu item to close the menu when clicked
  navItems.forEach(item => {
      item.addEventListener('click', closeMenuOnClick);
  });
});

  
  