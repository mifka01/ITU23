/**
 * @file response.ts
 * @brief Shared response types and functions for the application.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

/**
 * Represents the status of a response.
 */
enum ResponseStatus {
  STATUS_SUCCESS = 0,
  STATUS_ERROR,
}

/**
 * Represents a response object.
 */
export type Response = {
  status: ResponseStatus;
  payload?: {};
}

/**
 * Creates a successful response object.
 * @param payload - The payload of the response.
 * @returns The created response object.
 */
export function ResponseSuccess(payload?: {}): Response {
  return { status: ResponseStatus.STATUS_SUCCESS, payload: payload }
}

/**
 * Creates an error response object.
 * @param payload - The payload of the response.
 * @returns The created response object.
 */
export function ResponseError(payload?: {}): Response {
  return { status: ResponseStatus.STATUS_ERROR, payload: payload }
}
