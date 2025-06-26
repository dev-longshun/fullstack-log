const canvas = document.getElementById('c');
const ctx     = canvas.getContext('2d');
let   W, H;

function resize(){
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize(); window.addEventListener('resize', resize);

/* 生成粒子数组 */
const N = 20;                      // 彩片数量
const colors = ['#ff5b5b','#ffd600','#4db6ff','#52ff9c','#ff8af6'];
const pieces = Array.from({length:N}, () => ({
  x: Math.random()*W,
  y: Math.random()*-H,              // 从屏幕上方生成
  w: 8 + Math.random()*8,           // 宽
  h: 4 + Math.random()*8,           // 高
  r: Math.random()*360,             // 旋转角
  vr: -6 + Math.random()*12,        // 旋转速度
  vy: 2 + Math.random()*3,          // 垂直速度
  vx: -2 + Math.random()*4,         // 水平速度
  color: colors[Math.floor(Math.random()*colors.length)]
}));

function update(){
  ctx.clearRect(0,0,W,H);
  pieces.forEach(p=>{
    p.y += p.vy;
    p.x += p.vx;
    p.r += p.vr;
    if(p.y > H+20){ p.y = -10; p.x = Math.random()*W; }  // 重新从顶部循环
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r*Math.PI/180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
    ctx.restore();
  });
  requestAnimationFrame(update);
}
update();