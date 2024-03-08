class Star {
  xPos: number;
  yPos: number;
  outOfBounds: boolean;
  direction: number;
  progress: number;
  velocity: number;

  constructor(xPos: number, yPos: number, direction: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.direction = direction;
    this.outOfBounds = false;
    this.progress = 0;
    this.velocity = 1;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";

    const prevXPos = this.xPos;
    const prevYPos = this.yPos;

    this.xPos +=
      Math.sin(this.direction) * ((this.velocity * this.progress) / 50);
    this.yPos +=
      Math.cos(this.direction) * ((this.velocity * this.progress) / 50);
    this.progress++;

    ctx.beginPath();
    ctx.moveTo(prevXPos, prevYPos);
    ctx.lineTo(this.xPos, this.yPos);
    ctx.stroke();
  }
}

export class StarField {
  ctx: CanvasRenderingContext2D;
  displayWidth: number;
  displayHeight: number;

  centerX: number;
  centerY: number;
  starAmount: number = 200;
  stars: Array<Star> = [];

  constructor(
    ctx: CanvasRenderingContext2D,
    displayWidth: number,
    displayHeight: number,
  ) {
    this.ctx = ctx;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.centerX = this.displayWidth / 2;
    this.centerY = this.displayHeight / 2;

    for (let i = 0; i < this.starAmount; i++) {
      const starXPos =
        this.centerX + Math.sin(Math.random() * (this.displayWidth / 10));
      const starYPos =
        this.centerY + Math.cos(Math.random() * (this.displayHeight / 10));
      this.stars.push(
        new Star(
          starXPos,
          starYPos,
          Math.atan2(starYPos - this.centerY, starXPos - this.centerX),
        ),
      );
    }
  }

  public draw() {
    this.stars.forEach((star) => {
      star.draw(this.ctx);
      if (
        star.yPos < 0 ||
        star.yPos > this.displayHeight ||
        star.xPos < 0 ||
        star.xPos > this.displayWidth
      ) {
        star.outOfBounds = true;
      }
    });

    this.stars = this.stars.filter((star) => !star.outOfBounds);

    for (let i = 0; i < this.starAmount - this.stars.length; i++) {
      const starXPos =
        this.centerX + Math.sin(Math.random() * (this.displayWidth * 0.05));
      const starYPos =
        this.centerY + Math.cos(Math.random() * (this.displayHeight * 0.05));
      this.stars.push(
        new Star(
          starXPos,
          starYPos,
          Math.atan2(starYPos - this.centerY, starXPos - this.centerX),
        ),
      );
    }
  }
}
