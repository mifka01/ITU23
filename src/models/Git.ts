// TODO
// split into more modules

import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git'

const options: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
}

export class Git {
  private git: SimpleGit

  constructor(options: Partial<SimpleGitOptions>) {
    this.git = simpleGit(options)
  }

  clone(repositoryUrl: string, destination: string) {
    return this.git.clone(repositoryUrl, destination)
  }

  pull() {
    return this.git.pull()
  }

  async status() {
    return this.git.status()
  }
}

export const git: Git = new Git(options)
