import { IBiker, RideInGroups } from "../interfaces"
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
    this.container = this.node.getElementsByClassName("c-biker-list__records")[0] as HTMLElement
    this.bikers = []

    this.fetchBikers()
  }

  public fetchBikers(): void {
    const bikers = [
      new Biker({
        name: "Santiago Doldán",
        email: "santiagodoldan@icloud.com",
        city: "Montevideo",
        rideInGroups: RideInGroups.Always,
        frequency: [0, 4],
        createdAt: new Date(),
      }),
      new Biker({
        name: "Luis Suarez",
        email: "lucho@test.com",
        city: "Salto",
        rideInGroups: RideInGroups.Never,
        frequency: [0, 6],
        createdAt: new Date(),
      }),
    ]

    bikers.forEach((biker) => this.addBiker(biker))
  }

  public addBiker(biker: IBiker): void {
    const component = BikerComponent.loadAndInit(this.container, biker)

    this.bikers.push(component)
  }

}

document.addEventListener("DOMContentLoaded", () => {
  BikerListComponent.register()
})
