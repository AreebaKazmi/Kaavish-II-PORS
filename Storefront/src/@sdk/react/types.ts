import { ApolloError } from "apollo-client";
import { KaavishAPI } from "..";

export interface ApolloErrorWithUserInput extends ApolloError {
  extraInfo: {
    userInputErrors?: any[];
  };
}

export type Variables<T extends keyof KaavishAPI> = KaavishAPI[T] extends (
  variables: infer V,
  _: any
) => any
  ? V
  : never;

export type Options<T extends keyof KaavishAPI> = KaavishAPI[T] extends (
  _: any,
  options: infer V
) => any
  ? V
  : never;

export type ReturnData<T extends keyof KaavishAPI> = KaavishAPI[T] extends (
  ...args: any
) => Promise<infer V>
  ? V extends { data: any }
    ? V
    : never
  : never;

export type WatchQueryReturnData<
  T extends keyof KaavishAPI
> = KaavishAPI[T] extends (_: any, options: infer O) => any
  ? O extends { onUpdate: (data: infer V) => any }
    ? V
    : never
  : never;
