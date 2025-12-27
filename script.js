// Booking-Ruqaya
document.addEventListener('DOMContentLoaded',function(){

    // To choose a Seat
const seats=document.querySelectorAll('.row li:not(#booked)');
seats.forEach(seat=>{
seat.addEventListener('click',function(){
    if (seat.classList.contains('selected')){
        seat.classList.remove('selected');
        seat.style.backgroundColor='rgb(166,137,107)';
     }
    else{
        seat.classList.add('selected');
        seat.style.backgroundColor='rgb(255,179,71)';         
    }
      });
  });


    // To select day and date
      const days=document.querySelectorAll('.Calendar li');
      days.forEach(day=>{
          day.addEventListener('click',function(){
    // remove selection from all days
              days.forEach(d=>{
                  d.classList.remove('selected');
                  d.style.backgroundColor='';
                  d.style.color='';
          });
              day.classList.add('selected');
              day.style.backgroundColor='rgb(255,179,71)';
              day.style.color='rgb(89,51,34)';
              day.style.padding='0.5rem'
              selectedDay=day;
      });
  });
          // Error Messages
          const form=document.querySelector('#form');
          const nameInput=document.querySelector('#name');
          const numberInput=document.querySelector('#number');
          const emailInput=document.querySelector('#email');
          form.addEventListener('submit',function(e){
              e.preventDefault();

              form.querySelectorAll('.error-message').forEach(el=>el.remove());
              let hasError=false;

              function showError(input, message){
                  const error=document.createElement('p');
                  error.textContent=message;
                  error.classList.add('error-message');
                  error.style.color='red';
                  error.style.fontSize='0.9vw';
                  error.style.fontFamily='FontThree';
                  input.parentElement.appendChild(error);
              }

              if(nameInput.value.trim()===''){
                  showError(nameInput,'Please enter your name!');
                  hasError=true;
              }

              if(numberInput.value.trim()===''||isNaN(numberInput.value)){
                  showError(numberInput,'Please enter a Valid number!');
                  hasError=true;
              }

              const emailPattern= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
              if(!emailPattern.test(emailInput.value.trim())){
                  showError(emailInput,'Please enter a valid email!');
                  hasError=true;
              }
              if(!hasError){
                  form.reset();

              //clear selected
              const movieInput =document.querySelector('input[list="filmlist"]');
              if(movieInput){
                movieInput.value='';
              }
              const selectedDate=document.querySelector('.Calendar .selected');
              if(selectedDay){
                selectedDay.classList.remove('selected');
                selectedDay.style.backgroundColor='';
                selectedDay.style.color='';
                selectedDay.style.padding='';
              }
              const seat=document.querySelectorAll('.row li.selected');
              seat.forEach(seat=>{
                seat.classList.remove('selected');
                seat.style.backgroundColor='rgb(166,137,107)';
              });
              const selectedWay=document.querySelector('input[name="way"]:checked');
              if(selectedWay){
                selectedWay.checked=false;
              };
              alert("Booking Successful!");
            }
  });
});
// Amjaad-Movies
function goToTicket() {
    window.location.href = "booking.html";
  }
function openModal(title, desc, videoPath, audioPath) {
  
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;
  
    // To download the video
    const video = document.getElementById("modalTrailer");
    video.src = videoPath;
    video.load();
  
    // To download the audio
    const audio = document.getElementById("modalAudio");
    audio.src = audioPath;
    audio.load();
  
    // To display the model
    document.getElementById("movieModal").style.display = "flex";
  
    // To display the booking button that will link to another webpage
    document.getElementById("ticketButton").style.display = "block";
  }
function closeModal() {
    // to remove the modal
    document.getElementById("movieModal").style.display = "none";
    // To remove the booking button
    document.getElementById("ticketButton").style.display = "none";
    const video = document.getElementById("modalTrailer");
    video.pause();  // To stop the video after click on closing button
    video.currentTime = 0;  // To repeat the video to the beginning

    // To stop the audio
    const audio = document.getElementById("modalAudio");
    audio.pause();  // To stop the audio after the click on the closing button
    audio.currentTime = 0;  // To repeat the audio to the beginning
}
// Walaa-Home
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-home img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('closeBtn');
  
    images.forEach(img => {
      img.addEventListener('click', () => {
        const fullImage = img.getAttribute('data-full');
        lightboxImg.src = fullImage;
        lightbox.style.display = 'flex';
      });
    });
  
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    });
});
  
// Khawla-Snacks
//insert an array to store item that the user adds to the cart
let cart= [];
//function to add a product to the cart when the user click to the button
function AddToCart(productName,event){
    const button= event.currentTarget;
    const buttonText=button.querySelector('.buttontext');
    const circle= button.querySelector('.circle');
//add class to activate a visual effect when adding the product
    button.classList.add("added");
//temporarily hide the bottun after clicking on it
    setTimeout(()=>{
        button.style.display="none";},
    800);
    //show the bottun again after a short time
    setTimeout(()=>{
        button.style.display="flex";
    button.classList.remove("added")},
    1200);

//get the parent element to access the selected size
    const wrapper= button.closest('.Wrapper1');
    const selectElement= wrapper.querySelector('select');
    const selectedSize= selectElement.value;
//check if a size was selected before adding to cart
    if (!selectedSize||selectedSize==="choose the size") {
        alert("please chose size")
        return;
    }
    //get the price based on the selected size
    let price=getPriceFromSize(selectElement,selectedSize);
    //add the product to the cart
    cart.push({name: productName, size: selectedSize, price: price});
    //update the cart display on the page
    updateCart();
}
//function to get the price from the selected option in the dropdown 
function getPriceFromSize(selectElement,selectedSize){
        const selectedOption= selectElement.querySelector(`option[value="${selectedSize}"]`);
        if (selectedOption){
            const match= selectedOption.textContent.match(/([\d.]+)\s*BD/);
            if (match){
                //convert the price to a decimal number
                return parseFloat(match[1]); }
        }
        //return 0 if the price could not found
        return 0;
}
//function to update the cart display and total price
function updateCart(){
    const cartItemList= document.getElementById("cartitems");
    const totalPrice= document.getElementById("total-price");
    //clear old cart items before re-display them
    cartItemList.innerHTML="";

    let total=0;
    cart.forEach(item =>{
        //creat an {li} fro each product in the cart and display it
    const li= document.createElement("li");
    li.textContent=`${item.name} - ${item.size} - ${item.price} BD`;
    cartItemList.appendChild(li);
    //add up price to calculate the total
    total+= item.price;
     });
     //display the total price on the page
     totalPrice.textContent=`Total: ${total.toFixed(2)} BD`;
     //print the cart content to the consol 
     console.log(cart);
}
//function to show or hide the cart box when the cart button click
function toggleCart(){
    const cartBox= document.getElementById("cartbox");
    cartBox.style.display= cartBox.style.display=== "none"? "block": "none";
}


//offers Page-Amna
let currentIndex = 0;
const couponContainer = document.querySelector('.coupon-container');
const coupons = document.querySelectorAll('.coupon');
const totalCoupons = coupons.length;
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

// Add mouse pull function
let isDragging = false;
let startX;
let scrollLeft;
let moved = false;


couponContainer.addEventListener('mousedown', (e)=> {
  isDragging = true;
  moved = false;
  startX = e.pageX - couponContainer.offsetLeft;
  scrollLeft = couponContainer.scrollLeft;
});

couponContainer.addEventListener('mouseleave', ()=> {
isDragging = false
});
couponContainer.addEventListener('mouseup', ()=> {
  isDragging = false
});
couponContainer.addEventListener('mousemove', (e)=> {
      if (!isDragging ) return;
      e.preventDefault();
      const x = e.pageX - couponContainer.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) moved = true;
      couponContainer.scrollLeft = scrollLeft - walk;
});
      
// Update the slider when clicking the arrows
leftArrow.addEventListener('click', ()=>{
  currentIndex--;
  if (currentIndex < 0) currentIndex = totalCoupons - 1;
  updateSlider();
});     
rightArrow.addEventListener('click', ()=>{
  currentIndex++;
  if (currentIndex >= totalCoupons) currentIndex = 0;
  updateSlider();
}); 
// update slider   
function updateSlider(){
  const offset = -(currentIndex * 270); 
  couponContainer.style.transform = `translateX(${offset}px)`;

}

coupons.forEach(coupon => {
  coupon.addEventListener('click', () => {
    if (moved) return;
  const imgSrc = coupon.getAttribute('data-img'); 
  modal.style.display = "block";
  modalImg.src = imgSrc;
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = "none";  
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none"; 
  }
});

function toggleAccordion(header) {
const content = header.nextElementSibling;
const arrow =  header.querySelector(".arrow-btn");
content.classList.toggle('open');
// Toggle between down (▼) and up (▲) arrows when interacting
arrow.textContent = content.classList.contains("open")? "▲" : "▼";
} 

 
 
  
 





