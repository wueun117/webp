document.addEventListener('keydown',putout); 
var keyin;

function putout()
{
    keyin = document.getElementById("text").value;
    document.getElementById("顯示螢幕").innerText = keyin;
    setTimeout(putout,10);
}