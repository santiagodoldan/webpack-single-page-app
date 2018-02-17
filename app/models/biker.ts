import { IBiker, RideInGroups } from "../interfaces"
import { Base } from "./base"

export class Biker extends Base implements IBiker {

  public name: string
  public email: string
  public city: string
  public rideInGroups: RideInGroups
  public frequency: number[]
  public createdAt: Date

  public constructor(attrs: IBiker) {
    super()

    this.name         = attrs.name
    this.email        = attrs.email
    this.city         = attrs.city
    this.rideInGroups = attrs.rideInGroups
    this.frequency    = attrs.frequency
    this.createdAt    = attrs.createdAt
  }

  public get frequencyText(): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    if (this.frequency.length === 7) {
      return "Every day"
    } else if (this.frequency.sort().toString() === [0, 6].toString()) {
      return "Weekends"
    } else if (this.frequency.sort().toString() === [1, 2, 3, 4, 5].toString()) {
      return "Week days"
    } else {
      const texts = this.frequency.map((d) => days[d])

      return texts.join(", ")
    }
  }

  public get createdAtDate(): string {
    const day   = ("0" + this.createdAt.getDate()).slice(-2)
    const month = ("0" + (this.createdAt.getMonth() + 1)).slice(-2)
    const year  = this.createdAt.getFullYear()

    return `${day}/${month}/${year}`
  }

  public get createdAtTime(): string {
    const minutes = ("0" + this.createdAt.getMinutes()).slice(-2)
    const ampm    = this.createdAt.getHours() >= 12 ? "pm" : "am"

    let hours = this.createdAt.getHours() % 12

    hours = hours ? hours : 12

    return `${hours}/${minutes} ${ampm}`
  }

}
