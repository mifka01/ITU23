// @file Git.ts
// @brief Wrapper for SimpleGit Model
// @author Radim Mifka (xmifka00), Miroslav Bálek (xbalek02)
// @date October 2023

import {
  simpleGit,
  SimpleGit,
  SimpleGitOptions,
  StatusResult,
  PushResult,
  RemoteWithoutRefs,
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

  async getCurrentBranch(): Promise<string> {
    return this.git.revparse(['--abbrev-ref', 'HEAD'])
  }

  async getOrigins(): Promise<RemoteWithoutRefs[]> {
    return this.git.getRemotes()
  }

  async pull(): Promise<PullResult> {
    let branch = await this.getCurrentBranch()
    let origin = await this.getOrigins()
    return this.git.pull(origin[0].name, branch)
  }

  async push(): Promise<PushResult> {
    let branch = await this.getCurrentBranch()
    let origin = await this.getOrigins()
    return this.git.push(origin[0].name, branch)
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

  async commit_tree(maxCount: number) {
    return this.git.log(['--max-count', String(maxCount)])
  }

  async create_branch(name: string) {
    return this.git.checkoutLocalBranch(name)
  }

  async stashes() {
    return this.git.stashList()
  }

  async stash_drop(index: string) {
    return this.git.stash(['drop', index])
  }

  async stash_pop(index: string) {
    return this.git.stash(['pop', index])
  }

  async stash_apply(index: string) {
    return this.git.stash(['apply', index])
  }
}

export const git: Git = new Git(options)
