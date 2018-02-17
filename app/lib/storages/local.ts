import { IAdapter } from "../storage"

export class LocalStorageAdapter implements IAdapter {

  public create(namespace: string, attrs: any): void {
    const items = this.findAll(namespace)

    items.push(attrs)

    localStorage.setItem(namespace, JSON.stringify(items))
  }

  public destroy(namespace: string, id: any): void {
    const items = this.findAll(namespace)

    localStorage.setItem(namespace, JSON.stringify(items.filter((i) => i.id !== id)))
  }

  public findAll(namespace: string): any[] {
    return JSON.parse(localStorage.getItem(namespace)) || []
  }

}
