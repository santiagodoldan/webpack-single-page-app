import { Events } from "../consts"
import { RideInGroups } from "../interfaces"
import { Observable } from "../lib/observable"
import { Biker } from "../models/biker"
import { BaseComponent } from "./base_component"

export class BikerFormComponent extends BaseComponent {

  // override
  public static get className(): string {
    return "c-biker-form"
  }

  public node: HTMLFormElement

  public init(): void {
    super.init()

    const cancel = this.node.getElementsByClassName("c-biker-form__cancel")[0]

    cancel.addEventListener("click", (event) => {
      event.preventDefault()

      this.node.reset()
    })

    this.node.addEventListener("submit", (event) => {
      event.preventDefault()

      const formData  = new FormData(event.target as HTMLFormElement)
      const frequency = formData.getAll("frequency").map((a) => Number(a))

      const biker = new Biker({
        name: formData.get("full_name") as string,
        email: formData.get("email") as string,
        city: formData.get("city") as string,
        rideInGroups: formData.get("ride_in_groups") as RideInGroups,
        frequency,
        createdAt: new Date(),
      })

      biker.save()

      Observable.emit(Events.BikerAdded, biker)

      this.node.reset()
    })
  }

}

BaseComponent.add(BikerFormComponent)
