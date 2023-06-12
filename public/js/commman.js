const inputFields = document.querySelectorAll(".savedInput");
                    
// Loop through each input field and retrieve its value from local storage
inputFields.forEach((input) => {
  const savedInput = localStorage.getItem("savedInput");
  if (savedInput) {
    input.value = savedInput;
  }
});