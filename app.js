const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2e3131";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// context : how we manipulate pixels inside of the canvas
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

ctx.lineWidth = 2.5;
 
let painting =false;
let filling = false;
function startPainting(){
    painting=true;
}
function stopPainting(){
    painting=false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting=true;
}

function handleClickColor(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleChangeRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if(filling === true){
        filling=false;
        mode.innerText="paint";
    }else{
        filling=true;
        mode.innerText="fill";
    }
}

function handleCanvas(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
//prevent clicking right side of mouse
function handleCM(event){
    event.preventDefault();
}

function handleClickSave(){
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
    const image = canvas.toDataURL("");
    const link = document.createElement("a");
    link.href = image;
    link.download = "wow";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvas);
    canvas.addEventListener("contextmenu",handleCM);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click", handleClickColor));

if(range){
    range.addEventListener("input",handleChangeRange);
}

if(mode){
    mode.addEventListener("click",handleMode);
}

if(save){
    save.addEventListener("click",handleClickSave);
}