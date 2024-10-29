import { AxiosError } from 'axios';

export type KnownErrors = KnownError[];

type KnownError = { checkHasError: (error: Error) => boolean; throwError: (error: AxiosError) => never };