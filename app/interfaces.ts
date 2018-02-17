export enum RideInGroups {
  Never = "Never",
  Sometimes = "Sometimes",
  Always = "Always",
}

export interface IBiker {
  name: string
  email: string
  city: string
  rideInGroups: RideInGroups
  frequency: number[]
  createdAt: Date
  frequencyText?: string
  createdAtDate?: string
  createdAtTime?: string
}
