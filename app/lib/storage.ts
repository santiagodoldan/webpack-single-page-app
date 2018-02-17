export interface IAdapter {
  create(namespace: string, attrs: any): void
  destroy(namespace: string, id: any): void
  findAll(namespace: string): any[]
}

export class Storage {

  public static instance: Storage

  public static getInstance(): Storage {
    if (this.instance) {
      return this.instance
    }

    this.instance = new Storage()

    return this.instance
  }

  public currentAdapter: IAdapter

  public get adapter(): IAdapter {
    if (this.currentAdapter) {
      return this.currentAdapter
    } else {
      throw new Error("Missing storage adapter")
    }
  }

  public set adapter(a: IAdapter) {
    this.currentAdapter = a
  }

  public create(namespace: string, attrs: any): void {
    this.currentAdapter.create(namespace, attrs)
  }

  public destroy(namespace: string, id: any): void {
    this.currentAdapter.destroy(namespace, id)
  }

  public findAll(namespace: string): any[] {
    return this.currentAdapter.findAll(namespace)
  }

}
