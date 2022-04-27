// var myList = document.getElementById('myList');
// myList.addEventListener('click', function(e) {
//     if ( e.target.tagName.toLowerCase() === 'li' ) {
//     console.log(e.target.textContent);
// }
// }, false);
// var newList = document.createElement('li');
// var textNode = document.createTextNode("hello cgu!");
// newList.appendChild(textNode);
// myList.appendChild(newList);
var textNode = document.createTextNode("hello cgu!");
$(document).ready(function(){
    txt = "<li>hello cgu!</li>";
    $("#myList").click(function(){
        $("#myList").append(txt);
        console.log($("ul li:last").text());
    });
});
