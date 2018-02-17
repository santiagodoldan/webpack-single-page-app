export class BaseComponent {

  public static get className(): string {
    throw new Error("Abstract getter")
  }

  public static register() {
   const components = Array.from(document.getElementsByClassName(this.className))

    /* tslint:disable-next-line */
    components.forEach((component: HTMLElement) => {
      (new this(component)).init()
    })
  }

  public node: HTMLElement

  public constructor(node: HTMLElement) {
    this.node = node
  }

  public init(): void {
    throw new Error("Abstract method")
  }

  public setStyles(target: HTMLElement, styles: string): void {
    target.setAttribute("style", styles)
  }

  public swapClasses(target: HTMLElement, oldClass: string, newClass: string): void {
    target.classList.remove(oldClass)
    target.classList.add(newClass)
  }

}
