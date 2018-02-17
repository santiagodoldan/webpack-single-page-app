import { IModel } from "../interfaces"
import { Storage } from "../lib/storage"

export class Base implements IModel {

  public static namespace: string

  public static findAll(): any[] {
    const result = Storage.getInstance().findAll(this.namespace)

    return result.map((item) => new this(item))
  }

  public id: string
  public attrs: any[]
  public namespace: string

  public constructor(attrs: any) {
    attrs = Object.assign({ id: Math.round(Math.random() * 10000000).toString() }, attrs)

    this.id    = attrs.id
    this.attrs = attrs
  }

  public destroy(): void {
    Storage.getInstance().destroy(this.namespace, this.id)
  }

  public save(): any {
    Storage.getInstance().create(this.namespace, this.attrs)

    return this
  }

}
