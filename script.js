const c = document.querySelector('canvas')
const ctx = c.getContext('2d');
const m = [];

function setSize(){
  c.width = innerWidth;
  c.height = innerHeight;
  ctx.lineCap = "round";
}

setSize();
window.onresize = setSize;

for (let i=0; i<40; i++){
  m[i] = {x:c.width/2, y:c.height/1.33}
  m[i].moveX = gsap.quickTo(m[i], "x", { duration: 0.25+0.03*i, ease:'elastic.out('+(i/80)+')' });
  m[i].moveY = gsap.quickTo(m[i], "y", { duration: 0.25+0.03*i, ease:'elastic.out('+(i/80)+')' });
  gsap.to(m[i], {duration:1.1, y:c.height/4, ease:'elastic.out(0.7)', delay:0.0025*i})
}

gsap.ticker.add(update)

function update(){
	ctx.clearRect(0, 0, c.width, c.height)

  m.forEach((pt,i)=>{
    if (i==m.length-1) return;
    // ctx.lineWidth = 25+i*.05;
    // ctx.strokeStyle = '#555';
    // ctx.beginPath();
    // ctx.moveTo(m[i].x, m[i].y);
    // ctx.lineTo(m[i+1].x, m[i+1].y);
    // ctx.stroke();
    
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'hsl('+(350-i*.2)+',20%,'+(60-(i/50*25))+'%)';
    ctx.beginPath()
    ctx.arc(m[i].x-i*2*(0.5-m[i].x/innerWidth), m[i].y-i*4*(0.5-m[i].y/innerHeight), 50+i*.1, 0, 2*Math.PI)
    ctx.stroke()
  })
}

window.addEventListener("pointermove", (e) => {
  m.forEach(pt=>{
    pt.moveX(e.x)
    pt.moveY(e.y)
  })
});