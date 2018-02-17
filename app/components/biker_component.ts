import { IBiker } from "../interfaces"
import { BaseComponent } from "./base_component"

export class BikerComponent extends BaseComponent {

  public static loadAndInit(container: HTMLElement, biker: IBiker): BikerComponent {
    const node      = this.appendTemplateToById(container, "biker-row-template")
    const component = new this(node, biker)

    component.init()

    return component
  }

  // override
  public static get className(): string {
    return "c-biker"
  }

  public biker: IBiker

  public constructor(node: HTMLElement, biker: IBiker) {
    super(node)

    this.biker = biker
  }

  public init(): void {
    this.populateData()

    const button = this.node.getElementsByClassName("c-biker__trash")[0]

    button.addEventListener("click", (event) => {
      event.preventDefault()

      console.info(this.biker)
    })
  }

  public populateData(): void {
    this.populateByClassName("c-biker__name", this.biker.name)
    this.populateByClassName("c-biker__email", this.biker.email)
    this.populateByClassName("c-biker__city", this.biker.city)
    this.populateByClassName("c-biker__rideInGroups", this.biker.rideInGroups)
    this.populateByClassName("c-biker__frequency", this.biker.frequencyText)
    this.populateByClassName("c-biker__createdAtDate", this.biker.createdAtDate)
    this.populateByClassName("c-biker__createdAtTime", this.biker.createdAtTime)
  }

  private populateByClassName(className: string, value: string): void {
    const container = this.node.getElementsByClassName(className)[0] as HTMLElement

    if (container) {
      container.textContent = value
    }
  }

}
