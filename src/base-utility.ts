export class BaseUtility {
  public name: string
  constructor(name:string) {
    if (new.target === BaseUtility) {
      throw new TypeError("Cannot construct BaseUtility instances directly")
    }
    this.name = name
  }

  async execute() {
    throw new Error("Method 'execute()' must be implemented.")
  }
}
