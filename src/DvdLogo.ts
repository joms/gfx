import imgUrl from "./assets/DVD_logo.svg.png";
const COLORS = ["#FF00FF", "red", "blue"];

export class DvdLogo {
  ctx: CanvasRenderingContext2D;
  displayWidth: number;
  displayHeight: number;

  img: HTMLImageElement;
  height = 25;
  width = 25;

  yPos: number;
  xPos: number;

  color = "#ff00ff";

  yDirection: "UP" | "DOWN" = Math.random() > 0.5 ? "UP" : "DOWN";
  xDirection: "LEFT" | "RIGHT" = Math.random() > 0.5 ? "LEFT" : "RIGHT";

  constructor(
    ctx: CanvasRenderingContext2D,
    displayWidth: number,
    displayHeight: number,
  ) {
    this.ctx = ctx;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.xPos = displayWidth / 2;
    this.yPos = displayHeight / 2;
    this.img = new Image();
    this.img.src = imgUrl;
    this.img.onload = () => {
      this.width = this.img.width / 12;
      this.height = this.img.height / 12;
    };
  }

  setRandomColor() {
    const availableColors = COLORS.filter((c) => c !== this.color);

    this.color =
      availableColors[Math.floor(Math.random() * availableColors.length)];
  }

  public draw() {
    this.ctx.drawImage(this.img, this.xPos, this.yPos, this.width, this.height);

    if (this.xDirection === "RIGHT") {
      this.xPos += 1;
    } else {
      this.xPos -= 1;
    }

    if (this.yDirection === "DOWN") {
      this.yPos += 1;
    } else {
      this.yPos -= 1;
    }

    if (this.yPos < 0) {
      this.yDirection = "DOWN";
      this.setRandomColor();
    }

    if (this.yPos + this.height > this.displayHeight) {
      this.yDirection = "UP";
      this.setRandomColor();
    }

    if (this.xPos < 0) {
      this.xDirection = "RIGHT";
      this.setRandomColor();
    }

    if (this.xPos + this.width > this.displayWidth) {
      this.xDirection = "LEFT";
      this.setRandomColor();
    }
  }
}
