// @file shared/response.ts
// @brief shared types
// @author Radim Mifka (xmifka00)
// @date December 2023

enum ResponseStatus {
  STATUS_SUCCESS = 0,
  STATUS_ERROR,
}

export type Response = {
  status: ResponseStatus
  payload?: {}
}

export function ResponseSuccess(payload?: {}): Response {
  return { status: ResponseStatus.STATUS_SUCCESS, payload: payload }
}

export function ResponseError(payload?: {}): Response {
  return { status: ResponseStatus.STATUS_ERROR, payload: payload }
}
