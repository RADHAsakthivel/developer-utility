export class BaseJsonCommand {
  public name: string
  constructor(name:string) {
    if (new.target === BaseJsonCommand) {
      throw new TypeError("Cannot construct BaseJsonCommand instances directly")
    }
    this.name = name
  }

  async execute() {
    throw new Error("Method 'execute()' must be implemented.")
  }
}
