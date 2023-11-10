// @file Git.ts
// @brief Wrapper for SimpleGit Model
// @author Radim Mifka (xmifka00)
// @date October 2023

import {
  simpleGit,
  SimpleGit,
  SimpleGitOptions,
  StatusResult,
  PushResult,
  PullResult,
} from 'simple-git'

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

  async getCWD(): Promise<string | undefined> {
    return this.options.baseDir
  }

  clone(repositoryUrl: string, destination: string) {
    return this.git.clone(repositoryUrl, destination)
  }

  async pull(): Promise<PullResult> {
    return this.git.pull()
  }

  async push(): Promise<PushResult> {
    return this.git.push()
  }

  async status(): Promise<StatusResult> {
    return this.git.status()
  }

  async add(file: string): Promise<string> {
    return this.git.add(file)
  }
  async unstage(file: string): Promise<string> {
    return this.git.reset([file])
  }
}

export const git: Git = new Git(options)
