export class ConsoleLog {
  private log: string = ''

  appendLog(text: string) {
    this.log += text + '\n'
  }

  getLog() {
    return this.log
  }

  clearLog() {
    this.log = ''
  }
}

export const consoleLog: ConsoleLog = new ConsoleLog()
