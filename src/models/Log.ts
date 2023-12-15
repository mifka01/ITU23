/**
 * @file Log.ts
 * @brief Model for managing logging
 * @author Radim Mifka (xmifka00)
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

type LogType = 'ERROR' | 'COMMAND'

/**
 * Represents a log that stores log entries with type, time, and text.
 */
export class Log {
  private log: { type: LogType; time: string; text: string }[] = []

  /**
   * Returns the current time in the format "HH:mm:ss".
   * @returns The current time.
   */
  private getCurrentTime(): string {
    const now = new Date()
    const timeFormatter = new Intl.DateTimeFormat('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    return timeFormatter.format(now)
  }

  /**
   * Appends a log entry to the log.
   * @param type - The type of the log entry.
   * @param text - The text of the log entry.
   */
  append(type: LogType, text: string) {
    const time = this.getCurrentTime()
    this.log.push({ type, time, text })
  }

  /**
   * Returns the log entries.
   * @returns The log entries.
   */
  get() {
    return this.log
  }

  /**
   * Clears the log.
   */
  clear() {
    this.log = []
  }
}

export const log: Log = new Log()
