"use strict"

export function	mkGradient(canvas, sx, sy, ex, ey, sc, ec)
{
	const grad = canvas.ctx.createLinearGradient(sx, sy, ex, ey);
	grad.addColorStop(0, sc);
	grad.addColorStop(1, ec);
	return (grad);
}

// draw a rectangle
export function drawRect(canvas, x, y, w, h, color)
{
    canvas.ctx.fillStyle = color;
    canvas.ctx.fillRect(x, y, w, h);
}
