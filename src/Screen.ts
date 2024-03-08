import { DvdLogo } from "./DvdLogo";
import { StarField } from "./StarField";

export class Screen {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  dvdLogo: DvdLogo;
  starField: StarField;

  constructor() {
    const canvas = document.getElementById(
      "display",
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      throw "Could not find canvas";
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw "Could not get 2D-context from canvas";
    }

    this.ctx = ctx;
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;

    this.dvdLogo = new DvdLogo(this.ctx, this.canvasWidth, this.canvasHeight);
    this.starField = new StarField(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight,
    );
  }

  private clear(backgroundColor: string) {
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.imageSmoothingEnabled = false;
  }

  public draw() {
    this.clear("white");
    this.starField.draw();
    this.dvdLogo.draw();

    window.requestAnimationFrame(() => this.draw());
  }
}
