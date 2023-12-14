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

  getCWD(): string | undefined {
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

  async add(file?: string): Promise<string> {
    return this.git.add(file ? file : ['-A'])
  }

  async unstage(file?: string): Promise<string> {
    if (file) return this.git.reset(['--', file])
    return this.git.reset([])
  }

  async discard(file: string) {
    await this.unstage(file)
    return this.git.checkout('HEAD', ['-f', '--', file])
  }

  async discard_unstaged() {
    await this.git.stash(['push', '--keep-index', '--all'])
    return this.git.stash(['drop', '0'])
  }

  async rm(file: string) {
    await this.unstage(file)
    return this.git.clean('f', ['--', file])
  }

  async commit(message: string) {
    return this.git.commit(message)
  }

  async branches() {
    return this.git.branchLocal()
  }

  async checkout_branch(name: string) {
    return this.git.checkout(name)
  }

  async delete_branch(name: string) {
    return this.git.deleteLocalBranch(name)
  }

  async getDiff(path: string) {
    return this.git.diff(['--no-color', '--minimal', 'HEAD', path])
  }
  // --raw = generates names of changed files
}

export const git: Git = new Git(options)
