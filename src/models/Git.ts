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
    await this.git.stash(['push', '--keep-index', '--include-untracked'])
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

  async commit_tree(maxCount: number) {
    return this.git.log(['--max-count', String(maxCount)])
  }

  async create_branch(name: string) {
    return this.git.checkoutLocalBranch(name)
  }

  async stashes() {
    return this.git.stashList()
  }
  
  async stash_push(message: string) {
    return this.git.stash(['push','-m', message])
  }

  async stash_drop(hash: string) {
    return this.git.stash(['drop' ,`stash@{${hash}}`])
  }

  async stash_pop(hash: string) {
    return this.git.stash(['pop', `stash@{${hash}}`])
  }

  async stash_apply(hash: string) {
    return this.git.stash(['apply', `stash@{${hash}}`])
  }
}

export const git: Git = new Git(options)
