
const cvs = document.getElementById("lifeStart");
const ctx = cvs.getContext("2d");
const box = 20;

let canChange = true;
let board = [];

setBoard();
draw();
let game = setInterval(draw,100);

cvs.addEventListener("mousemove",function(e)
{
  if(canChange)
  {
      getMouse(cvs,e);
  }
});

let isDown = false;
cvs.addEventListener("mousedown",(e)=>
{
    if(canChange)
    {
      isDown = true;
      getMouse(cvs,e);
    }
});

document.addEventListener("mouseup",(e)=>
{
    isDown = false;
    prev =-1;
});

function life()
{
  let tb = [];
  for(let i =0; i < (cvs.width-box*2)/box; i++)
  {
    for(let j =0; j < (cvs.width-box*2)/box; j++)
    {
        let numAlive = 0;
        let adjust = ((cvs.width-box*2)/box);
        let k = i*adjust + j;

        //we need to get the life values of surrounding cells
        for(let a = -1; a <= 1; a++)
        {
            for(let b =-1; b <= 1; b++)
            {
                if(a !=0 || b !=0)
                {
                  let temp = (i+a)*adjust+(j+b);
                  if(temp >=0 && temp < board.length)
                  {
                    if(board[temp].alive)
                      numAlive++;
                  }
                }
            }
        }



      //rules for conways game
        if(numAlive == 3 && !board[k].alive)
            tb[k] = true;
        else if((numAlive < 2 || numAlive > 3) && board[k].alive)
            tb[k] = false;
        else
            tb[k] = board[k].alive;
    }
  }



  for(let i =0; i < (cvs.width-box*2)/box; i++)
  {
    for(let j =0; j < (cvs.width-box*2)/box; j++)
    {
        let m = i*((cvs.width-box*2)/box) + j;
        board[m].alive = tb[m];
    }
  }

}

function setBoard()
{
  for(let i =0; i < (cvs.width-box*2)/box; i++)
  {
    for(let j =0; j < (cvs.width-box*2)/box; j++)
    {
        let k = i*((cvs.width-box*2)/box) + j;
        board[k] =
        {
          x : (box/2)+ box*i + box,
          y : (box/2)+ box*j + box,
          alive : false
        }
    }
  }
}


function start(buttonId)
{
    let change = document.getElementById(buttonId);
    if(change.innerHTML == "Start")
    {
        change.innerHTML = "Restart";
        canChange = false;
    }
    else
    {
        setBoard();
        change.innerHTML = "Start";
        canChange = true;
    }
}

let prev = -1;
function getMouse(canvas,event)
{
    if(isDown)
    {
      let rect = canvas.getBoundingClientRect();
      let xPos = Math.floor((event.clientX-rect.left-box)/box);
      let yPos = Math.floor((event.clientY-rect.top-box)/box);

      if(xPos >= 0 && xPos < (canvas.width-box*2)/box && yPos >= 0 && yPos<(canvas.height-box*2)/box)
      {
        let i = Math.floor(xPos*((cvs.width-box*2)/box)) + yPos;

        if(prev != i)
        {

          if(prev != -1 && board[i].alive)
          {
            board[prev].alive = false;
            ctx.fillStyle = "white";
            ctx.fillRect(board[prev].x-(box/2), board[prev].y-(box/2), box,box);
            ctx.strokeStyle = "black";
            ctx.strokeRect(board[prev].x-(box/2),board[prev].y-(box/2),box,box);
          }
          board[i].alive = !board[i].alive;
          ctx.fillStyle = (board[i].alive)? "black" : "white";
          ctx.fillRect(board[i].x-(box/2), board[i].y-(box/2), box,box);

          ctx.strokeStyle = "black";
          ctx.strokeRect(board[i].x-(box/2),board[i].y-(box/2),box,box);
          prev =i;
        }
        }
      }


}


function draw()
{
   if (!canChange)
      life();

   ctx.fillStyle = "white";
   ctx.fillRect(box,box, cvs.width-box, cvs.height-box);

   for(let i =0; i < board.length; i++)
   {
      ctx.fillStyle = (board[i].alive)? "black" : "white";
      ctx.fillRect(board[i].x-(box/2), board[i].y-(box/2), box,box);

      ctx.strokeStyle = "black";
      ctx.strokeRect(board[i].x-(box/2),board[i].y-(box/2),box,box);
   }
}
