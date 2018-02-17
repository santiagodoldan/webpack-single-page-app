export class BaseComponent {

  public static components: Array<typeof BaseComponent> = []

  /**
   * Each component MUST override this getter to let the `register()` function work correctly.
   */
  public static get className(): string {
    throw new Error("Abstract getter")
  }

  /**
   * Adds given component to be registered when DOM ready.
   */
  public static add(component: typeof BaseComponent): void {
    this.components.push(component)
  }

  /**
   * This looks over the DOM tree to find any element that could be a component,
   *   if it finds them, it creates the corresponding component object and then calls
   *   the `init()` funcion to initialize them.
   */
  public static register() {
   const components = Array.from(document.getElementsByClassName(this.className))

    /* tslint:disable-next-line */
    components.forEach((component: HTMLElement) => {
      (new this(component)).init()
    })
  }

  /**
   * A <template> tag with given `id` must be added to the DOM before to work correctly.
   *
   *  Example
   *
   *    In the markup
   *
   *      <template id="testing-template>
   *        ... tags goes here
   *      </template>
   *
   *    And then here
   *
   *      MyAwesomeComponent.appendTemplateToById(container, "testing-template")
   */
  public static appendTemplateToById(container: HTMLElement, id: string): HTMLElement {
    const identifier = Math.round(Math.random() * 10000000)
    const template   = this.getTemplateById(id).content

    template
      .firstElementChild
      .setAttribute("templateid", identifier.toString())

    container.appendChild(template)

    return container.querySelector(`[templateid="${identifier}"]`)
  }

  /**
   * This just returns the template for given id.
   */
  public static getTemplateById(id: string): HTMLTemplateElement {
    const template = document.querySelector(`#${id}`).cloneNode(true) as HTMLTemplateElement

    if (!template) {
      throw new Error(`Missing template ${id}`)
    }

    return template
  }

  // Component's DOM element
  public node: HTMLElement
  public componentid: string

  public constructor(node: HTMLElement) {
    this.node        = node
    this.componentid = Math.round(Math.random() * 10000000).toString()
  }

  /**
   * Here is where EACH component should initialize everything, that means bind all the events
   *   needed, populate any data and everything to have a usable component.
   */
  public init(): void {
    this.node.setAttribute("componentid", this.componentid)
  }

  //
  // Helper methods

  public destroy(): void {
    const ele = document.querySelector(`[componentid="${this.componentid}"]`)

    if (ele) {
      ele.remove()
    }
  }

  public setStyles(target: HTMLElement, styles: string): void {
    target.setAttribute("style", styles)
  }

  public swapClasses(target: HTMLElement, oldClass: string, newClass: string): void {
    target.classList.remove(oldClass)
    target.classList.add(newClass)
  }

}

// Initialize all registered components
document.addEventListener("DOMContentLoaded", () => {
  BaseComponent.components.forEach((component) => {
    component.register()
  })
})
