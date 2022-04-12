for(let i=0;i<100;i++)
{
    setTimeout(randomString,400*i);
}

document.addEventListener('keydown',comparision)

function randomString() 
{ 
    var target = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",a = target.length,b = "";
    for (i = 0; i < 1; i++) 
    {
        b += target.charAt(Math.floor(Math.random() * a));
    }
    Ques.textContent=b+Ques.textContent;
}

function comparision(word)
{
    input.textContent+=word.key;
    for(let i=0;i<1;i++)
    {
        if(Ques.textContent.slice(-1)==word.key)
        {
            Ques.textContent=Ques.textContent.slice(0,-1);
        }
        else{
            randomString();
        }
    }
}

$
(document).ready
(function(){
 // Start animation

$
("#start").click
(function(){

$
("img").animate({left
: "+=150px"}, 2000);
 });
 // Stop running animation

$
("#stop").click
(function(){

$
("img").stop();
 });

 // Start animation in the opposite direction

$
("#back").click
(function(){

$
("img").animate({left
: "-=150px"}, 2000);
 });
 // Reset to default

$
("#reset").click
(function(){

$
("img").animate({left
: "0"}, "fast");
 });
});

$(document).ready(function(){
    $("#small").click(function(){
    $("p").animate({width: "50%"})
    .animate({fontSize: "36px"})
    .animate({borderWidth: 20});
    });
   }); 