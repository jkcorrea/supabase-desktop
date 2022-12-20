import { lensPath, over } from 'rambda'

type GetPath<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${GetPath<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${GetPath<T[K], keyof T[K]>}`
    : K
  : never
type DottedPath<T> = GetPath<T, keyof T>

type GetValue<T, P extends DottedPath<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T // hit a node. we'll need to recurse
    ? Rest extends DottedPath<T[K]> // just need to filter out keys that arent in the path
      ? GetValue<T[K], Rest> // recurse, popping off K from K.Rest
      : never
    : never
  : P extends keyof T
  ? T[P] // at a leaf (no dots left in P, return type at T[P])
  : never

/**
 * Helper to lookup a path in our store & return a new value based on the old one
 * @param path The dotted path into state
 * @param fn An updater that takes the previous state and returns the new state
 */
export const makeUpdate =
  <S>() =>
  <P extends DottedPath<S>, T extends GetValue<S, P>>(path: P, fn: (x: T) => T): (<T>(v: T) => T) =>
    over(lensPath(path.split('.')), fn)
