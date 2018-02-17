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

  public static appendTemplateToById(container: HTMLElement, id: string): HTMLElement {
    const identifier = Math.round(Math.random() * 10000000)
    const template   = this.getTemplateById(id).content

    template
      .firstElementChild
      .setAttribute("componentid", identifier.toString())

    container.appendChild(template)

    return container.querySelector(`[componentid="${identifier}"]`)
  }

  public static getTemplateById(id: string): HTMLTemplateElement {
    const template = document.querySelector(`#${id}`).cloneNode(true) as HTMLTemplateElement

    if (!template) {
      throw new Error(`Missing template ${id}`)
    }

    return template
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
