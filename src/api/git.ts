/**
 * @file api/git.ts
 * @brief API for the Git object.
 * @author Radim Mifka (xmifka00)
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import { ipcRenderer } from 'electron'
import { Response } from 'shared/response'

/**
 * The `git` object provides methods for interacting with Git operations.
 */
export const git = {
  prefix: 'git',

  /**
   * Commits changes to the Git repository.
   * @param data - The commit message.
   * @returns A promise that resolves to the response from the Git commit operation.
   */
  commit: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:commit`, data)
  },

  /**
   * Retrieves the status of the Git repository.
   * @param data - The path to the repository.
   * @returns A promise that resolves to the response from the Git status operation.
   */
  status: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:status`, data)
  },

  /**
   * Pushes changes to the remote Git repository.
   * @param data - The path to the repository.
   * @returns A promise that resolves to the response from the Git push operation.
   */
  push: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:push`, data)
  },

  /**
   * Pulls changes from the remote Git repository.
   * @param data - The path to the repository.
   * @returns A promise that resolves to the response from the Git pull operation.
   */
  pull: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:pull`, data)
  },

  /**
   * Adds a file to the Git repository.
   * @param file - The path to the file.
   * @returns A promise that resolves to the response from the Git add operation.
   */
  add: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:add`, file)
  },

  /**
   * Unstages a file in the Git repository.
   * @param file - The path to the file.
   * @returns A promise that resolves to the response from the Git unstage operation.
   */
  unstage: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:unstage`, file)
  },

  /**
   * Discards changes to a file in the Git repository.
   * @param file - The path to the file.
   * @returns A promise that resolves to the response from the Git discard operation.
   */
  discard: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:discard`, file)
  },

  /**
   * Discards all unstaged changes in the Git repository.
   * @returns A promise that resolves to the response from the Git discard_unstaged operation.
   */
  discard_unstaged: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:discard_unstaged`)
  },

  /**
   * Removes a file from the Git repository.
   * @param file - The path to the file.
   * @returns A promise that resolves to the response from the Git rm operation.
   */
  rm: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:rm`, file)
  },

  /**
   * Retrieves the current working directory of the Git repository.
   * @returns A promise that resolves to the response from the Git cwd operation.
   */
  cwd: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:cwd`)
  },

  /**
   * Retrieves the branches in the Git repository.
   * @returns A promise that resolves to the response from the Git branches operation.
   */
  branches: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:branches`)
  },

  /**
   * Checks out a branch in the Git repository.
   * @param name - The name of the branch.
   * @returns A promise that resolves to the response from the Git checkout_branch operation.
   */
  checkout_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:checkout_branch`, name)
  },

  /**
   * Deletes a branch in the Git repository.
   * @param name - The name of the branch.
   * @returns A promise that resolves to the response from the Git delete_branch operation.
   */
  delete_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:delete_branch`, name)
  },

  /**
   * Retrieves the diff of a file in the Git repository.
   * @param path - The path to the file.
   * @returns A promise that resolves to the response from the Git getDiff operation.
   */
  getDiff: (path: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:getDiff`, path)
  },

  /**
   * Creates a new branch in the Git repository.
   * @param name - The name of the branch.
   * @returns A promise that resolves to the response from the Git create_branch operation.
   */
  create_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:create_branch`, name)
  },

  /**
   * Commits the history of changes in the Git repository.
   * @param maxCount - The maximum number of commits to include in the history.
   * @returns A promise that resolves to the response from the Git history operation.
   */
  commit_history: (maxCount: number): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:commit_history`, maxCount)
  },

    /**
   * Retrieves detail of commit specified by hash
   * @param hash - The hash of the commit for which you want to retrieve details.
   * @returns A promise that resolves to the response from the Git commit_detail operation.
   */
    commit_detail: (hash: string): Promise<Response> => {
      return ipcRenderer.invoke(`${git.prefix}:commit_detail`, hash)
    },

  /**
   * Retrieves the stashes in the Git repository.
   * @param name - The name of the stash.
   * @returns A promise that resolves to the response from the Git stashes operation.
   */
  stashes: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:stashes`, name)
  },

  /**
   * Pushes changes to a stash in the Git repository.
   * @param name - The name of the stash.
   * @returns A promise that resolves to the response from the Git stash_push operation.
   */
  stash_push: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_push`, name)
  },

  /**
   * Applies changes from a stash in the Git repository.
   * @param hash - The hash of the stash.
   * @returns A promise that resolves to the response from the Git stash_apply operation.
   */
  stash_apply: (hash: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_apply`, hash)
  },

  /**
   * Pops changes from a stash in the Git repository.
   * @param hash - The hash of the stash.
   * @returns A promise that resolves to the response from the Git stash_pop operation.
   */
  stash_pop: (hash: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_pop`, hash)
  },

  /**
   * Drops a stash from the Git repository.
   * @param hash - The hash of the stash.
   * @returns A promise that resolves to the response from the Git stash_drop operation.
   */
  stash_drop: (hash: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_drop`, hash)
  },

  /**
   * Reverts last commit.
   * @returns A promise that resolves git revert operation.
   */
  revert: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:revert`)
  },

  /**
   * Fetch all branches from remote to local.
   * @returns A promise that resolves git fetch operation.
   */
  fetch: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:fetch`)
  },

  /**
   * Renames last commit.
   * @param message - New commit message.
   * @returns A promise that resolves to the response from the Git commit --amend operation.
   */
  amend: (message: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:amend`, message)
  },
}
