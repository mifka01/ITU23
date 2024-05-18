/**
 * @file Git.ts
 * @brief Wrapper for SimpleGit Model
 * @author Radim Mifka (xmifka00)
 * @author Miroslav Bálek (xbalek02)
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import {
  simpleGit,
  SimpleGit,
  SimpleGitOptions,
  StatusResult,
  PushResult,
  RemoteWithoutRefs,
  PullResult,
} from 'simple-git'

import { app } from './App'

const options: Partial<SimpleGitOptions> = {
  baseDir: app.get_last_repository() || process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
}

/**
 * Represents a Git repository and provides methods for interacting with it.
 */
export class Git {
  private git: SimpleGit
  private options: Partial<SimpleGitOptions>

  /**
   * Creates a new instance of the Git class.
   * @author Radim Mifka (xmifka00)
   * @param options - The options for configuring the Git instance.
   */
  constructor(options: Partial<SimpleGitOptions>) {
    this.git = simpleGit(options)
    this.options = options
  }

  /**
   * Sets the current working directory for the Git instance.
   * @author Radim Mifka (xmifka00)
   * @param directoryPath - The path to the directory.
   */
  async setCWD(directoryPath: string) {
    this.options.baseDir = directoryPath
    this.git = simpleGit(this.options)
  }

  /**
   * Gets the current working directory for the Git instance.
   * @author Radim Mifka (xmifka00)
   * @returns The current working directory path.
   */
  getCWD(): string | undefined {
    return this.options.baseDir
  }

  /**
   * Clones a repository from the specified URL to the specified destination.
   * @author Radim Mifka (xmifka00)
   * @param repositoryUrl - The URL of the repository to clone.
   * @param destination - The destination path where the repository will be cloned.
   * @returns A promise that resolves when the clone operation is complete.
   */
  clone(repositoryUrl: string, destination: string) {
    return this.git.clone(repositoryUrl, destination)
  }

  /**
   * Gets the current branch of the repository.
   * @author Radim Mifka (xmifka00)
   * @returns A promise that resolves with the name of the current branch.
   */
  async getCurrentBranch(): Promise<string> {
    return this.git.revparse(['--abbrev-ref', 'HEAD'])
  }

  /**
   * Gets the remote origins of the repository.
   * @author Radim Mifka (xmifka00)
   * @returns A promise that resolves with an array of remote origins.
   */
  async getOrigins(): Promise<RemoteWithoutRefs[]> {
    return this.git.getRemotes()
  }

  /**
   * Pulls changes from the remote repository.
   * @author Michal Zapletal (xzaple41)
   * @returns A promise that resolves with the result of the pull operation.
   */
  async pull(): Promise<PullResult> {
    let branch = await this.getCurrentBranch()
    let origin = await this.getOrigins()
    return this.git.pull(origin[0].name, branch)
  }

  /**
   * Pushes changes to the remote repository.
   * @author Michal Zapletal (xzaple41)
   * @returns A promise that resolves with the result of the push operation.
   */
  async push(): Promise<PushResult> {
    let branch = await this.getCurrentBranch()
    let origin = await this.getOrigins()
    return this.git.push(origin[0].name, branch)
  }

  /**
   * Gets the status of the repository.
   * @author Radim Mifka (xmifka00)
   * @returns A promise that resolves with the status of the repository.
   */
  async status(): Promise<StatusResult> {
    return this.git.status()
  }

  /**
   * Adds a file or all files to the staging area.
   * @author Radim Mifka (xmifka00)
   * @param file - The path of the file to add. If not specified, all files will be added.
   * @returns A promise that resolves with the result of the add operation.
   */
  async add(file?: string): Promise<string> {
    return this.git.add(file ? file : ['-A'])
  }

  /**
   * Unstages a file or all files from the staging area.
   * @author Radim Mifka (xmifka00)
   * @param file - The path of the file to unstage. If not specified, all files will be unstaged.
   * @returns A promise that resolves with the result of the unstage operation.
   */
  async unstage(file?: string): Promise<string> {
    if (file) return this.git.reset(['--', file])
    return this.git.reset([])
  }

  /**
   * Discards changes to a file by unstaging it and checking out the file from the HEAD commit.
   * @author Radim Mifka (xmifka00)
   * @param file - The path of the file to discard changes for.
   * @returns A promise that resolves when the discard operation is complete.
   */
  async discard(file: string) {
    await this.unstage(file)
    return this.git.checkout('HEAD', ['-f', '--', file])
  }

  /**
   * Discards all unstaged changes in the repository.
   * @author Radim Mifka (xmifka00)
   * @returns A promise that resolves when the discard operation is complete.
   */
  async discard_unstaged() {
    await this.git.stash(['push', '--keep-index', '--include-untracked'])
    return this.git.stash(['drop', '0'])
  }

  /**
   * Removes a file from the repository.
   * @author Radim Mifka (xmifka00)
   * @param file - The path of the file to remove.
   * @returns A promise that resolves when the remove operation is complete.
   */
  async rm(file: string) {
    await this.unstage(file)
    return this.git.clean('f', ['--', file])
  }

  /**
   * Commits changes to the repository.
   * @author Radim Mifka (xmifka00)
   * @param message - The commit message.
   * @returns A promise that resolves when the commit operation is complete.
   */
  async commit(message: string) {
    return this.git.commit(message)
  }

  /**
   * Gets the local branches of the repository.
   * @author Radim Mifka (xmifka00)
   * @returns A promise that resolves with an array of local branches.
   */
  async branches() {
    return this.git.branchLocal()
  }

  /**
   * Checks out the specified branch.
   * @author Radim Mifka (xmifka00)
   * @param name - The name of the branch to checkout.
   * @returns A promise that resolves when the checkout operation is complete.
   */
  async checkout_branch(name: string) {
    return this.git.checkout(name)
  }

  /**
   * Deletes the specified branch.
   * @author Radim Mifka (xmifka00)
   * @param name - The name of the branch to delete.
   * @returns A promise that resolves when the delete operation is complete.
   */
  async delete_branch(name: string) {
    return this.git.deleteLocalBranch(name, true)
  }

  /**
   * Gets the diff of a file.
   * @author Michal Zapletal (xzaple41)
   * @param path - The path of the file to get the diff for.
   * @returns A promise that resolves with the diff of the file.
   */
  async getDiff(path: string) {
    let diff = await this.git.diff([
      '--no-color',
      '--minimal',
      'HEAD',
      '--',
      path,
    ])
    if (diff.length == 0)
      diff = await this.git.diff(['--no-color', '--minimal', '/dev/null', path])
    return diff
  }

  /**
   * Commits in the commit history.
   * @author Miroslav Bálek (xbalek02)
   * @param maxCount - The maximum number of commits to retrieve.
   * @returns A promise that resolves with the commits in the commit history.
   */
  async commit_history(maxCount: number) {
    return this.git.log(['--max-count', String(maxCount)])
  }

  /**
   * Retrieves detail of commit specified by hash
   * @author Miroslav Bálek (xbalek02)
   * @param hash - The hash specifying commit.
   * @returns A promise that resolves with the commits in the commit history.
   */
  async commit_detail(hash: string) {
    return this.git.log(['-n', '1', String(hash)])
  }

  /**
   * Retrieves changed files in commit
   * @author Miroslav Bálek (xbalek02)
   * @param hash - The hash specifying commit.
   * @returns A promise that resolves with the commits in the commit history.
   */
  async commit_changed_files(hash: string) {
    return this.git.show(['--name-status', '--pretty=format:', String(hash)])
  }

  /**
   * Creates a new branch.
   * @author Miroslav Bálek (xbalek02)
   * @param name - The name of the new branch.
   * @returns A promise that resolves when the branch is created.
   */
  async create_branch(name: string) {
    return this.git.checkoutLocalBranch(name)
  }

  /**
   * Gets the list of stashes.
   * @author Miroslav Bálek (xbalek02)
   * @returns A promise that resolves with the list of stashes.
   */
  async stashes() {
    return this.git.stashList()
  }

  /**
   * Stashes changes.
   * @author Miroslav Bálek (xbalek02)
   * @param message - The stash message.
   * @returns A promise that resolves when the stash operation is complete.
   */
  async stash_push(message: string) {
    return this.git.stash(['push', '-m', message])
  }

  /**
   * Drops a stash.
   * @author Miroslav Bálek (xbalek02)
   * @param index - The index of the stash to drop.
   * @returns A promise that resolves when the stash is dropped.
   */
  async stash_drop(index: string) {
    return this.git.stash(['drop', `stash@{${index}}`])
  }

  /**
   * Pops a stash.
   * @author Miroslav Bálek (xbalek02)
   * @param index - The index of the stash to pop.
   * @returns A promise that resolves when the stash is popped.
   */
  async stash_pop(index: string) {
    return this.git.stash(['pop', `stash@{${index}}`])
  }

  /**
   * Applies a stash.
   * @author Miroslav Bálek (xbalek02)
   * @param index - The index of the stash to apply.
   * @returns A promise that resolves when the stash is applied.
   */
  async stash_apply(index: string) {
    return this.git.stash(['apply', `stash@{${index}}`])
  }

  /**
   * Applies a revert of last commit.
   * @author Michal Zapletal (xzaple41)
   * @returns A promise that contains last commit name.
   */
  async revert() {
    return this.git.revert('HEAD')
  }

  /**
   * Applies a fetch on current repository.
   * @author Michal Zapletal (xzaple41)
   * @returns A promise with FetchResult.
   */
  async fetch() {
    return this.git.fetch()
  }

  /**
   * Renames last commit if available. Throws error on failure.
   * @author Michal Zapletal (xzaple41)
   * @param message - new commit message.
   * @returns A promise that contains CommitResult.
   */
  async amend(message: string) {
    return this.git.commit(message, { '--amend': null })
  }

  /**
   * Initialize directory
   * @author Radim Mifka (xmifka00)
   * @param path - Directory to initialize
   * @returns A promise with git init result
   */
  async init(path: string) {
    return this.git.init([path])
  }
}

export const git: Git = new Git(options)
