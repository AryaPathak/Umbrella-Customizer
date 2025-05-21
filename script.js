//Fetching required elements
const umbrellaImage = document.getElementById("umbrellaImage");
const logoPreview = document.getElementById("logoPreview");

//Filename displayed on the upload button
document.getElementById('logoUpload').addEventListener('change', function(event) {
  const input = event.currentTarget;
  const textSpan = document.querySelector('.upload-text');
  
  if (input.files && input.files.length > 0) {
   
    textSpan.textContent = input.files[0].name;
  } else {
   
    textSpan.textContent = 'Upload Logo';
  }
});


const colorButtons = document.querySelectorAll(".color-btn");

const umbrellaImages = {
  blue: "images/blueUmbrella.png",
  pink: "images/pinkUmbrella.png",
  yellow: "images/yellowUmbrella.png",
};

// Handling color change of the umbrella
let logoUploaded = false;
const spinner = document.getElementById("spinner");


//As the color changes quickly, we need to show a spinner for 2.1 seconds manually to show the loading (Done intentionally to showcase the spinner)
// This is to simulate a loading time for the umbrella image
//In real applications, we can put actual loader when image is being fetched
// before showing the new umbrella image

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;

    if (logoUploaded) {              //If logo is uploaded, we need to show the spinner for 2.1 seconds
  // Hide umbrella + logo manually
  umbrellaImage.classList.add("hidden");
  logoPreview.style.display = "none";
  spinner.classList.remove("hidden");

  setTimeout(() => {
    umbrellaImage.src = umbrellaImages[color];

    spinner.classList.add("hidden");
    umbrellaImage.classList.remove("hidden");
    logoPreview.style.display = "block";

    document.body.style.backgroundColor =
      color === "blue"  ? "#e6f6fc" :
      color === "pink"  ? "#ffe6f3" :
                          "#fff8d6";
  }, 2100);
}
 else {                                                 // Instant change of colour if logo not uploaded
      umbrellaImage.src = umbrellaImages[color];
      document.body.style.backgroundColor =
        color === "blue"  ? "#e6f6fc" :
        color === "pink"  ? "#ffe6f3" :
                            "#fff8d6";
    }
  });
});


//Upload a logo and show it on the umbrella

logoUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 5 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onload = function (e) {

    //Confirm the initial position of the logo
    logoPreview.src = e.target.result;
    logoPreview.style.display = "block";
    logoPreview.style.left = "50%";
    logoPreview.style.top = "70%";
    logoPreview.style.transform = "translate(-50%, -50%)";
    logoUploaded = true; 
  };

    reader.readAsDataURL(file);
  } else {
    alert("Please upload a valid image under 5MB.");
  }
});


let isDragging = false;
let offsetX, offsetY;

// Making the logo draggable


//Grabbin the logo
logoPreview.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = logoPreview.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  logoPreview.style.cursor = "grabbing";
});


//Moving the logo

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const previewRect = document.querySelector(".umbrella-preview").getBoundingClientRect();
    const x = e.clientX - previewRect.left - offsetX;
    const y = e.clientY - previewRect.top - offsetY;

    logoPreview.style.left = `${x}px`;
    logoPreview.style.top = `${y}px`;
    logoPreview.style.transform = `translate(0, 0)`;
  }
});


//Releasing the logo

document.addEventListener("mouseup", () => {
  isDragging = false;
  logoPreview.style.cursor = "grab";
});
