// TODO
// split into more modules

import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git'

const options: Partial<SimpleGitOptions> = {
  baseDir: '',
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
}

export class Git {
  private git: SimpleGit
  private options: Partial<SimpleGitOptions>

  constructor(options: Partial<SimpleGitOptions>) {
    this.git = simpleGit(options)
    this.options = options
  }

  setCWD(directoryPath: string) {
    this.options.baseDir = directoryPath
    this.git = simpleGit(this.options)
  }

  async getCWD() {
    return this.options.baseDir
  }

  clone(repositoryUrl: string, destination: string) {
    return this.git.clone(repositoryUrl, destination)
  }

  pull() {
    return this.git.pull()
  }

  push() {
    return this.git.push()
  }

  async status() {
    return this.git.status()
  }
}

export const git: Git = new Git(options)
