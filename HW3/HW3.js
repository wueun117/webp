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