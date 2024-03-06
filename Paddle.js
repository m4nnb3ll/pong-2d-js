"use strict"
import { mkGradient } from "./misc.js";

export class Paddle
{
	setup(canvas, side, strokeGradColors)
	{
		this.width = canvas.el.width / 28; // width
		this.height = this.width * 2.5; // height
		this.radius = canvas.el.width / 80; // radius
		this.lineWidth = canvas.el.width / 400; // line width
		this.x = side == 'r' ? (canvas.el.width - this.width) - (this.lineWidth + 10) : 0 + (this.lineWidth + 10);
		this.y = (canvas.el.height  - this.height) / 2;
		this.fillColor = '#000';
		this.strokeGradColors = strokeGradColors || this.strokeGradColors;
	}

	draw(canvas, user)
	{
		(user == 'player' && this.updatePaddlePos(canvas));
		canvas.ctx.lineJoin = 'round';
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(this.x + this.radius, this.y);
		canvas.ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.radius);
		canvas.ctx.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.radius);
		canvas.ctx.arcTo(this.x, this.y + this.height, this.x, this.y, this.radius);
		canvas.ctx.arcTo(this.x, this.y, this.x + this.width, this.y, this.radius);
		canvas.ctx.fillStyle = this.fillColor;
		canvas.ctx.strokeStyle = mkGradient(canvas, this.x, this.y, this.x, this.y + this.height, this.strokeGradColors[0], this.strokeGradColors[1]);
		canvas.ctx.lineWidth = this.lineWidth;
		canvas.ctx.fill();  // Fill the path with the specified color
		canvas.ctx.stroke();  // Stroke the path (border)
		canvas.ctx.closePath();
	}

	getStep(canvas)
	{
		return (canvas.el.height * 0.01);
	}

	updatePaddlePos(canvas)
	{
		// console.log("Canvas is: ", canvas);

		if (canvas.state.keyDown == 'ArrowUp' && this.y >= 0)
		{
			console.log("The y pos is: ", this.y);
			const newVal = this.y - this.lineWidth / 2 - this.getStep(canvas);
			if (newVal >= 0)
			{
				console.log("The newVal is: ", newVal);	
				this.y = newVal;
			}
			else
				this.y = 0 + this.lineWidth / 2;
		}
		else if (canvas.state.keyDown == 'ArrowDown')
		{
			const newVal = this.y + this.lineWidth / 2 + this.getStep(canvas);
			if (newVal <= canvas.el.height - this.height/*  - this.lineWidth */)
			{
				// console.log("The newVal is: ", newVal);	
				this.y = newVal;
			}
			else
				this.y = canvas.el.height - this.height - this.lineWidth / 2;
			// this.y = Math.max(this.y + this.getStep(), canvas.el.height - this.height - this.lineWidth * 2);
		}
			// this.y += this.getStep();
	}

	// move(keyEvent)
	// {
	// 	if (this.boundingRect)
	// 	{
	// 		let directionY = keyEvent.key == 'e' ? 1 : 'w' ? -1 : 0;
	// 		const { width: cw, height: ch } = canvas.getCanvasSize();
	// 		if (!directionY || this.y <= 0 || this.y >= ch + this.height + this.lineWidth * 2)
	// 		{
	// 			// console.log(`I enter here, directionY is: `, directionY);
	// 			// console.log(`this.y <= 0 || this.y >= canvas.style.height + this.height + this.lineWidth * 2: `, this.y, this.y >= canvas.style.height + this.height + this.lineWidth * 2);
	// 			return ;
	// 		}
	// 		// console.log("this.y before is: ", this.y);
	// 		// console.log("(canvas.style.height / canvas.dpr) * 0.1 * directionY;", canvas.style.height, canvas.dpr, directionY);
	// 		this.y += directionY;
	// 		// console.log("this.y after is: ", this.y);
	// 		// const newPos = (mouseEvent.clientY * canvas.dpr - this.height / 2) - this.boundingRect.top;
	// 		// this.y = (newPos < 0)
	// 		// 			? 0 // block paddle at top
	// 		// 			: newPos + (this.height + this.lineWidth) > canvas.el.height 
	// 		// 				? canvas.el.height  - (this.height + this.lineWidth) // block paddle at bottom
	// 		// 				: newPos;
	// 	}
	// }
}