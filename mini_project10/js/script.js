let myText = document.getElementById("my-text");
let result = document.getElementById("result");
let limit = 60;
result.textContent = 0 + "/" + limit;

myText.addEventListener("input", function(){
    let textLength = myText.value.length;
    // console.log(textLength);
    result.textContent = textLength + "/" + limit;

    if(textLength > limit) {
      myText.style.borderColor = "#ff2851";
      result.style.color = "#ff2851";
    }
    else {
      myText.style.borderColor = "#b2b2b2";
      result.style.color = "#737373";
    }
});