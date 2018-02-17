import { Events } from "../consts"
import { Observable } from "../lib/observable"
import { Biker } from "../models/biker"
import { BaseComponent } from "./base_component"
import { BikerComponent } from "./biker_component"

export class BikerListComponent extends BaseComponent {

  public bikers: BikerComponent[]
  public container: HTMLElement

  // override
  public static get className(): string {
    return "c-biker-list"
  }

  // override
  public init(): void {
    super.init()

    this.container = this.node.getElementsByClassName("c-biker-list__records")[0] as HTMLElement
    this.bikers = []

    this.bindEvents()
    this.fetchBikers()
  }

  public bindEvents(): void {
    Observable.on(Events.BikerAdded, (biker: Biker) => {
      this.addBiker(biker)
    })

    Observable.on(Events.BikerRemoved, (biker: Biker) => {
      this.removeBiker(biker)
    })
  }

  public fetchBikers(): void {
    const bikers = Biker.findAll()

    bikers.forEach((biker) => this.addBiker(biker))
  }

  public addBiker(biker: Biker): void {
    const component = BikerComponent.loadAndInit(this.container, biker)

    this.bikers.push(component)
  }

  public removeBiker(biker: Biker): void {
    const component = this.bikers.find((c) => c.biker.id === biker.id)

    this.bikers = this.bikers.filter((c) => c.biker.id !== biker.id)

    component.destroy()
  }

}

BaseComponent.add(BikerListComponent)
