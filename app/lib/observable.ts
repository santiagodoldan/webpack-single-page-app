interface IHandler {
  [key: string]: any[]
}

/**
 * Simple Publish/Subscribe class to handle events between different components of the site.
 */
export class Observable {

  /**
   * Subscribes given callback with given key.
   */
  public static on(key: string, callback: (...args: any[]) => void) {
    this.handlers[key] = this.handlers[key] || []

    this.handlers[key].push(callback)
  }

  /**
   * Triggers all registered callbacks for given key
   */
  public static emit(key: string, data: any) {
    const handlers = this.handlers[key]

    if (handlers) {
      handlers.forEach((handler) => {
        handler(data)
      })
    }
  }

  private static handlers: IHandler = {}

}
