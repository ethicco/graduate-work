declare global {
  type AnyObject = Record<string, unknown>;

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      contactPhone: string;
    }
  }
}

export {};
