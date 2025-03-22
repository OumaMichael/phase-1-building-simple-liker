// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


// When the DOM loads, hide the error modal and attach event listeners.
document.addEventListener("DOMContentLoaded", () => {
  // Hide error modal initially (assumes an element with id="modal" exists)
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");

  // Select all heart elements (assumed to have class "like-glyph")
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      if (heart.innerText === EMPTY_HEART) {
        // Simulate a server call.
        mimicServerCall()
          .then(() => {
            // On success, change the heart to a full heart and add the activated class.
            heart.innerText = FULL_HEART;
            heart.classList.add("activated-heart");
          })
          .catch((error) => {
            // On failure, display the error modal with the error message.
            modal.classList.remove("hidden");
            // Update the modal content. (If you have a designated element for the message, update that element instead)
            modal.innerText = error;

            // Hide the modal after 3 seconds.
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      } else {
        // If heart is already full, revert back to an empty heart.
        heart.innerText = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    });
  });
});





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
