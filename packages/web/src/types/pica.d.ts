declare module 'pica/dist/pica' {
  export default class Pica {
    resize(from: HTMLImageElement, to: HTMLCanvasElement): Promise<HTMLCanvasElement>
  }
}
