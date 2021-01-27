var cnv,ctx
var W=2200,H=1200
function find_border(p){
	function cross(a,b){
		return a.x*b.y-b.x*a.y
	}
	border=[]
	c={x:Infinity,y:0}
	for (var e of p){
		if (e.x<c.x){
			c=e
		}
	}
	border.push(c)
	while (true){
		var n=null
		for (var op of p){
			if (op==c){continue}
			if (n==null||((n.x-c.x)*(op.y-c.y)-(op.x-c.x)*(n.y-c.y))<0){
				n=op
			}
		}
		border.push(n)
		c=n
		if (c.x==border[0].x&&c.y==border[0].y){
			break
		}
	}
	return border
}
function init(){
	cnv=document.createElement("canvas")
	cnv.width=W
	cnv.height=H
	document.body.appendChild(cnv)
	ctx=cnv.getContext("2d")
	pts=[]
	buffor=30
	for (var i=0;i<1000;i++){
		pts.push({x:parseInt(Math.random()*(W-2*buffor)+buffor),y:parseInt(Math.random()*(H-2*buffor)+buffor)})
	}
	var b=find_border(pts)
	draw(pts,b)
}
function draw(p,b){
	console.log("DRAW")
	ctx.fillStyle="#000000"
	ctx.fillRect(0,0,cnv.width,cnv.height)
	ctx.lineWidth=5
	ctx.strokeStyle="#2a61d2"
	ctx.beginPath()
	ctx.moveTo(b[0].x,b[0].y)
	for (var vi=1;vi<=b.length;vi++){
		var v=b[vi%b.length]
		ctx.lineTo(v.x,v.y)
	}
	ctx.stroke()
	ctx.lineWidth=1
	ctx.strokeStyle="#ffffff"
	ctx.fillStyle="#4cb437"
	for (var v of p){
		ctx.beginPath()
		ctx.arc(v.x,v.y,7,0,Math.PI*2)
		if (b.includes(v)){
			ctx.fill()
		}
		else{
			ctx.globalAlpha=0.1
			ctx.stroke()
			ctx.globalAlpha=1
		}
	}
}
document.addEventListener("DOMContentLoaded",init,false)