import { BaseComponent } from "./base_component"

export class AccordionComponent extends BaseComponent {

  public body: HTMLElement
  public button: HTMLAnchorElement

  // override
  public static get className(): string {
    return "c-accordion"
  }

  // override
  public init(): void {
    this.button = this.node.getElementsByClassName("c-accordion__header__toggle")[0] as HTMLAnchorElement
    this.body   = this.node.getElementsByClassName("c-accordion__body")[0] as HTMLElement

    this.initToggle()
  }

  public initToggle(): void {
    this.hideBody()

    this.button.addEventListener("click", (event) => {
      event.preventDefault()

      if (this.button.className.includes("c-accordion__header__toggle--close")) {
        this.button.text = "open "

        this.swapClasses(this.button, "c-accordion__header__toggle--close", "c-accordion__header__toggle--open")
        this.hideBody()
      } else {
        this.button.text = "close "

        this.swapClasses(this.button, "c-accordion__header__toggle--open", "c-accordion__header__toggle--close")
        this.showBody()
      }
    })
  }

  public hideBody(): void {
    this.setStyles(this.body, "display: none;")
  }

  public showBody(): void {
    this.setStyles(this.body, "display: inline-block;")
  }

}

document.addEventListener("DOMContentLoaded", () => {
  AccordionComponent.register()
})
