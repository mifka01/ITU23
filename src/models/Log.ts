// @file components/Log.ts
// @brief Model for managing logging
// @author Miroslav Bálek (xbalek02)
// @date October 2023

type LogType = 'ERROR' | 'COMMAND'

export class Log {
  private log: { type: LogType; time: string; text: string }[] = []

  private getCurrentTime(): string {
    const now = new Date()
    const timeFormatter = new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    return timeFormatter.format(now)
  }

  append(type: LogType, text: string) {
    const time = this.getCurrentTime()
    this.log.push({ type, time, text })
  }

  get() {
    return this.log
  }

  clear() {
    this.log = []
  }
}

export const log: Log = new Log()
