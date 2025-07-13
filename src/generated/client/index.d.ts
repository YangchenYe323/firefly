
/**
 * Client
**/


declare global {
  namespace PrismaJson {
    // This namespace will always be empty. Definitions should be done by
    // you manually, and merged automatically by typescript. Make sure that
    // your declaration merging file is included in your tsconfig.json
    //
    // Learn more: https://github.com/arthurfiorette/prisma-json-types-generator/issues/143
    // Declaration Merging: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
  }
}

/** A filter to be used against nullable List types. */
export type NullableListFilter<T> = {
  equals?: T | T[] | null;
  has?: T | null;
  hasEvery?: T[];
  hasSome?: T[];
  isEmpty?: boolean;
};

/** A type to determine how to update a json field */
export type UpdateInput<T> = T extends object ? { [P in keyof T]?: UpdateInput<T[P]> } : T;

/** A type to determine how to update a json[] field */
export type UpdateManyInput<T> = T | T[] | { set?: T[]; push?: T | T[] };

/** A type to determine how to create a json[] input */
export type CreateManyInput<T> = T | T[] | { set?: T[] };

/**
 * A typed version of NestedStringFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of StringFilter, allowing narrowing of string types to discriminated
 * unions.
 */
export type TypedStringFilter<S extends string> =
  //@ts-ignore - When Prisma.StringFilter is not present, this type is not used
  Prisma.StringFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedNestedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableFilter is not present, this type is not used
  Prisma.StringNullableFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableFilter<S> | S | null;
  };

/**
 * A typed version of NestedStringWithAggregatesFilter, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedNestedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of StringWithAggregatesFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringWithAggregatesFilter is not present, this type is not used
  Prisma.StringWithAggregatesFilter & {
    equals?: S;
    in?: S[];
    notIn?: S[];
    not?: TypedNestedStringWithAggregatesFilter<S> | S;
  };

/**
 * A typed version of NestedStringNullableWithAggregatesFilter, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNestedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.NestedStringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.NestedStringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringNullableWithAggregatesFilter, allowing narrowing of string
 * types to discriminated unions.
 */
export type TypedStringNullableWithAggregatesFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableWithAggregatesFilter is not present, this type is not used
  Prisma.StringNullableWithAggregatesFilter & {
    equals?: S | null;
    in?: S[] | null;
    notIn?: S[] | null;
    not?: TypedNestedStringNullableWithAggregatesFilter<S> | S | null;
  };

/**
 * A typed version of StringFieldUpdateOperationsInput, allowing narrowing of string types
 * to discriminated unions.
 */
export type TypedStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.StringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.StringFieldUpdateOperationsInput & {
    set?: S;
  };

/**
 * A typed version of NullableStringFieldUpdateOperationsInput, allowing narrowing of
 * string types to discriminated unions.
 */
export type TypedNullableStringFieldUpdateOperationsInput<S extends string> =
  //@ts-ignore - When Prisma.NullableStringFieldUpdateOperationsInput is not present, this type is not used
  Prisma.NullableStringFieldUpdateOperationsInput & {
    set?: S | null;
  };

/**
 * A typed version of StringNullableListFilter, allowing narrowing of string types to
 * discriminated unions.
 */
export type TypedStringNullableListFilter<S extends string> =
  //@ts-ignore - When Prisma.StringNullableListFilter is not present, this type is not used
  Prisma.StringNullableListFilter & {
    equals?: S[] | null;
    has?: S | null;
    hasEvery?: S[];
    hasSome?: S[];
  };

/**
 * A typed version of the input type to update a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type UpdateStringArrayInput<S extends string> = {
  set?: S[];
  push?: S | S[];
};

/**
 * A typed version of the input type to create a string[] field, allowing narrowing of
 * string types to discriminated unions.
 */
export type CreateStringArrayInput<S extends string> = {
  set?: S[];
};
import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model VtuberProfile
 * Vtuber profile configuration - stores the main vtuber information
 */
export type VtuberProfile = $Result.DefaultSelection<Prisma.$VtuberProfilePayload>
/**
 * Model Theme
 * Theme configuration - stores different visual themes for the vtuber
 */
export type Theme = $Result.DefaultSelection<Prisma.$ThemePayload>
/**
 * Model VtuberExternalLink
 * External links for the vtuber (social media, etc.)
 */
export type VtuberExternalLink = $Result.DefaultSelection<Prisma.$VtuberExternalLinkPayload>
/**
 * Model Song
 * Always after the prisma-client-js generator
 */
export type Song = $Result.DefaultSelection<Prisma.$SongPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model Footer
 * 
 */
export type Footer = $Result.DefaultSelection<Prisma.$FooterPayload>
/**
 * Model LiveRecordingArchive
 * Live recording archive. This table store metadata about every live recording
 * of the vtuber.
 */
export type LiveRecordingArchive = $Result.DefaultSelection<Prisma.$LiveRecordingArchivePayload>
/**
 * Model SongOccurrenceInLive
 * This is the relation table between Song and LiveRecordingArchive.
 * Each entry represents a song that was played by the vtuber in the live.
 */
export type SongOccurrenceInLive = $Result.DefaultSelection<Prisma.$SongOccurrenceInLivePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more VtuberProfiles
 * const vtuberProfiles = await prisma.vtuberProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more VtuberProfiles
   * const vtuberProfiles = await prisma.vtuberProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.vtuberProfile`: Exposes CRUD operations for the **VtuberProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VtuberProfiles
    * const vtuberProfiles = await prisma.vtuberProfile.findMany()
    * ```
    */
  get vtuberProfile(): Prisma.VtuberProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.theme`: Exposes CRUD operations for the **Theme** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Themes
    * const themes = await prisma.theme.findMany()
    * ```
    */
  get theme(): Prisma.ThemeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vtuberExternalLink`: Exposes CRUD operations for the **VtuberExternalLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VtuberExternalLinks
    * const vtuberExternalLinks = await prisma.vtuberExternalLink.findMany()
    * ```
    */
  get vtuberExternalLink(): Prisma.VtuberExternalLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.song`: Exposes CRUD operations for the **Song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): Prisma.SongDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.footer`: Exposes CRUD operations for the **Footer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Footers
    * const footers = await prisma.footer.findMany()
    * ```
    */
  get footer(): Prisma.FooterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.liveRecordingArchive`: Exposes CRUD operations for the **LiveRecordingArchive** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LiveRecordingArchives
    * const liveRecordingArchives = await prisma.liveRecordingArchive.findMany()
    * ```
    */
  get liveRecordingArchive(): Prisma.LiveRecordingArchiveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.songOccurrenceInLive`: Exposes CRUD operations for the **SongOccurrenceInLive** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SongOccurrenceInLives
    * const songOccurrenceInLives = await prisma.songOccurrenceInLive.findMany()
    * ```
    */
  get songOccurrenceInLive(): Prisma.SongOccurrenceInLiveDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    VtuberProfile: 'VtuberProfile',
    Theme: 'Theme',
    VtuberExternalLink: 'VtuberExternalLink',
    Song: 'Song',
    User: 'User',
    Feedback: 'Feedback',
    Footer: 'Footer',
    LiveRecordingArchive: 'LiveRecordingArchive',
    SongOccurrenceInLive: 'SongOccurrenceInLive'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "vtuberProfile" | "theme" | "vtuberExternalLink" | "song" | "user" | "feedback" | "footer" | "liveRecordingArchive" | "songOccurrenceInLive"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      VtuberProfile: {
        payload: Prisma.$VtuberProfilePayload<ExtArgs>
        fields: Prisma.VtuberProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VtuberProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VtuberProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          findFirst: {
            args: Prisma.VtuberProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VtuberProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          findMany: {
            args: Prisma.VtuberProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>[]
          }
          create: {
            args: Prisma.VtuberProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          createMany: {
            args: Prisma.VtuberProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VtuberProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>[]
          }
          delete: {
            args: Prisma.VtuberProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          update: {
            args: Prisma.VtuberProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          deleteMany: {
            args: Prisma.VtuberProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VtuberProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VtuberProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>[]
          }
          upsert: {
            args: Prisma.VtuberProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberProfilePayload>
          }
          aggregate: {
            args: Prisma.VtuberProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVtuberProfile>
          }
          groupBy: {
            args: Prisma.VtuberProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<VtuberProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.VtuberProfileCountArgs<ExtArgs>
            result: $Utils.Optional<VtuberProfileCountAggregateOutputType> | number
          }
        }
      }
      Theme: {
        payload: Prisma.$ThemePayload<ExtArgs>
        fields: Prisma.ThemeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ThemeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ThemeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          findFirst: {
            args: Prisma.ThemeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ThemeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          findMany: {
            args: Prisma.ThemeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          create: {
            args: Prisma.ThemeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          createMany: {
            args: Prisma.ThemeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ThemeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          delete: {
            args: Prisma.ThemeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          update: {
            args: Prisma.ThemeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          deleteMany: {
            args: Prisma.ThemeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ThemeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ThemeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>[]
          }
          upsert: {
            args: Prisma.ThemeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ThemePayload>
          }
          aggregate: {
            args: Prisma.ThemeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTheme>
          }
          groupBy: {
            args: Prisma.ThemeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThemeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ThemeCountArgs<ExtArgs>
            result: $Utils.Optional<ThemeCountAggregateOutputType> | number
          }
        }
      }
      VtuberExternalLink: {
        payload: Prisma.$VtuberExternalLinkPayload<ExtArgs>
        fields: Prisma.VtuberExternalLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VtuberExternalLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VtuberExternalLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          findFirst: {
            args: Prisma.VtuberExternalLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VtuberExternalLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          findMany: {
            args: Prisma.VtuberExternalLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>[]
          }
          create: {
            args: Prisma.VtuberExternalLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          createMany: {
            args: Prisma.VtuberExternalLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VtuberExternalLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>[]
          }
          delete: {
            args: Prisma.VtuberExternalLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          update: {
            args: Prisma.VtuberExternalLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          deleteMany: {
            args: Prisma.VtuberExternalLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VtuberExternalLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VtuberExternalLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>[]
          }
          upsert: {
            args: Prisma.VtuberExternalLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VtuberExternalLinkPayload>
          }
          aggregate: {
            args: Prisma.VtuberExternalLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVtuberExternalLink>
          }
          groupBy: {
            args: Prisma.VtuberExternalLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<VtuberExternalLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.VtuberExternalLinkCountArgs<ExtArgs>
            result: $Utils.Optional<VtuberExternalLinkCountAggregateOutputType> | number
          }
        }
      }
      Song: {
        payload: Prisma.$SongPayload<ExtArgs>
        fields: Prisma.SongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findFirst: {
            args: Prisma.SongFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findMany: {
            args: Prisma.SongFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          create: {
            args: Prisma.SongCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          createMany: {
            args: Prisma.SongCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SongCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          delete: {
            args: Prisma.SongDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          update: {
            args: Prisma.SongUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          deleteMany: {
            args: Prisma.SongDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SongUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SongUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          upsert: {
            args: Prisma.SongUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          aggregate: {
            args: Prisma.SongAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSong>
          }
          groupBy: {
            args: Prisma.SongGroupByArgs<ExtArgs>
            result: $Utils.Optional<SongGroupByOutputType>[]
          }
          count: {
            args: Prisma.SongCountArgs<ExtArgs>
            result: $Utils.Optional<SongCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      Footer: {
        payload: Prisma.$FooterPayload<ExtArgs>
        fields: Prisma.FooterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FooterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FooterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          findFirst: {
            args: Prisma.FooterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FooterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          findMany: {
            args: Prisma.FooterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          create: {
            args: Prisma.FooterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          createMany: {
            args: Prisma.FooterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FooterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          delete: {
            args: Prisma.FooterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          update: {
            args: Prisma.FooterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          deleteMany: {
            args: Prisma.FooterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FooterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FooterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>[]
          }
          upsert: {
            args: Prisma.FooterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FooterPayload>
          }
          aggregate: {
            args: Prisma.FooterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFooter>
          }
          groupBy: {
            args: Prisma.FooterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FooterGroupByOutputType>[]
          }
          count: {
            args: Prisma.FooterCountArgs<ExtArgs>
            result: $Utils.Optional<FooterCountAggregateOutputType> | number
          }
        }
      }
      LiveRecordingArchive: {
        payload: Prisma.$LiveRecordingArchivePayload<ExtArgs>
        fields: Prisma.LiveRecordingArchiveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LiveRecordingArchiveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LiveRecordingArchiveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          findFirst: {
            args: Prisma.LiveRecordingArchiveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LiveRecordingArchiveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          findMany: {
            args: Prisma.LiveRecordingArchiveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>[]
          }
          create: {
            args: Prisma.LiveRecordingArchiveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          createMany: {
            args: Prisma.LiveRecordingArchiveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LiveRecordingArchiveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>[]
          }
          delete: {
            args: Prisma.LiveRecordingArchiveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          update: {
            args: Prisma.LiveRecordingArchiveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          deleteMany: {
            args: Prisma.LiveRecordingArchiveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LiveRecordingArchiveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LiveRecordingArchiveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>[]
          }
          upsert: {
            args: Prisma.LiveRecordingArchiveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LiveRecordingArchivePayload>
          }
          aggregate: {
            args: Prisma.LiveRecordingArchiveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLiveRecordingArchive>
          }
          groupBy: {
            args: Prisma.LiveRecordingArchiveGroupByArgs<ExtArgs>
            result: $Utils.Optional<LiveRecordingArchiveGroupByOutputType>[]
          }
          count: {
            args: Prisma.LiveRecordingArchiveCountArgs<ExtArgs>
            result: $Utils.Optional<LiveRecordingArchiveCountAggregateOutputType> | number
          }
        }
      }
      SongOccurrenceInLive: {
        payload: Prisma.$SongOccurrenceInLivePayload<ExtArgs>
        fields: Prisma.SongOccurrenceInLiveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongOccurrenceInLiveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongOccurrenceInLiveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          findFirst: {
            args: Prisma.SongOccurrenceInLiveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongOccurrenceInLiveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          findMany: {
            args: Prisma.SongOccurrenceInLiveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>[]
          }
          create: {
            args: Prisma.SongOccurrenceInLiveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          createMany: {
            args: Prisma.SongOccurrenceInLiveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SongOccurrenceInLiveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>[]
          }
          delete: {
            args: Prisma.SongOccurrenceInLiveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          update: {
            args: Prisma.SongOccurrenceInLiveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          deleteMany: {
            args: Prisma.SongOccurrenceInLiveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SongOccurrenceInLiveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SongOccurrenceInLiveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>[]
          }
          upsert: {
            args: Prisma.SongOccurrenceInLiveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongOccurrenceInLivePayload>
          }
          aggregate: {
            args: Prisma.SongOccurrenceInLiveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSongOccurrenceInLive>
          }
          groupBy: {
            args: Prisma.SongOccurrenceInLiveGroupByArgs<ExtArgs>
            result: $Utils.Optional<SongOccurrenceInLiveGroupByOutputType>[]
          }
          count: {
            args: Prisma.SongOccurrenceInLiveCountArgs<ExtArgs>
            result: $Utils.Optional<SongOccurrenceInLiveCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    vtuberProfile?: VtuberProfileOmit
    theme?: ThemeOmit
    vtuberExternalLink?: VtuberExternalLinkOmit
    song?: SongOmit
    user?: UserOmit
    feedback?: FeedbackOmit
    footer?: FooterOmit
    liveRecordingArchive?: LiveRecordingArchiveOmit
    songOccurrenceInLive?: SongOccurrenceInLiveOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VtuberProfileCountOutputType
   */

  export type VtuberProfileCountOutputType = {
    externalLinks: number
    themes: number
  }

  export type VtuberProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    externalLinks?: boolean | VtuberProfileCountOutputTypeCountExternalLinksArgs
    themes?: boolean | VtuberProfileCountOutputTypeCountThemesArgs
  }

  // Custom InputTypes
  /**
   * VtuberProfileCountOutputType without action
   */
  export type VtuberProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfileCountOutputType
     */
    select?: VtuberProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VtuberProfileCountOutputType without action
   */
  export type VtuberProfileCountOutputTypeCountExternalLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VtuberExternalLinkWhereInput
  }

  /**
   * VtuberProfileCountOutputType without action
   */
  export type VtuberProfileCountOutputTypeCountThemesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeWhereInput
  }


  /**
   * Count Type SongCountOutputType
   */

  export type SongCountOutputType = {
    SongOccurrenceInLive: number
  }

  export type SongCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SongOccurrenceInLive?: boolean | SongCountOutputTypeCountSongOccurrenceInLiveArgs
  }

  // Custom InputTypes
  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongCountOutputType
     */
    select?: SongCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountSongOccurrenceInLiveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongOccurrenceInLiveWhereInput
  }


  /**
   * Count Type LiveRecordingArchiveCountOutputType
   */

  export type LiveRecordingArchiveCountOutputType = {
    SongOccurrenceInLive: number
  }

  export type LiveRecordingArchiveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SongOccurrenceInLive?: boolean | LiveRecordingArchiveCountOutputTypeCountSongOccurrenceInLiveArgs
  }

  // Custom InputTypes
  /**
   * LiveRecordingArchiveCountOutputType without action
   */
  export type LiveRecordingArchiveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchiveCountOutputType
     */
    select?: LiveRecordingArchiveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LiveRecordingArchiveCountOutputType without action
   */
  export type LiveRecordingArchiveCountOutputTypeCountSongOccurrenceInLiveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongOccurrenceInLiveWhereInput
  }


  /**
   * Models
   */

  /**
   * Model VtuberProfile
   */

  export type AggregateVtuberProfile = {
    _count: VtuberProfileCountAggregateOutputType | null
    _avg: VtuberProfileAvgAggregateOutputType | null
    _sum: VtuberProfileSumAggregateOutputType | null
    _min: VtuberProfileMinAggregateOutputType | null
    _max: VtuberProfileMaxAggregateOutputType | null
  }

  export type VtuberProfileAvgAggregateOutputType = {
    id: number | null
    defaultThemeId: number | null
  }

  export type VtuberProfileSumAggregateOutputType = {
    id: number | null
    defaultThemeId: number | null
  }

  export type VtuberProfileMinAggregateOutputType = {
    id: number | null
    name: string | null
    metaTitle: string | null
    metaDescription: string | null
    defaultThemeId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type VtuberProfileMaxAggregateOutputType = {
    id: number | null
    name: string | null
    metaTitle: string | null
    metaDescription: string | null
    defaultThemeId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type VtuberProfileCountAggregateOutputType = {
    id: number
    name: number
    metaTitle: number
    metaDescription: number
    defaultThemeId: number
    createdOn: number
    updatedOn: number
    _all: number
  }


  export type VtuberProfileAvgAggregateInputType = {
    id?: true
    defaultThemeId?: true
  }

  export type VtuberProfileSumAggregateInputType = {
    id?: true
    defaultThemeId?: true
  }

  export type VtuberProfileMinAggregateInputType = {
    id?: true
    name?: true
    metaTitle?: true
    metaDescription?: true
    defaultThemeId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type VtuberProfileMaxAggregateInputType = {
    id?: true
    name?: true
    metaTitle?: true
    metaDescription?: true
    defaultThemeId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type VtuberProfileCountAggregateInputType = {
    id?: true
    name?: true
    metaTitle?: true
    metaDescription?: true
    defaultThemeId?: true
    createdOn?: true
    updatedOn?: true
    _all?: true
  }

  export type VtuberProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VtuberProfile to aggregate.
     */
    where?: VtuberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberProfiles to fetch.
     */
    orderBy?: VtuberProfileOrderByWithRelationInput | VtuberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VtuberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VtuberProfiles
    **/
    _count?: true | VtuberProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VtuberProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VtuberProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VtuberProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VtuberProfileMaxAggregateInputType
  }

  export type GetVtuberProfileAggregateType<T extends VtuberProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateVtuberProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVtuberProfile[P]>
      : GetScalarType<T[P], AggregateVtuberProfile[P]>
  }




  export type VtuberProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VtuberProfileWhereInput
    orderBy?: VtuberProfileOrderByWithAggregationInput | VtuberProfileOrderByWithAggregationInput[]
    by: VtuberProfileScalarFieldEnum[] | VtuberProfileScalarFieldEnum
    having?: VtuberProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VtuberProfileCountAggregateInputType | true
    _avg?: VtuberProfileAvgAggregateInputType
    _sum?: VtuberProfileSumAggregateInputType
    _min?: VtuberProfileMinAggregateInputType
    _max?: VtuberProfileMaxAggregateInputType
  }

  export type VtuberProfileGroupByOutputType = {
    id: number
    name: string
    metaTitle: string | null
    metaDescription: string | null
    defaultThemeId: number | null
    createdOn: Date
    updatedOn: Date
    _count: VtuberProfileCountAggregateOutputType | null
    _avg: VtuberProfileAvgAggregateOutputType | null
    _sum: VtuberProfileSumAggregateOutputType | null
    _min: VtuberProfileMinAggregateOutputType | null
    _max: VtuberProfileMaxAggregateOutputType | null
  }

  type GetVtuberProfileGroupByPayload<T extends VtuberProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VtuberProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VtuberProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VtuberProfileGroupByOutputType[P]>
            : GetScalarType<T[P], VtuberProfileGroupByOutputType[P]>
        }
      >
    >


  export type VtuberProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    defaultThemeId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
    externalLinks?: boolean | VtuberProfile$externalLinksArgs<ExtArgs>
    themes?: boolean | VtuberProfile$themesArgs<ExtArgs>
    _count?: boolean | VtuberProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberProfile"]>

  export type VtuberProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    defaultThemeId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberProfile"]>

  export type VtuberProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    defaultThemeId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberProfile"]>

  export type VtuberProfileSelectScalar = {
    id?: boolean
    name?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    defaultThemeId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
  }

  export type VtuberProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "metaTitle" | "metaDescription" | "defaultThemeId" | "createdOn" | "updatedOn", ExtArgs["result"]["vtuberProfile"]>
  export type VtuberProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
    externalLinks?: boolean | VtuberProfile$externalLinksArgs<ExtArgs>
    themes?: boolean | VtuberProfile$themesArgs<ExtArgs>
    _count?: boolean | VtuberProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VtuberProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
  }
  export type VtuberProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    defaultTheme?: boolean | VtuberProfile$defaultThemeArgs<ExtArgs>
  }

  export type $VtuberProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VtuberProfile"
    objects: {
      /**
       * Default theme relation
       */
      defaultTheme: Prisma.$ThemePayload<ExtArgs> | null
      /**
       * External links for the vtuber
       */
      externalLinks: Prisma.$VtuberExternalLinkPayload<ExtArgs>[]
      /**
       * Available themes for this vtuber
       */
      themes: Prisma.$ThemePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      /**
       * Name of the vtuber
       */
      name: string
      /**
       * Meta title for SEO
       */
      metaTitle: string | null
      /**
       * Meta description for SEO
       */
      metaDescription: string | null
      /**
       * Default theme ID
       */
      defaultThemeId: number | null
      /**
       * When this profile was created
       */
      createdOn: Date
      /**
       * When this profile was last updated
       */
      updatedOn: Date
    }, ExtArgs["result"]["vtuberProfile"]>
    composites: {}
  }

  type VtuberProfileGetPayload<S extends boolean | null | undefined | VtuberProfileDefaultArgs> = $Result.GetResult<Prisma.$VtuberProfilePayload, S>

  type VtuberProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VtuberProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VtuberProfileCountAggregateInputType | true
    }

  export interface VtuberProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VtuberProfile'], meta: { name: 'VtuberProfile' } }
    /**
     * Find zero or one VtuberProfile that matches the filter.
     * @param {VtuberProfileFindUniqueArgs} args - Arguments to find a VtuberProfile
     * @example
     * // Get one VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VtuberProfileFindUniqueArgs>(args: SelectSubset<T, VtuberProfileFindUniqueArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VtuberProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VtuberProfileFindUniqueOrThrowArgs} args - Arguments to find a VtuberProfile
     * @example
     * // Get one VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VtuberProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, VtuberProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VtuberProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileFindFirstArgs} args - Arguments to find a VtuberProfile
     * @example
     * // Get one VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VtuberProfileFindFirstArgs>(args?: SelectSubset<T, VtuberProfileFindFirstArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VtuberProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileFindFirstOrThrowArgs} args - Arguments to find a VtuberProfile
     * @example
     * // Get one VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VtuberProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, VtuberProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VtuberProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VtuberProfiles
     * const vtuberProfiles = await prisma.vtuberProfile.findMany()
     * 
     * // Get first 10 VtuberProfiles
     * const vtuberProfiles = await prisma.vtuberProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vtuberProfileWithIdOnly = await prisma.vtuberProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VtuberProfileFindManyArgs>(args?: SelectSubset<T, VtuberProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VtuberProfile.
     * @param {VtuberProfileCreateArgs} args - Arguments to create a VtuberProfile.
     * @example
     * // Create one VtuberProfile
     * const VtuberProfile = await prisma.vtuberProfile.create({
     *   data: {
     *     // ... data to create a VtuberProfile
     *   }
     * })
     * 
     */
    create<T extends VtuberProfileCreateArgs>(args: SelectSubset<T, VtuberProfileCreateArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VtuberProfiles.
     * @param {VtuberProfileCreateManyArgs} args - Arguments to create many VtuberProfiles.
     * @example
     * // Create many VtuberProfiles
     * const vtuberProfile = await prisma.vtuberProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VtuberProfileCreateManyArgs>(args?: SelectSubset<T, VtuberProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VtuberProfiles and returns the data saved in the database.
     * @param {VtuberProfileCreateManyAndReturnArgs} args - Arguments to create many VtuberProfiles.
     * @example
     * // Create many VtuberProfiles
     * const vtuberProfile = await prisma.vtuberProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VtuberProfiles and only return the `id`
     * const vtuberProfileWithIdOnly = await prisma.vtuberProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VtuberProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, VtuberProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VtuberProfile.
     * @param {VtuberProfileDeleteArgs} args - Arguments to delete one VtuberProfile.
     * @example
     * // Delete one VtuberProfile
     * const VtuberProfile = await prisma.vtuberProfile.delete({
     *   where: {
     *     // ... filter to delete one VtuberProfile
     *   }
     * })
     * 
     */
    delete<T extends VtuberProfileDeleteArgs>(args: SelectSubset<T, VtuberProfileDeleteArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VtuberProfile.
     * @param {VtuberProfileUpdateArgs} args - Arguments to update one VtuberProfile.
     * @example
     * // Update one VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VtuberProfileUpdateArgs>(args: SelectSubset<T, VtuberProfileUpdateArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VtuberProfiles.
     * @param {VtuberProfileDeleteManyArgs} args - Arguments to filter VtuberProfiles to delete.
     * @example
     * // Delete a few VtuberProfiles
     * const { count } = await prisma.vtuberProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VtuberProfileDeleteManyArgs>(args?: SelectSubset<T, VtuberProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VtuberProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VtuberProfiles
     * const vtuberProfile = await prisma.vtuberProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VtuberProfileUpdateManyArgs>(args: SelectSubset<T, VtuberProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VtuberProfiles and returns the data updated in the database.
     * @param {VtuberProfileUpdateManyAndReturnArgs} args - Arguments to update many VtuberProfiles.
     * @example
     * // Update many VtuberProfiles
     * const vtuberProfile = await prisma.vtuberProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VtuberProfiles and only return the `id`
     * const vtuberProfileWithIdOnly = await prisma.vtuberProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VtuberProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, VtuberProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VtuberProfile.
     * @param {VtuberProfileUpsertArgs} args - Arguments to update or create a VtuberProfile.
     * @example
     * // Update or create a VtuberProfile
     * const vtuberProfile = await prisma.vtuberProfile.upsert({
     *   create: {
     *     // ... data to create a VtuberProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VtuberProfile we want to update
     *   }
     * })
     */
    upsert<T extends VtuberProfileUpsertArgs>(args: SelectSubset<T, VtuberProfileUpsertArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VtuberProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileCountArgs} args - Arguments to filter VtuberProfiles to count.
     * @example
     * // Count the number of VtuberProfiles
     * const count = await prisma.vtuberProfile.count({
     *   where: {
     *     // ... the filter for the VtuberProfiles we want to count
     *   }
     * })
    **/
    count<T extends VtuberProfileCountArgs>(
      args?: Subset<T, VtuberProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VtuberProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VtuberProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VtuberProfileAggregateArgs>(args: Subset<T, VtuberProfileAggregateArgs>): Prisma.PrismaPromise<GetVtuberProfileAggregateType<T>>

    /**
     * Group by VtuberProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VtuberProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VtuberProfileGroupByArgs['orderBy'] }
        : { orderBy?: VtuberProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VtuberProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVtuberProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VtuberProfile model
   */
  readonly fields: VtuberProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VtuberProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VtuberProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    defaultTheme<T extends VtuberProfile$defaultThemeArgs<ExtArgs> = {}>(args?: Subset<T, VtuberProfile$defaultThemeArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    externalLinks<T extends VtuberProfile$externalLinksArgs<ExtArgs> = {}>(args?: Subset<T, VtuberProfile$externalLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    themes<T extends VtuberProfile$themesArgs<ExtArgs> = {}>(args?: Subset<T, VtuberProfile$themesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VtuberProfile model
   */
  interface VtuberProfileFieldRefs {
    readonly id: FieldRef<"VtuberProfile", 'Int'>
    readonly name: FieldRef<"VtuberProfile", 'String'>
    readonly metaTitle: FieldRef<"VtuberProfile", 'String'>
    readonly metaDescription: FieldRef<"VtuberProfile", 'String'>
    readonly defaultThemeId: FieldRef<"VtuberProfile", 'Int'>
    readonly createdOn: FieldRef<"VtuberProfile", 'DateTime'>
    readonly updatedOn: FieldRef<"VtuberProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VtuberProfile findUnique
   */
  export type VtuberProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter, which VtuberProfile to fetch.
     */
    where: VtuberProfileWhereUniqueInput
  }

  /**
   * VtuberProfile findUniqueOrThrow
   */
  export type VtuberProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter, which VtuberProfile to fetch.
     */
    where: VtuberProfileWhereUniqueInput
  }

  /**
   * VtuberProfile findFirst
   */
  export type VtuberProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter, which VtuberProfile to fetch.
     */
    where?: VtuberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberProfiles to fetch.
     */
    orderBy?: VtuberProfileOrderByWithRelationInput | VtuberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VtuberProfiles.
     */
    cursor?: VtuberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VtuberProfiles.
     */
    distinct?: VtuberProfileScalarFieldEnum | VtuberProfileScalarFieldEnum[]
  }

  /**
   * VtuberProfile findFirstOrThrow
   */
  export type VtuberProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter, which VtuberProfile to fetch.
     */
    where?: VtuberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberProfiles to fetch.
     */
    orderBy?: VtuberProfileOrderByWithRelationInput | VtuberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VtuberProfiles.
     */
    cursor?: VtuberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VtuberProfiles.
     */
    distinct?: VtuberProfileScalarFieldEnum | VtuberProfileScalarFieldEnum[]
  }

  /**
   * VtuberProfile findMany
   */
  export type VtuberProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter, which VtuberProfiles to fetch.
     */
    where?: VtuberProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberProfiles to fetch.
     */
    orderBy?: VtuberProfileOrderByWithRelationInput | VtuberProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VtuberProfiles.
     */
    cursor?: VtuberProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberProfiles.
     */
    skip?: number
    distinct?: VtuberProfileScalarFieldEnum | VtuberProfileScalarFieldEnum[]
  }

  /**
   * VtuberProfile create
   */
  export type VtuberProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a VtuberProfile.
     */
    data: XOR<VtuberProfileCreateInput, VtuberProfileUncheckedCreateInput>
  }

  /**
   * VtuberProfile createMany
   */
  export type VtuberProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VtuberProfiles.
     */
    data: VtuberProfileCreateManyInput | VtuberProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VtuberProfile createManyAndReturn
   */
  export type VtuberProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * The data used to create many VtuberProfiles.
     */
    data: VtuberProfileCreateManyInput | VtuberProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VtuberProfile update
   */
  export type VtuberProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a VtuberProfile.
     */
    data: XOR<VtuberProfileUpdateInput, VtuberProfileUncheckedUpdateInput>
    /**
     * Choose, which VtuberProfile to update.
     */
    where: VtuberProfileWhereUniqueInput
  }

  /**
   * VtuberProfile updateMany
   */
  export type VtuberProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VtuberProfiles.
     */
    data: XOR<VtuberProfileUpdateManyMutationInput, VtuberProfileUncheckedUpdateManyInput>
    /**
     * Filter which VtuberProfiles to update
     */
    where?: VtuberProfileWhereInput
    /**
     * Limit how many VtuberProfiles to update.
     */
    limit?: number
  }

  /**
   * VtuberProfile updateManyAndReturn
   */
  export type VtuberProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * The data used to update VtuberProfiles.
     */
    data: XOR<VtuberProfileUpdateManyMutationInput, VtuberProfileUncheckedUpdateManyInput>
    /**
     * Filter which VtuberProfiles to update
     */
    where?: VtuberProfileWhereInput
    /**
     * Limit how many VtuberProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VtuberProfile upsert
   */
  export type VtuberProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the VtuberProfile to update in case it exists.
     */
    where: VtuberProfileWhereUniqueInput
    /**
     * In case the VtuberProfile found by the `where` argument doesn't exist, create a new VtuberProfile with this data.
     */
    create: XOR<VtuberProfileCreateInput, VtuberProfileUncheckedCreateInput>
    /**
     * In case the VtuberProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VtuberProfileUpdateInput, VtuberProfileUncheckedUpdateInput>
  }

  /**
   * VtuberProfile delete
   */
  export type VtuberProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    /**
     * Filter which VtuberProfile to delete.
     */
    where: VtuberProfileWhereUniqueInput
  }

  /**
   * VtuberProfile deleteMany
   */
  export type VtuberProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VtuberProfiles to delete
     */
    where?: VtuberProfileWhereInput
    /**
     * Limit how many VtuberProfiles to delete.
     */
    limit?: number
  }

  /**
   * VtuberProfile.defaultTheme
   */
  export type VtuberProfile$defaultThemeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    where?: ThemeWhereInput
  }

  /**
   * VtuberProfile.externalLinks
   */
  export type VtuberProfile$externalLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    where?: VtuberExternalLinkWhereInput
    orderBy?: VtuberExternalLinkOrderByWithRelationInput | VtuberExternalLinkOrderByWithRelationInput[]
    cursor?: VtuberExternalLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VtuberExternalLinkScalarFieldEnum | VtuberExternalLinkScalarFieldEnum[]
  }

  /**
   * VtuberProfile.themes
   */
  export type VtuberProfile$themesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    where?: ThemeWhereInput
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    cursor?: ThemeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * VtuberProfile without action
   */
  export type VtuberProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
  }


  /**
   * Model Theme
   */

  export type AggregateTheme = {
    _count: ThemeCountAggregateOutputType | null
    _avg: ThemeAvgAggregateOutputType | null
    _sum: ThemeSumAggregateOutputType | null
    _min: ThemeMinAggregateOutputType | null
    _max: ThemeMaxAggregateOutputType | null
  }

  export type ThemeAvgAggregateOutputType = {
    id: number | null
    vtuberProfileId: number | null
  }

  export type ThemeSumAggregateOutputType = {
    id: number | null
    vtuberProfileId: number | null
  }

  export type ThemeMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    avatarImagePath: string | null
    backgroundImagePath: string | null
    isActive: boolean | null
    vtuberProfileId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type ThemeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    avatarImagePath: string | null
    backgroundImagePath: string | null
    isActive: boolean | null
    vtuberProfileId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type ThemeCountAggregateOutputType = {
    id: number
    name: number
    description: number
    avatarImagePath: number
    backgroundImagePath: number
    isActive: number
    vtuberProfileId: number
    createdOn: number
    updatedOn: number
    _all: number
  }


  export type ThemeAvgAggregateInputType = {
    id?: true
    vtuberProfileId?: true
  }

  export type ThemeSumAggregateInputType = {
    id?: true
    vtuberProfileId?: true
  }

  export type ThemeMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatarImagePath?: true
    backgroundImagePath?: true
    isActive?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type ThemeMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatarImagePath?: true
    backgroundImagePath?: true
    isActive?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type ThemeCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatarImagePath?: true
    backgroundImagePath?: true
    isActive?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
    _all?: true
  }

  export type ThemeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Theme to aggregate.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Themes
    **/
    _count?: true | ThemeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ThemeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ThemeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThemeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThemeMaxAggregateInputType
  }

  export type GetThemeAggregateType<T extends ThemeAggregateArgs> = {
        [P in keyof T & keyof AggregateTheme]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTheme[P]>
      : GetScalarType<T[P], AggregateTheme[P]>
  }




  export type ThemeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ThemeWhereInput
    orderBy?: ThemeOrderByWithAggregationInput | ThemeOrderByWithAggregationInput[]
    by: ThemeScalarFieldEnum[] | ThemeScalarFieldEnum
    having?: ThemeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThemeCountAggregateInputType | true
    _avg?: ThemeAvgAggregateInputType
    _sum?: ThemeSumAggregateInputType
    _min?: ThemeMinAggregateInputType
    _max?: ThemeMaxAggregateInputType
  }

  export type ThemeGroupByOutputType = {
    id: number
    name: string
    description: string | null
    avatarImagePath: string
    backgroundImagePath: string | null
    isActive: boolean
    vtuberProfileId: number
    createdOn: Date
    updatedOn: Date
    _count: ThemeCountAggregateOutputType | null
    _avg: ThemeAvgAggregateOutputType | null
    _sum: ThemeSumAggregateOutputType | null
    _min: ThemeMinAggregateOutputType | null
    _max: ThemeMaxAggregateOutputType | null
  }

  type GetThemeGroupByPayload<T extends ThemeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThemeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThemeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThemeGroupByOutputType[P]>
            : GetScalarType<T[P], ThemeGroupByOutputType[P]>
        }
      >
    >


  export type ThemeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatarImagePath?: boolean
    backgroundImagePath?: boolean
    isActive?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
    defaultForProfile?: boolean | Theme$defaultForProfileArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatarImagePath?: boolean
    backgroundImagePath?: boolean
    isActive?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatarImagePath?: boolean
    backgroundImagePath?: boolean
    isActive?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["theme"]>

  export type ThemeSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    avatarImagePath?: boolean
    backgroundImagePath?: boolean
    isActive?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
  }

  export type ThemeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "avatarImagePath" | "backgroundImagePath" | "isActive" | "vtuberProfileId" | "createdOn" | "updatedOn", ExtArgs["result"]["theme"]>
  export type ThemeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
    defaultForProfile?: boolean | Theme$defaultForProfileArgs<ExtArgs>
  }
  export type ThemeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }
  export type ThemeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }

  export type $ThemePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Theme"
    objects: {
      vtuberProfile: Prisma.$VtuberProfilePayload<ExtArgs>
      /**
       * Default theme relation (reverse)
       */
      defaultForProfile: Prisma.$VtuberProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      /**
       * Name of the theme
       */
      name: string
      /**
       * Description of the theme
       */
      description: string | null
      /**
       * Avatar image URL for user navigation
       */
      avatarImagePath: string
      /**
       * Background image URL
       */
      backgroundImagePath: string | null
      /**
       * Whether this theme is active
       */
      isActive: boolean
      /**
       * Vtuber profile that owns this theme
       */
      vtuberProfileId: number
      /**
       * When this theme was created
       */
      createdOn: Date
      /**
       * When this theme was last updated
       */
      updatedOn: Date
    }, ExtArgs["result"]["theme"]>
    composites: {}
  }

  type ThemeGetPayload<S extends boolean | null | undefined | ThemeDefaultArgs> = $Result.GetResult<Prisma.$ThemePayload, S>

  type ThemeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ThemeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThemeCountAggregateInputType | true
    }

  export interface ThemeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Theme'], meta: { name: 'Theme' } }
    /**
     * Find zero or one Theme that matches the filter.
     * @param {ThemeFindUniqueArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ThemeFindUniqueArgs>(args: SelectSubset<T, ThemeFindUniqueArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Theme that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ThemeFindUniqueOrThrowArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ThemeFindUniqueOrThrowArgs>(args: SelectSubset<T, ThemeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theme that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindFirstArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ThemeFindFirstArgs>(args?: SelectSubset<T, ThemeFindFirstArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Theme that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindFirstOrThrowArgs} args - Arguments to find a Theme
     * @example
     * // Get one Theme
     * const theme = await prisma.theme.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ThemeFindFirstOrThrowArgs>(args?: SelectSubset<T, ThemeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Themes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Themes
     * const themes = await prisma.theme.findMany()
     * 
     * // Get first 10 Themes
     * const themes = await prisma.theme.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const themeWithIdOnly = await prisma.theme.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ThemeFindManyArgs>(args?: SelectSubset<T, ThemeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Theme.
     * @param {ThemeCreateArgs} args - Arguments to create a Theme.
     * @example
     * // Create one Theme
     * const Theme = await prisma.theme.create({
     *   data: {
     *     // ... data to create a Theme
     *   }
     * })
     * 
     */
    create<T extends ThemeCreateArgs>(args: SelectSubset<T, ThemeCreateArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Themes.
     * @param {ThemeCreateManyArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const theme = await prisma.theme.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ThemeCreateManyArgs>(args?: SelectSubset<T, ThemeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Themes and returns the data saved in the database.
     * @param {ThemeCreateManyAndReturnArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const theme = await prisma.theme.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Themes and only return the `id`
     * const themeWithIdOnly = await prisma.theme.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ThemeCreateManyAndReturnArgs>(args?: SelectSubset<T, ThemeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Theme.
     * @param {ThemeDeleteArgs} args - Arguments to delete one Theme.
     * @example
     * // Delete one Theme
     * const Theme = await prisma.theme.delete({
     *   where: {
     *     // ... filter to delete one Theme
     *   }
     * })
     * 
     */
    delete<T extends ThemeDeleteArgs>(args: SelectSubset<T, ThemeDeleteArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Theme.
     * @param {ThemeUpdateArgs} args - Arguments to update one Theme.
     * @example
     * // Update one Theme
     * const theme = await prisma.theme.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ThemeUpdateArgs>(args: SelectSubset<T, ThemeUpdateArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Themes.
     * @param {ThemeDeleteManyArgs} args - Arguments to filter Themes to delete.
     * @example
     * // Delete a few Themes
     * const { count } = await prisma.theme.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ThemeDeleteManyArgs>(args?: SelectSubset<T, ThemeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Themes
     * const theme = await prisma.theme.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ThemeUpdateManyArgs>(args: SelectSubset<T, ThemeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes and returns the data updated in the database.
     * @param {ThemeUpdateManyAndReturnArgs} args - Arguments to update many Themes.
     * @example
     * // Update many Themes
     * const theme = await prisma.theme.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Themes and only return the `id`
     * const themeWithIdOnly = await prisma.theme.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ThemeUpdateManyAndReturnArgs>(args: SelectSubset<T, ThemeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Theme.
     * @param {ThemeUpsertArgs} args - Arguments to update or create a Theme.
     * @example
     * // Update or create a Theme
     * const theme = await prisma.theme.upsert({
     *   create: {
     *     // ... data to create a Theme
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Theme we want to update
     *   }
     * })
     */
    upsert<T extends ThemeUpsertArgs>(args: SelectSubset<T, ThemeUpsertArgs<ExtArgs>>): Prisma__ThemeClient<$Result.GetResult<Prisma.$ThemePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeCountArgs} args - Arguments to filter Themes to count.
     * @example
     * // Count the number of Themes
     * const count = await prisma.theme.count({
     *   where: {
     *     // ... the filter for the Themes we want to count
     *   }
     * })
    **/
    count<T extends ThemeCountArgs>(
      args?: Subset<T, ThemeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThemeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Theme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThemeAggregateArgs>(args: Subset<T, ThemeAggregateArgs>): Prisma.PrismaPromise<GetThemeAggregateType<T>>

    /**
     * Group by Theme.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ThemeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ThemeGroupByArgs['orderBy'] }
        : { orderBy?: ThemeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ThemeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThemeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Theme model
   */
  readonly fields: ThemeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Theme.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ThemeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vtuberProfile<T extends VtuberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VtuberProfileDefaultArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    defaultForProfile<T extends Theme$defaultForProfileArgs<ExtArgs> = {}>(args?: Subset<T, Theme$defaultForProfileArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Theme model
   */
  interface ThemeFieldRefs {
    readonly id: FieldRef<"Theme", 'Int'>
    readonly name: FieldRef<"Theme", 'String'>
    readonly description: FieldRef<"Theme", 'String'>
    readonly avatarImagePath: FieldRef<"Theme", 'String'>
    readonly backgroundImagePath: FieldRef<"Theme", 'String'>
    readonly isActive: FieldRef<"Theme", 'Boolean'>
    readonly vtuberProfileId: FieldRef<"Theme", 'Int'>
    readonly createdOn: FieldRef<"Theme", 'DateTime'>
    readonly updatedOn: FieldRef<"Theme", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Theme findUnique
   */
  export type ThemeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme findUniqueOrThrow
   */
  export type ThemeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme findFirst
   */
  export type ThemeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Themes.
     */
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme findFirstOrThrow
   */
  export type ThemeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Theme to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Themes.
     */
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme findMany
   */
  export type ThemeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter, which Themes to fetch.
     */
    where?: ThemeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Themes to fetch.
     */
    orderBy?: ThemeOrderByWithRelationInput | ThemeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Themes.
     */
    cursor?: ThemeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Themes.
     */
    skip?: number
    distinct?: ThemeScalarFieldEnum | ThemeScalarFieldEnum[]
  }

  /**
   * Theme create
   */
  export type ThemeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The data needed to create a Theme.
     */
    data: XOR<ThemeCreateInput, ThemeUncheckedCreateInput>
  }

  /**
   * Theme createMany
   */
  export type ThemeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Themes.
     */
    data: ThemeCreateManyInput | ThemeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Theme createManyAndReturn
   */
  export type ThemeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * The data used to create many Themes.
     */
    data: ThemeCreateManyInput | ThemeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Theme update
   */
  export type ThemeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The data needed to update a Theme.
     */
    data: XOR<ThemeUpdateInput, ThemeUncheckedUpdateInput>
    /**
     * Choose, which Theme to update.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme updateMany
   */
  export type ThemeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Themes.
     */
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyInput>
    /**
     * Filter which Themes to update
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to update.
     */
    limit?: number
  }

  /**
   * Theme updateManyAndReturn
   */
  export type ThemeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * The data used to update Themes.
     */
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyInput>
    /**
     * Filter which Themes to update
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Theme upsert
   */
  export type ThemeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * The filter to search for the Theme to update in case it exists.
     */
    where: ThemeWhereUniqueInput
    /**
     * In case the Theme found by the `where` argument doesn't exist, create a new Theme with this data.
     */
    create: XOR<ThemeCreateInput, ThemeUncheckedCreateInput>
    /**
     * In case the Theme was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ThemeUpdateInput, ThemeUncheckedUpdateInput>
  }

  /**
   * Theme delete
   */
  export type ThemeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
    /**
     * Filter which Theme to delete.
     */
    where: ThemeWhereUniqueInput
  }

  /**
   * Theme deleteMany
   */
  export type ThemeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Themes to delete
     */
    where?: ThemeWhereInput
    /**
     * Limit how many Themes to delete.
     */
    limit?: number
  }

  /**
   * Theme.defaultForProfile
   */
  export type Theme$defaultForProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberProfile
     */
    select?: VtuberProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberProfile
     */
    omit?: VtuberProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberProfileInclude<ExtArgs> | null
    where?: VtuberProfileWhereInput
  }

  /**
   * Theme without action
   */
  export type ThemeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Theme
     */
    select?: ThemeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Theme
     */
    omit?: ThemeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ThemeInclude<ExtArgs> | null
  }


  /**
   * Model VtuberExternalLink
   */

  export type AggregateVtuberExternalLink = {
    _count: VtuberExternalLinkCountAggregateOutputType | null
    _avg: VtuberExternalLinkAvgAggregateOutputType | null
    _sum: VtuberExternalLinkSumAggregateOutputType | null
    _min: VtuberExternalLinkMinAggregateOutputType | null
    _max: VtuberExternalLinkMaxAggregateOutputType | null
  }

  export type VtuberExternalLinkAvgAggregateOutputType = {
    id: number | null
    displayOrder: number | null
    vtuberProfileId: number | null
  }

  export type VtuberExternalLinkSumAggregateOutputType = {
    id: number | null
    displayOrder: number | null
    vtuberProfileId: number | null
  }

  export type VtuberExternalLinkMinAggregateOutputType = {
    id: number | null
    value: string | null
    icon: string | null
    href: string | null
    displayOrder: number | null
    vtuberProfileId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type VtuberExternalLinkMaxAggregateOutputType = {
    id: number | null
    value: string | null
    icon: string | null
    href: string | null
    displayOrder: number | null
    vtuberProfileId: number | null
    createdOn: Date | null
    updatedOn: Date | null
  }

  export type VtuberExternalLinkCountAggregateOutputType = {
    id: number
    value: number
    icon: number
    href: number
    displayOrder: number
    vtuberProfileId: number
    createdOn: number
    updatedOn: number
    _all: number
  }


  export type VtuberExternalLinkAvgAggregateInputType = {
    id?: true
    displayOrder?: true
    vtuberProfileId?: true
  }

  export type VtuberExternalLinkSumAggregateInputType = {
    id?: true
    displayOrder?: true
    vtuberProfileId?: true
  }

  export type VtuberExternalLinkMinAggregateInputType = {
    id?: true
    value?: true
    icon?: true
    href?: true
    displayOrder?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type VtuberExternalLinkMaxAggregateInputType = {
    id?: true
    value?: true
    icon?: true
    href?: true
    displayOrder?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
  }

  export type VtuberExternalLinkCountAggregateInputType = {
    id?: true
    value?: true
    icon?: true
    href?: true
    displayOrder?: true
    vtuberProfileId?: true
    createdOn?: true
    updatedOn?: true
    _all?: true
  }

  export type VtuberExternalLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VtuberExternalLink to aggregate.
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberExternalLinks to fetch.
     */
    orderBy?: VtuberExternalLinkOrderByWithRelationInput | VtuberExternalLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VtuberExternalLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberExternalLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberExternalLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VtuberExternalLinks
    **/
    _count?: true | VtuberExternalLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VtuberExternalLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VtuberExternalLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VtuberExternalLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VtuberExternalLinkMaxAggregateInputType
  }

  export type GetVtuberExternalLinkAggregateType<T extends VtuberExternalLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateVtuberExternalLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVtuberExternalLink[P]>
      : GetScalarType<T[P], AggregateVtuberExternalLink[P]>
  }




  export type VtuberExternalLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VtuberExternalLinkWhereInput
    orderBy?: VtuberExternalLinkOrderByWithAggregationInput | VtuberExternalLinkOrderByWithAggregationInput[]
    by: VtuberExternalLinkScalarFieldEnum[] | VtuberExternalLinkScalarFieldEnum
    having?: VtuberExternalLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VtuberExternalLinkCountAggregateInputType | true
    _avg?: VtuberExternalLinkAvgAggregateInputType
    _sum?: VtuberExternalLinkSumAggregateInputType
    _min?: VtuberExternalLinkMinAggregateInputType
    _max?: VtuberExternalLinkMaxAggregateInputType
  }

  export type VtuberExternalLinkGroupByOutputType = {
    id: number
    value: string
    icon: string | null
    href: string
    displayOrder: number
    vtuberProfileId: number
    createdOn: Date
    updatedOn: Date
    _count: VtuberExternalLinkCountAggregateOutputType | null
    _avg: VtuberExternalLinkAvgAggregateOutputType | null
    _sum: VtuberExternalLinkSumAggregateOutputType | null
    _min: VtuberExternalLinkMinAggregateOutputType | null
    _max: VtuberExternalLinkMaxAggregateOutputType | null
  }

  type GetVtuberExternalLinkGroupByPayload<T extends VtuberExternalLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VtuberExternalLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VtuberExternalLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VtuberExternalLinkGroupByOutputType[P]>
            : GetScalarType<T[P], VtuberExternalLinkGroupByOutputType[P]>
        }
      >
    >


  export type VtuberExternalLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    icon?: boolean
    href?: boolean
    displayOrder?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberExternalLink"]>

  export type VtuberExternalLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    icon?: boolean
    href?: boolean
    displayOrder?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberExternalLink"]>

  export type VtuberExternalLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    icon?: boolean
    href?: boolean
    displayOrder?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vtuberExternalLink"]>

  export type VtuberExternalLinkSelectScalar = {
    id?: boolean
    value?: boolean
    icon?: boolean
    href?: boolean
    displayOrder?: boolean
    vtuberProfileId?: boolean
    createdOn?: boolean
    updatedOn?: boolean
  }

  export type VtuberExternalLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "icon" | "href" | "displayOrder" | "vtuberProfileId" | "createdOn" | "updatedOn", ExtArgs["result"]["vtuberExternalLink"]>
  export type VtuberExternalLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }
  export type VtuberExternalLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }
  export type VtuberExternalLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vtuberProfile?: boolean | VtuberProfileDefaultArgs<ExtArgs>
  }

  export type $VtuberExternalLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VtuberExternalLink"
    objects: {
      vtuberProfile: Prisma.$VtuberProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      /**
       * Display text for the link
       */
      value: string
      /**
       * Icon identifier for the link
       */
      icon: string | null
      /**
       * URL for the link
       */
      href: string
      /**
       * Order for display
       */
      displayOrder: number
      /**
       * Vtuber profile that owns this link
       */
      vtuberProfileId: number
      /**
       * When this link was created
       */
      createdOn: Date
      /**
       * When this link was last updated
       */
      updatedOn: Date
    }, ExtArgs["result"]["vtuberExternalLink"]>
    composites: {}
  }

  type VtuberExternalLinkGetPayload<S extends boolean | null | undefined | VtuberExternalLinkDefaultArgs> = $Result.GetResult<Prisma.$VtuberExternalLinkPayload, S>

  type VtuberExternalLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VtuberExternalLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VtuberExternalLinkCountAggregateInputType | true
    }

  export interface VtuberExternalLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VtuberExternalLink'], meta: { name: 'VtuberExternalLink' } }
    /**
     * Find zero or one VtuberExternalLink that matches the filter.
     * @param {VtuberExternalLinkFindUniqueArgs} args - Arguments to find a VtuberExternalLink
     * @example
     * // Get one VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VtuberExternalLinkFindUniqueArgs>(args: SelectSubset<T, VtuberExternalLinkFindUniqueArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VtuberExternalLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VtuberExternalLinkFindUniqueOrThrowArgs} args - Arguments to find a VtuberExternalLink
     * @example
     * // Get one VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VtuberExternalLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, VtuberExternalLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VtuberExternalLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkFindFirstArgs} args - Arguments to find a VtuberExternalLink
     * @example
     * // Get one VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VtuberExternalLinkFindFirstArgs>(args?: SelectSubset<T, VtuberExternalLinkFindFirstArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VtuberExternalLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkFindFirstOrThrowArgs} args - Arguments to find a VtuberExternalLink
     * @example
     * // Get one VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VtuberExternalLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, VtuberExternalLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VtuberExternalLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VtuberExternalLinks
     * const vtuberExternalLinks = await prisma.vtuberExternalLink.findMany()
     * 
     * // Get first 10 VtuberExternalLinks
     * const vtuberExternalLinks = await prisma.vtuberExternalLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vtuberExternalLinkWithIdOnly = await prisma.vtuberExternalLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VtuberExternalLinkFindManyArgs>(args?: SelectSubset<T, VtuberExternalLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VtuberExternalLink.
     * @param {VtuberExternalLinkCreateArgs} args - Arguments to create a VtuberExternalLink.
     * @example
     * // Create one VtuberExternalLink
     * const VtuberExternalLink = await prisma.vtuberExternalLink.create({
     *   data: {
     *     // ... data to create a VtuberExternalLink
     *   }
     * })
     * 
     */
    create<T extends VtuberExternalLinkCreateArgs>(args: SelectSubset<T, VtuberExternalLinkCreateArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VtuberExternalLinks.
     * @param {VtuberExternalLinkCreateManyArgs} args - Arguments to create many VtuberExternalLinks.
     * @example
     * // Create many VtuberExternalLinks
     * const vtuberExternalLink = await prisma.vtuberExternalLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VtuberExternalLinkCreateManyArgs>(args?: SelectSubset<T, VtuberExternalLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VtuberExternalLinks and returns the data saved in the database.
     * @param {VtuberExternalLinkCreateManyAndReturnArgs} args - Arguments to create many VtuberExternalLinks.
     * @example
     * // Create many VtuberExternalLinks
     * const vtuberExternalLink = await prisma.vtuberExternalLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VtuberExternalLinks and only return the `id`
     * const vtuberExternalLinkWithIdOnly = await prisma.vtuberExternalLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VtuberExternalLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, VtuberExternalLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VtuberExternalLink.
     * @param {VtuberExternalLinkDeleteArgs} args - Arguments to delete one VtuberExternalLink.
     * @example
     * // Delete one VtuberExternalLink
     * const VtuberExternalLink = await prisma.vtuberExternalLink.delete({
     *   where: {
     *     // ... filter to delete one VtuberExternalLink
     *   }
     * })
     * 
     */
    delete<T extends VtuberExternalLinkDeleteArgs>(args: SelectSubset<T, VtuberExternalLinkDeleteArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VtuberExternalLink.
     * @param {VtuberExternalLinkUpdateArgs} args - Arguments to update one VtuberExternalLink.
     * @example
     * // Update one VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VtuberExternalLinkUpdateArgs>(args: SelectSubset<T, VtuberExternalLinkUpdateArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VtuberExternalLinks.
     * @param {VtuberExternalLinkDeleteManyArgs} args - Arguments to filter VtuberExternalLinks to delete.
     * @example
     * // Delete a few VtuberExternalLinks
     * const { count } = await prisma.vtuberExternalLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VtuberExternalLinkDeleteManyArgs>(args?: SelectSubset<T, VtuberExternalLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VtuberExternalLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VtuberExternalLinks
     * const vtuberExternalLink = await prisma.vtuberExternalLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VtuberExternalLinkUpdateManyArgs>(args: SelectSubset<T, VtuberExternalLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VtuberExternalLinks and returns the data updated in the database.
     * @param {VtuberExternalLinkUpdateManyAndReturnArgs} args - Arguments to update many VtuberExternalLinks.
     * @example
     * // Update many VtuberExternalLinks
     * const vtuberExternalLink = await prisma.vtuberExternalLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VtuberExternalLinks and only return the `id`
     * const vtuberExternalLinkWithIdOnly = await prisma.vtuberExternalLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VtuberExternalLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, VtuberExternalLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VtuberExternalLink.
     * @param {VtuberExternalLinkUpsertArgs} args - Arguments to update or create a VtuberExternalLink.
     * @example
     * // Update or create a VtuberExternalLink
     * const vtuberExternalLink = await prisma.vtuberExternalLink.upsert({
     *   create: {
     *     // ... data to create a VtuberExternalLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VtuberExternalLink we want to update
     *   }
     * })
     */
    upsert<T extends VtuberExternalLinkUpsertArgs>(args: SelectSubset<T, VtuberExternalLinkUpsertArgs<ExtArgs>>): Prisma__VtuberExternalLinkClient<$Result.GetResult<Prisma.$VtuberExternalLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VtuberExternalLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkCountArgs} args - Arguments to filter VtuberExternalLinks to count.
     * @example
     * // Count the number of VtuberExternalLinks
     * const count = await prisma.vtuberExternalLink.count({
     *   where: {
     *     // ... the filter for the VtuberExternalLinks we want to count
     *   }
     * })
    **/
    count<T extends VtuberExternalLinkCountArgs>(
      args?: Subset<T, VtuberExternalLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VtuberExternalLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VtuberExternalLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VtuberExternalLinkAggregateArgs>(args: Subset<T, VtuberExternalLinkAggregateArgs>): Prisma.PrismaPromise<GetVtuberExternalLinkAggregateType<T>>

    /**
     * Group by VtuberExternalLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VtuberExternalLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VtuberExternalLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VtuberExternalLinkGroupByArgs['orderBy'] }
        : { orderBy?: VtuberExternalLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VtuberExternalLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVtuberExternalLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VtuberExternalLink model
   */
  readonly fields: VtuberExternalLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VtuberExternalLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VtuberExternalLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vtuberProfile<T extends VtuberProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VtuberProfileDefaultArgs<ExtArgs>>): Prisma__VtuberProfileClient<$Result.GetResult<Prisma.$VtuberProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VtuberExternalLink model
   */
  interface VtuberExternalLinkFieldRefs {
    readonly id: FieldRef<"VtuberExternalLink", 'Int'>
    readonly value: FieldRef<"VtuberExternalLink", 'String'>
    readonly icon: FieldRef<"VtuberExternalLink", 'String'>
    readonly href: FieldRef<"VtuberExternalLink", 'String'>
    readonly displayOrder: FieldRef<"VtuberExternalLink", 'Int'>
    readonly vtuberProfileId: FieldRef<"VtuberExternalLink", 'Int'>
    readonly createdOn: FieldRef<"VtuberExternalLink", 'DateTime'>
    readonly updatedOn: FieldRef<"VtuberExternalLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VtuberExternalLink findUnique
   */
  export type VtuberExternalLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter, which VtuberExternalLink to fetch.
     */
    where: VtuberExternalLinkWhereUniqueInput
  }

  /**
   * VtuberExternalLink findUniqueOrThrow
   */
  export type VtuberExternalLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter, which VtuberExternalLink to fetch.
     */
    where: VtuberExternalLinkWhereUniqueInput
  }

  /**
   * VtuberExternalLink findFirst
   */
  export type VtuberExternalLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter, which VtuberExternalLink to fetch.
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberExternalLinks to fetch.
     */
    orderBy?: VtuberExternalLinkOrderByWithRelationInput | VtuberExternalLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VtuberExternalLinks.
     */
    cursor?: VtuberExternalLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberExternalLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberExternalLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VtuberExternalLinks.
     */
    distinct?: VtuberExternalLinkScalarFieldEnum | VtuberExternalLinkScalarFieldEnum[]
  }

  /**
   * VtuberExternalLink findFirstOrThrow
   */
  export type VtuberExternalLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter, which VtuberExternalLink to fetch.
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberExternalLinks to fetch.
     */
    orderBy?: VtuberExternalLinkOrderByWithRelationInput | VtuberExternalLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VtuberExternalLinks.
     */
    cursor?: VtuberExternalLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberExternalLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberExternalLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VtuberExternalLinks.
     */
    distinct?: VtuberExternalLinkScalarFieldEnum | VtuberExternalLinkScalarFieldEnum[]
  }

  /**
   * VtuberExternalLink findMany
   */
  export type VtuberExternalLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter, which VtuberExternalLinks to fetch.
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VtuberExternalLinks to fetch.
     */
    orderBy?: VtuberExternalLinkOrderByWithRelationInput | VtuberExternalLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VtuberExternalLinks.
     */
    cursor?: VtuberExternalLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VtuberExternalLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VtuberExternalLinks.
     */
    skip?: number
    distinct?: VtuberExternalLinkScalarFieldEnum | VtuberExternalLinkScalarFieldEnum[]
  }

  /**
   * VtuberExternalLink create
   */
  export type VtuberExternalLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a VtuberExternalLink.
     */
    data: XOR<VtuberExternalLinkCreateInput, VtuberExternalLinkUncheckedCreateInput>
  }

  /**
   * VtuberExternalLink createMany
   */
  export type VtuberExternalLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VtuberExternalLinks.
     */
    data: VtuberExternalLinkCreateManyInput | VtuberExternalLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VtuberExternalLink createManyAndReturn
   */
  export type VtuberExternalLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * The data used to create many VtuberExternalLinks.
     */
    data: VtuberExternalLinkCreateManyInput | VtuberExternalLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VtuberExternalLink update
   */
  export type VtuberExternalLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a VtuberExternalLink.
     */
    data: XOR<VtuberExternalLinkUpdateInput, VtuberExternalLinkUncheckedUpdateInput>
    /**
     * Choose, which VtuberExternalLink to update.
     */
    where: VtuberExternalLinkWhereUniqueInput
  }

  /**
   * VtuberExternalLink updateMany
   */
  export type VtuberExternalLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VtuberExternalLinks.
     */
    data: XOR<VtuberExternalLinkUpdateManyMutationInput, VtuberExternalLinkUncheckedUpdateManyInput>
    /**
     * Filter which VtuberExternalLinks to update
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * Limit how many VtuberExternalLinks to update.
     */
    limit?: number
  }

  /**
   * VtuberExternalLink updateManyAndReturn
   */
  export type VtuberExternalLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * The data used to update VtuberExternalLinks.
     */
    data: XOR<VtuberExternalLinkUpdateManyMutationInput, VtuberExternalLinkUncheckedUpdateManyInput>
    /**
     * Filter which VtuberExternalLinks to update
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * Limit how many VtuberExternalLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VtuberExternalLink upsert
   */
  export type VtuberExternalLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the VtuberExternalLink to update in case it exists.
     */
    where: VtuberExternalLinkWhereUniqueInput
    /**
     * In case the VtuberExternalLink found by the `where` argument doesn't exist, create a new VtuberExternalLink with this data.
     */
    create: XOR<VtuberExternalLinkCreateInput, VtuberExternalLinkUncheckedCreateInput>
    /**
     * In case the VtuberExternalLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VtuberExternalLinkUpdateInput, VtuberExternalLinkUncheckedUpdateInput>
  }

  /**
   * VtuberExternalLink delete
   */
  export type VtuberExternalLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
    /**
     * Filter which VtuberExternalLink to delete.
     */
    where: VtuberExternalLinkWhereUniqueInput
  }

  /**
   * VtuberExternalLink deleteMany
   */
  export type VtuberExternalLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VtuberExternalLinks to delete
     */
    where?: VtuberExternalLinkWhereInput
    /**
     * Limit how many VtuberExternalLinks to delete.
     */
    limit?: number
  }

  /**
   * VtuberExternalLink without action
   */
  export type VtuberExternalLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VtuberExternalLink
     */
    select?: VtuberExternalLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VtuberExternalLink
     */
    omit?: VtuberExternalLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VtuberExternalLinkInclude<ExtArgs> | null
  }


  /**
   * Model Song
   */

  export type AggregateSong = {
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  export type SongAvgAggregateOutputType = {
    id: number | null
  }

  export type SongSumAggregateOutputType = {
    id: number | null
  }

  export type SongMinAggregateOutputType = {
    id: number | null
    title: string | null
    artist: string | null
    remark: string | null
    created_on: Date | null
    url: string | null
    lyrics_fragment: string | null
  }

  export type SongMaxAggregateOutputType = {
    id: number | null
    title: string | null
    artist: string | null
    remark: string | null
    created_on: Date | null
    url: string | null
    lyrics_fragment: string | null
  }

  export type SongCountAggregateOutputType = {
    id: number
    title: number
    artist: number
    remark: number
    extra: number
    created_on: number
    lang: number
    tag: number
    url: number
    lyrics_fragment: number
    _all: number
  }


  export type SongAvgAggregateInputType = {
    id?: true
  }

  export type SongSumAggregateInputType = {
    id?: true
  }

  export type SongMinAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    remark?: true
    created_on?: true
    url?: true
    lyrics_fragment?: true
  }

  export type SongMaxAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    remark?: true
    created_on?: true
    url?: true
    lyrics_fragment?: true
  }

  export type SongCountAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    remark?: true
    extra?: true
    created_on?: true
    lang?: true
    tag?: true
    url?: true
    lyrics_fragment?: true
    _all?: true
  }

  export type SongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Song to aggregate.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Songs
    **/
    _count?: true | SongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongMaxAggregateInputType
  }

  export type GetSongAggregateType<T extends SongAggregateArgs> = {
        [P in keyof T & keyof AggregateSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSong[P]>
      : GetScalarType<T[P], AggregateSong[P]>
  }




  export type SongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongWhereInput
    orderBy?: SongOrderByWithAggregationInput | SongOrderByWithAggregationInput[]
    by: SongScalarFieldEnum[] | SongScalarFieldEnum
    having?: SongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongCountAggregateInputType | true
    _avg?: SongAvgAggregateInputType
    _sum?: SongSumAggregateInputType
    _min?: SongMinAggregateInputType
    _max?: SongMaxAggregateInputType
  }

  export type SongGroupByOutputType = {
    id: number
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on: Date
    lang: string[]
    tag: string[]
    url: string | null
    lyrics_fragment: string | null
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  type GetSongGroupByPayload<T extends SongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongGroupByOutputType[P]>
            : GetScalarType<T[P], SongGroupByOutputType[P]>
        }
      >
    >


  export type SongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    remark?: boolean
    extra?: boolean
    created_on?: boolean
    lang?: boolean
    tag?: boolean
    url?: boolean
    lyrics_fragment?: boolean
    SongOccurrenceInLive?: boolean | Song$SongOccurrenceInLiveArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["song"]>

  export type SongSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    remark?: boolean
    extra?: boolean
    created_on?: boolean
    lang?: boolean
    tag?: boolean
    url?: boolean
    lyrics_fragment?: boolean
  }, ExtArgs["result"]["song"]>

  export type SongSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    remark?: boolean
    extra?: boolean
    created_on?: boolean
    lang?: boolean
    tag?: boolean
    url?: boolean
    lyrics_fragment?: boolean
  }, ExtArgs["result"]["song"]>

  export type SongSelectScalar = {
    id?: boolean
    title?: boolean
    artist?: boolean
    remark?: boolean
    extra?: boolean
    created_on?: boolean
    lang?: boolean
    tag?: boolean
    url?: boolean
    lyrics_fragment?: boolean
  }

  export type SongOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "artist" | "remark" | "extra" | "created_on" | "lang" | "tag" | "url" | "lyrics_fragment", ExtArgs["result"]["song"]>
  export type SongInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SongOccurrenceInLive?: boolean | Song$SongOccurrenceInLiveArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SongIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SongIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Song"
    objects: {
      /**
       * The live recordings that the song was played in
       */
      SongOccurrenceInLive: Prisma.$SongOccurrenceInLivePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      artist: string
      remark: string
      /**
       * [SongExtraType]
       */
      extra: PrismaJson.SongExtraType
      /**
       * The date the song was created (added to the database)
       */
      created_on: Date
      lang: string[]
      tag: string[]
      /**
       * B站歌切链接
       */
      url: string | null
      /**
       * Fragment of the lyrics of the song, used for fuzzy search
       */
      lyrics_fragment: string | null
    }, ExtArgs["result"]["song"]>
    composites: {}
  }

  type SongGetPayload<S extends boolean | null | undefined | SongDefaultArgs> = $Result.GetResult<Prisma.$SongPayload, S>

  type SongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SongFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SongCountAggregateInputType | true
    }

  export interface SongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Song'], meta: { name: 'Song' } }
    /**
     * Find zero or one Song that matches the filter.
     * @param {SongFindUniqueArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SongFindUniqueArgs>(args: SelectSubset<T, SongFindUniqueArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Song that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SongFindUniqueOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SongFindUniqueOrThrowArgs>(args: SelectSubset<T, SongFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SongFindFirstArgs>(args?: SelectSubset<T, SongFindFirstArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SongFindFirstOrThrowArgs>(args?: SelectSubset<T, SongFindFirstOrThrowArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Songs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Songs
     * const songs = await prisma.song.findMany()
     * 
     * // Get first 10 Songs
     * const songs = await prisma.song.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const songWithIdOnly = await prisma.song.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SongFindManyArgs>(args?: SelectSubset<T, SongFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Song.
     * @param {SongCreateArgs} args - Arguments to create a Song.
     * @example
     * // Create one Song
     * const Song = await prisma.song.create({
     *   data: {
     *     // ... data to create a Song
     *   }
     * })
     * 
     */
    create<T extends SongCreateArgs>(args: SelectSubset<T, SongCreateArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Songs.
     * @param {SongCreateManyArgs} args - Arguments to create many Songs.
     * @example
     * // Create many Songs
     * const song = await prisma.song.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SongCreateManyArgs>(args?: SelectSubset<T, SongCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Songs and returns the data saved in the database.
     * @param {SongCreateManyAndReturnArgs} args - Arguments to create many Songs.
     * @example
     * // Create many Songs
     * const song = await prisma.song.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Songs and only return the `id`
     * const songWithIdOnly = await prisma.song.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SongCreateManyAndReturnArgs>(args?: SelectSubset<T, SongCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Song.
     * @param {SongDeleteArgs} args - Arguments to delete one Song.
     * @example
     * // Delete one Song
     * const Song = await prisma.song.delete({
     *   where: {
     *     // ... filter to delete one Song
     *   }
     * })
     * 
     */
    delete<T extends SongDeleteArgs>(args: SelectSubset<T, SongDeleteArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Song.
     * @param {SongUpdateArgs} args - Arguments to update one Song.
     * @example
     * // Update one Song
     * const song = await prisma.song.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SongUpdateArgs>(args: SelectSubset<T, SongUpdateArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Songs.
     * @param {SongDeleteManyArgs} args - Arguments to filter Songs to delete.
     * @example
     * // Delete a few Songs
     * const { count } = await prisma.song.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SongDeleteManyArgs>(args?: SelectSubset<T, SongDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SongUpdateManyArgs>(args: SelectSubset<T, SongUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs and returns the data updated in the database.
     * @param {SongUpdateManyAndReturnArgs} args - Arguments to update many Songs.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Songs and only return the `id`
     * const songWithIdOnly = await prisma.song.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SongUpdateManyAndReturnArgs>(args: SelectSubset<T, SongUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Song.
     * @param {SongUpsertArgs} args - Arguments to update or create a Song.
     * @example
     * // Update or create a Song
     * const song = await prisma.song.upsert({
     *   create: {
     *     // ... data to create a Song
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Song we want to update
     *   }
     * })
     */
    upsert<T extends SongUpsertArgs>(args: SelectSubset<T, SongUpsertArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCountArgs} args - Arguments to filter Songs to count.
     * @example
     * // Count the number of Songs
     * const count = await prisma.song.count({
     *   where: {
     *     // ... the filter for the Songs we want to count
     *   }
     * })
    **/
    count<T extends SongCountArgs>(
      args?: Subset<T, SongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongAggregateArgs>(args: Subset<T, SongAggregateArgs>): Prisma.PrismaPromise<GetSongAggregateType<T>>

    /**
     * Group by Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongGroupByArgs['orderBy'] }
        : { orderBy?: SongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Song model
   */
  readonly fields: SongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Song.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    SongOccurrenceInLive<T extends Song$SongOccurrenceInLiveArgs<ExtArgs> = {}>(args?: Subset<T, Song$SongOccurrenceInLiveArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Song model
   */
  interface SongFieldRefs {
    readonly id: FieldRef<"Song", 'Int'>
    readonly title: FieldRef<"Song", 'String'>
    readonly artist: FieldRef<"Song", 'String'>
    readonly remark: FieldRef<"Song", 'String'>
    readonly extra: FieldRef<"Song", 'Json'>
    readonly created_on: FieldRef<"Song", 'DateTime'>
    readonly lang: FieldRef<"Song", 'String[]'>
    readonly tag: FieldRef<"Song", 'String[]'>
    readonly url: FieldRef<"Song", 'String'>
    readonly lyrics_fragment: FieldRef<"Song", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Song findUnique
   */
  export type SongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song findUniqueOrThrow
   */
  export type SongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song findFirst
   */
  export type SongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song findFirstOrThrow
   */
  export type SongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song findMany
   */
  export type SongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Songs to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song create
   */
  export type SongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to create a Song.
     */
    data: XOR<SongCreateInput, SongUncheckedCreateInput>
  }

  /**
   * Song createMany
   */
  export type SongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Songs.
     */
    data: SongCreateManyInput | SongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Song createManyAndReturn
   */
  export type SongCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * The data used to create many Songs.
     */
    data: SongCreateManyInput | SongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Song update
   */
  export type SongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to update a Song.
     */
    data: XOR<SongUpdateInput, SongUncheckedUpdateInput>
    /**
     * Choose, which Song to update.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song updateMany
   */
  export type SongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Songs.
     */
    data: XOR<SongUpdateManyMutationInput, SongUncheckedUpdateManyInput>
    /**
     * Filter which Songs to update
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to update.
     */
    limit?: number
  }

  /**
   * Song updateManyAndReturn
   */
  export type SongUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * The data used to update Songs.
     */
    data: XOR<SongUpdateManyMutationInput, SongUncheckedUpdateManyInput>
    /**
     * Filter which Songs to update
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to update.
     */
    limit?: number
  }

  /**
   * Song upsert
   */
  export type SongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The filter to search for the Song to update in case it exists.
     */
    where: SongWhereUniqueInput
    /**
     * In case the Song found by the `where` argument doesn't exist, create a new Song with this data.
     */
    create: XOR<SongCreateInput, SongUncheckedCreateInput>
    /**
     * In case the Song was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongUpdateInput, SongUncheckedUpdateInput>
  }

  /**
   * Song delete
   */
  export type SongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter which Song to delete.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song deleteMany
   */
  export type SongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Songs to delete
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to delete.
     */
    limit?: number
  }

  /**
   * Song.SongOccurrenceInLive
   */
  export type Song$SongOccurrenceInLiveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    where?: SongOccurrenceInLiveWhereInput
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SongOccurrenceInLiveScalarFieldEnum | SongOccurrenceInLiveScalarFieldEnum[]
  }

  /**
   * Song without action
   */
  export type SongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    salt: string | null
    password_hash: string | null
    username: string | null
  }

  export type UserMaxAggregateOutputType = {
    salt: string | null
    password_hash: string | null
    username: string | null
  }

  export type UserCountAggregateOutputType = {
    salt: number
    password_hash: number
    username: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    salt?: true
    password_hash?: true
    username?: true
  }

  export type UserMaxAggregateInputType = {
    salt?: true
    password_hash?: true
    username?: true
  }

  export type UserCountAggregateInputType = {
    salt?: true
    password_hash?: true
    username?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    salt: string
    password_hash: string
    username: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    salt?: boolean
    password_hash?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    salt?: boolean
    password_hash?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    salt?: boolean
    password_hash?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    salt?: boolean
    password_hash?: boolean
    username?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"salt" | "password_hash" | "username", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      salt: string
      password_hash: string
      username: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `salt`
     * const userWithSaltOnly = await prisma.user.findMany({ select: { salt: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `salt`
     * const userWithSaltOnly = await prisma.user.createManyAndReturn({
     *   select: { salt: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `salt`
     * const userWithSaltOnly = await prisma.user.updateManyAndReturn({
     *   select: { salt: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly salt: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    content: string | null
    created_on: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    content: string | null
    created_on: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    content: number
    created_on: number
    _all: number
  }


  export type FeedbackMinAggregateInputType = {
    id?: true
    content?: true
    created_on?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    content?: true
    created_on?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    content?: true
    created_on?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    content: string
    created_on: Date
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    created_on?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    created_on?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    created_on?: boolean
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    content?: boolean
    created_on?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "created_on", ExtArgs["result"]["feedback"]>

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      created_on: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly content: FieldRef<"Feedback", 'String'>
    readonly created_on: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
  }


  /**
   * Model Footer
   */

  export type AggregateFooter = {
    _count: FooterCountAggregateOutputType | null
    _avg: FooterAvgAggregateOutputType | null
    _sum: FooterSumAggregateOutputType | null
    _min: FooterMinAggregateOutputType | null
    _max: FooterMaxAggregateOutputType | null
  }

  export type FooterAvgAggregateOutputType = {
    id: number | null
  }

  export type FooterSumAggregateOutputType = {
    id: number | null
  }

  export type FooterMinAggregateOutputType = {
    content: string | null
    id: number | null
  }

  export type FooterMaxAggregateOutputType = {
    content: string | null
    id: number | null
  }

  export type FooterCountAggregateOutputType = {
    content: number
    id: number
    _all: number
  }


  export type FooterAvgAggregateInputType = {
    id?: true
  }

  export type FooterSumAggregateInputType = {
    id?: true
  }

  export type FooterMinAggregateInputType = {
    content?: true
    id?: true
  }

  export type FooterMaxAggregateInputType = {
    content?: true
    id?: true
  }

  export type FooterCountAggregateInputType = {
    content?: true
    id?: true
    _all?: true
  }

  export type FooterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Footer to aggregate.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Footers
    **/
    _count?: true | FooterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FooterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FooterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FooterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FooterMaxAggregateInputType
  }

  export type GetFooterAggregateType<T extends FooterAggregateArgs> = {
        [P in keyof T & keyof AggregateFooter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFooter[P]>
      : GetScalarType<T[P], AggregateFooter[P]>
  }




  export type FooterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FooterWhereInput
    orderBy?: FooterOrderByWithAggregationInput | FooterOrderByWithAggregationInput[]
    by: FooterScalarFieldEnum[] | FooterScalarFieldEnum
    having?: FooterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FooterCountAggregateInputType | true
    _avg?: FooterAvgAggregateInputType
    _sum?: FooterSumAggregateInputType
    _min?: FooterMinAggregateInputType
    _max?: FooterMaxAggregateInputType
  }

  export type FooterGroupByOutputType = {
    content: string
    id: number
    _count: FooterCountAggregateOutputType | null
    _avg: FooterAvgAggregateOutputType | null
    _sum: FooterSumAggregateOutputType | null
    _min: FooterMinAggregateOutputType | null
    _max: FooterMaxAggregateOutputType | null
  }

  type GetFooterGroupByPayload<T extends FooterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FooterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FooterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FooterGroupByOutputType[P]>
            : GetScalarType<T[P], FooterGroupByOutputType[P]>
        }
      >
    >


  export type FooterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    content?: boolean
    id?: boolean
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    content?: boolean
    id?: boolean
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    content?: boolean
    id?: boolean
  }, ExtArgs["result"]["footer"]>

  export type FooterSelectScalar = {
    content?: boolean
    id?: boolean
  }

  export type FooterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"content" | "id", ExtArgs["result"]["footer"]>

  export type $FooterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Footer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      content: string
      id: number
    }, ExtArgs["result"]["footer"]>
    composites: {}
  }

  type FooterGetPayload<S extends boolean | null | undefined | FooterDefaultArgs> = $Result.GetResult<Prisma.$FooterPayload, S>

  type FooterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FooterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FooterCountAggregateInputType | true
    }

  export interface FooterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Footer'], meta: { name: 'Footer' } }
    /**
     * Find zero or one Footer that matches the filter.
     * @param {FooterFindUniqueArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FooterFindUniqueArgs>(args: SelectSubset<T, FooterFindUniqueArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Footer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FooterFindUniqueOrThrowArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FooterFindUniqueOrThrowArgs>(args: SelectSubset<T, FooterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Footer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindFirstArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FooterFindFirstArgs>(args?: SelectSubset<T, FooterFindFirstArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Footer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindFirstOrThrowArgs} args - Arguments to find a Footer
     * @example
     * // Get one Footer
     * const footer = await prisma.footer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FooterFindFirstOrThrowArgs>(args?: SelectSubset<T, FooterFindFirstOrThrowArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Footers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Footers
     * const footers = await prisma.footer.findMany()
     * 
     * // Get first 10 Footers
     * const footers = await prisma.footer.findMany({ take: 10 })
     * 
     * // Only select the `content`
     * const footerWithContentOnly = await prisma.footer.findMany({ select: { content: true } })
     * 
     */
    findMany<T extends FooterFindManyArgs>(args?: SelectSubset<T, FooterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Footer.
     * @param {FooterCreateArgs} args - Arguments to create a Footer.
     * @example
     * // Create one Footer
     * const Footer = await prisma.footer.create({
     *   data: {
     *     // ... data to create a Footer
     *   }
     * })
     * 
     */
    create<T extends FooterCreateArgs>(args: SelectSubset<T, FooterCreateArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Footers.
     * @param {FooterCreateManyArgs} args - Arguments to create many Footers.
     * @example
     * // Create many Footers
     * const footer = await prisma.footer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FooterCreateManyArgs>(args?: SelectSubset<T, FooterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Footers and returns the data saved in the database.
     * @param {FooterCreateManyAndReturnArgs} args - Arguments to create many Footers.
     * @example
     * // Create many Footers
     * const footer = await prisma.footer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Footers and only return the `content`
     * const footerWithContentOnly = await prisma.footer.createManyAndReturn({
     *   select: { content: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FooterCreateManyAndReturnArgs>(args?: SelectSubset<T, FooterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Footer.
     * @param {FooterDeleteArgs} args - Arguments to delete one Footer.
     * @example
     * // Delete one Footer
     * const Footer = await prisma.footer.delete({
     *   where: {
     *     // ... filter to delete one Footer
     *   }
     * })
     * 
     */
    delete<T extends FooterDeleteArgs>(args: SelectSubset<T, FooterDeleteArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Footer.
     * @param {FooterUpdateArgs} args - Arguments to update one Footer.
     * @example
     * // Update one Footer
     * const footer = await prisma.footer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FooterUpdateArgs>(args: SelectSubset<T, FooterUpdateArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Footers.
     * @param {FooterDeleteManyArgs} args - Arguments to filter Footers to delete.
     * @example
     * // Delete a few Footers
     * const { count } = await prisma.footer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FooterDeleteManyArgs>(args?: SelectSubset<T, FooterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Footers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Footers
     * const footer = await prisma.footer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FooterUpdateManyArgs>(args: SelectSubset<T, FooterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Footers and returns the data updated in the database.
     * @param {FooterUpdateManyAndReturnArgs} args - Arguments to update many Footers.
     * @example
     * // Update many Footers
     * const footer = await prisma.footer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Footers and only return the `content`
     * const footerWithContentOnly = await prisma.footer.updateManyAndReturn({
     *   select: { content: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FooterUpdateManyAndReturnArgs>(args: SelectSubset<T, FooterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Footer.
     * @param {FooterUpsertArgs} args - Arguments to update or create a Footer.
     * @example
     * // Update or create a Footer
     * const footer = await prisma.footer.upsert({
     *   create: {
     *     // ... data to create a Footer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Footer we want to update
     *   }
     * })
     */
    upsert<T extends FooterUpsertArgs>(args: SelectSubset<T, FooterUpsertArgs<ExtArgs>>): Prisma__FooterClient<$Result.GetResult<Prisma.$FooterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Footers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterCountArgs} args - Arguments to filter Footers to count.
     * @example
     * // Count the number of Footers
     * const count = await prisma.footer.count({
     *   where: {
     *     // ... the filter for the Footers we want to count
     *   }
     * })
    **/
    count<T extends FooterCountArgs>(
      args?: Subset<T, FooterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FooterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Footer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FooterAggregateArgs>(args: Subset<T, FooterAggregateArgs>): Prisma.PrismaPromise<GetFooterAggregateType<T>>

    /**
     * Group by Footer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FooterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FooterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FooterGroupByArgs['orderBy'] }
        : { orderBy?: FooterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FooterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFooterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Footer model
   */
  readonly fields: FooterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Footer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FooterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Footer model
   */
  interface FooterFieldRefs {
    readonly content: FieldRef<"Footer", 'String'>
    readonly id: FieldRef<"Footer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Footer findUnique
   */
  export type FooterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer findUniqueOrThrow
   */
  export type FooterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer findFirst
   */
  export type FooterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Footers.
     */
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer findFirstOrThrow
   */
  export type FooterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter, which Footer to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Footers.
     */
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer findMany
   */
  export type FooterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter, which Footers to fetch.
     */
    where?: FooterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Footers to fetch.
     */
    orderBy?: FooterOrderByWithRelationInput | FooterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Footers.
     */
    cursor?: FooterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Footers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Footers.
     */
    skip?: number
    distinct?: FooterScalarFieldEnum | FooterScalarFieldEnum[]
  }

  /**
   * Footer create
   */
  export type FooterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data needed to create a Footer.
     */
    data: XOR<FooterCreateInput, FooterUncheckedCreateInput>
  }

  /**
   * Footer createMany
   */
  export type FooterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Footers.
     */
    data: FooterCreateManyInput | FooterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Footer createManyAndReturn
   */
  export type FooterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data used to create many Footers.
     */
    data: FooterCreateManyInput | FooterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Footer update
   */
  export type FooterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data needed to update a Footer.
     */
    data: XOR<FooterUpdateInput, FooterUncheckedUpdateInput>
    /**
     * Choose, which Footer to update.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer updateMany
   */
  export type FooterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Footers.
     */
    data: XOR<FooterUpdateManyMutationInput, FooterUncheckedUpdateManyInput>
    /**
     * Filter which Footers to update
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to update.
     */
    limit?: number
  }

  /**
   * Footer updateManyAndReturn
   */
  export type FooterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The data used to update Footers.
     */
    data: XOR<FooterUpdateManyMutationInput, FooterUncheckedUpdateManyInput>
    /**
     * Filter which Footers to update
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to update.
     */
    limit?: number
  }

  /**
   * Footer upsert
   */
  export type FooterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * The filter to search for the Footer to update in case it exists.
     */
    where: FooterWhereUniqueInput
    /**
     * In case the Footer found by the `where` argument doesn't exist, create a new Footer with this data.
     */
    create: XOR<FooterCreateInput, FooterUncheckedCreateInput>
    /**
     * In case the Footer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FooterUpdateInput, FooterUncheckedUpdateInput>
  }

  /**
   * Footer delete
   */
  export type FooterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
    /**
     * Filter which Footer to delete.
     */
    where: FooterWhereUniqueInput
  }

  /**
   * Footer deleteMany
   */
  export type FooterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Footers to delete
     */
    where?: FooterWhereInput
    /**
     * Limit how many Footers to delete.
     */
    limit?: number
  }

  /**
   * Footer without action
   */
  export type FooterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Footer
     */
    select?: FooterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Footer
     */
    omit?: FooterOmit<ExtArgs> | null
  }


  /**
   * Model LiveRecordingArchive
   */

  export type AggregateLiveRecordingArchive = {
    _count: LiveRecordingArchiveCountAggregateOutputType | null
    _avg: LiveRecordingArchiveAvgAggregateOutputType | null
    _sum: LiveRecordingArchiveSumAggregateOutputType | null
    _min: LiveRecordingArchiveMinAggregateOutputType | null
    _max: LiveRecordingArchiveMaxAggregateOutputType | null
  }

  export type LiveRecordingArchiveAvgAggregateOutputType = {
    id: number | null
    pubdate: number | null
    duration: number | null
  }

  export type LiveRecordingArchiveSumAggregateOutputType = {
    id: number | null
    pubdate: number | null
    duration: number | null
  }

  export type LiveRecordingArchiveMinAggregateOutputType = {
    id: number | null
    bvid: string | null
    title: string | null
    pubdate: number | null
    duration: number | null
    cover: string | null
  }

  export type LiveRecordingArchiveMaxAggregateOutputType = {
    id: number | null
    bvid: string | null
    title: string | null
    pubdate: number | null
    duration: number | null
    cover: string | null
  }

  export type LiveRecordingArchiveCountAggregateOutputType = {
    id: number
    bvid: number
    title: number
    pubdate: number
    duration: number
    cover: number
    _all: number
  }


  export type LiveRecordingArchiveAvgAggregateInputType = {
    id?: true
    pubdate?: true
    duration?: true
  }

  export type LiveRecordingArchiveSumAggregateInputType = {
    id?: true
    pubdate?: true
    duration?: true
  }

  export type LiveRecordingArchiveMinAggregateInputType = {
    id?: true
    bvid?: true
    title?: true
    pubdate?: true
    duration?: true
    cover?: true
  }

  export type LiveRecordingArchiveMaxAggregateInputType = {
    id?: true
    bvid?: true
    title?: true
    pubdate?: true
    duration?: true
    cover?: true
  }

  export type LiveRecordingArchiveCountAggregateInputType = {
    id?: true
    bvid?: true
    title?: true
    pubdate?: true
    duration?: true
    cover?: true
    _all?: true
  }

  export type LiveRecordingArchiveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveRecordingArchive to aggregate.
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRecordingArchives to fetch.
     */
    orderBy?: LiveRecordingArchiveOrderByWithRelationInput | LiveRecordingArchiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LiveRecordingArchiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRecordingArchives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRecordingArchives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LiveRecordingArchives
    **/
    _count?: true | LiveRecordingArchiveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LiveRecordingArchiveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LiveRecordingArchiveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LiveRecordingArchiveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LiveRecordingArchiveMaxAggregateInputType
  }

  export type GetLiveRecordingArchiveAggregateType<T extends LiveRecordingArchiveAggregateArgs> = {
        [P in keyof T & keyof AggregateLiveRecordingArchive]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLiveRecordingArchive[P]>
      : GetScalarType<T[P], AggregateLiveRecordingArchive[P]>
  }




  export type LiveRecordingArchiveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LiveRecordingArchiveWhereInput
    orderBy?: LiveRecordingArchiveOrderByWithAggregationInput | LiveRecordingArchiveOrderByWithAggregationInput[]
    by: LiveRecordingArchiveScalarFieldEnum[] | LiveRecordingArchiveScalarFieldEnum
    having?: LiveRecordingArchiveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LiveRecordingArchiveCountAggregateInputType | true
    _avg?: LiveRecordingArchiveAvgAggregateInputType
    _sum?: LiveRecordingArchiveSumAggregateInputType
    _min?: LiveRecordingArchiveMinAggregateInputType
    _max?: LiveRecordingArchiveMaxAggregateInputType
  }

  export type LiveRecordingArchiveGroupByOutputType = {
    id: number
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
    _count: LiveRecordingArchiveCountAggregateOutputType | null
    _avg: LiveRecordingArchiveAvgAggregateOutputType | null
    _sum: LiveRecordingArchiveSumAggregateOutputType | null
    _min: LiveRecordingArchiveMinAggregateOutputType | null
    _max: LiveRecordingArchiveMaxAggregateOutputType | null
  }

  type GetLiveRecordingArchiveGroupByPayload<T extends LiveRecordingArchiveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LiveRecordingArchiveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LiveRecordingArchiveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LiveRecordingArchiveGroupByOutputType[P]>
            : GetScalarType<T[P], LiveRecordingArchiveGroupByOutputType[P]>
        }
      >
    >


  export type LiveRecordingArchiveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bvid?: boolean
    title?: boolean
    pubdate?: boolean
    duration?: boolean
    cover?: boolean
    SongOccurrenceInLive?: boolean | LiveRecordingArchive$SongOccurrenceInLiveArgs<ExtArgs>
    _count?: boolean | LiveRecordingArchiveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["liveRecordingArchive"]>

  export type LiveRecordingArchiveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bvid?: boolean
    title?: boolean
    pubdate?: boolean
    duration?: boolean
    cover?: boolean
  }, ExtArgs["result"]["liveRecordingArchive"]>

  export type LiveRecordingArchiveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bvid?: boolean
    title?: boolean
    pubdate?: boolean
    duration?: boolean
    cover?: boolean
  }, ExtArgs["result"]["liveRecordingArchive"]>

  export type LiveRecordingArchiveSelectScalar = {
    id?: boolean
    bvid?: boolean
    title?: boolean
    pubdate?: boolean
    duration?: boolean
    cover?: boolean
  }

  export type LiveRecordingArchiveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bvid" | "title" | "pubdate" | "duration" | "cover", ExtArgs["result"]["liveRecordingArchive"]>
  export type LiveRecordingArchiveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SongOccurrenceInLive?: boolean | LiveRecordingArchive$SongOccurrenceInLiveArgs<ExtArgs>
    _count?: boolean | LiveRecordingArchiveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LiveRecordingArchiveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LiveRecordingArchiveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LiveRecordingArchivePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LiveRecordingArchive"
    objects: {
      /**
       * The songs that were played in the live
       */
      SongOccurrenceInLive: Prisma.$SongOccurrenceInLivePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      /**
       * B站视频ID
       */
      bvid: string
      /**
       * Title of the live recording
       */
      title: string
      /**
       * Publish date of the live recording (unix seconds)
       */
      pubdate: number
      /**
       * Duration of the live recording (seconds)
       */
      duration: number
      /**
       * Cover image url of the recording
       */
      cover: string
    }, ExtArgs["result"]["liveRecordingArchive"]>
    composites: {}
  }

  type LiveRecordingArchiveGetPayload<S extends boolean | null | undefined | LiveRecordingArchiveDefaultArgs> = $Result.GetResult<Prisma.$LiveRecordingArchivePayload, S>

  type LiveRecordingArchiveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LiveRecordingArchiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LiveRecordingArchiveCountAggregateInputType | true
    }

  export interface LiveRecordingArchiveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LiveRecordingArchive'], meta: { name: 'LiveRecordingArchive' } }
    /**
     * Find zero or one LiveRecordingArchive that matches the filter.
     * @param {LiveRecordingArchiveFindUniqueArgs} args - Arguments to find a LiveRecordingArchive
     * @example
     * // Get one LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LiveRecordingArchiveFindUniqueArgs>(args: SelectSubset<T, LiveRecordingArchiveFindUniqueArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LiveRecordingArchive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LiveRecordingArchiveFindUniqueOrThrowArgs} args - Arguments to find a LiveRecordingArchive
     * @example
     * // Get one LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LiveRecordingArchiveFindUniqueOrThrowArgs>(args: SelectSubset<T, LiveRecordingArchiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveRecordingArchive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveFindFirstArgs} args - Arguments to find a LiveRecordingArchive
     * @example
     * // Get one LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LiveRecordingArchiveFindFirstArgs>(args?: SelectSubset<T, LiveRecordingArchiveFindFirstArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LiveRecordingArchive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveFindFirstOrThrowArgs} args - Arguments to find a LiveRecordingArchive
     * @example
     * // Get one LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LiveRecordingArchiveFindFirstOrThrowArgs>(args?: SelectSubset<T, LiveRecordingArchiveFindFirstOrThrowArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LiveRecordingArchives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LiveRecordingArchives
     * const liveRecordingArchives = await prisma.liveRecordingArchive.findMany()
     * 
     * // Get first 10 LiveRecordingArchives
     * const liveRecordingArchives = await prisma.liveRecordingArchive.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const liveRecordingArchiveWithIdOnly = await prisma.liveRecordingArchive.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LiveRecordingArchiveFindManyArgs>(args?: SelectSubset<T, LiveRecordingArchiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LiveRecordingArchive.
     * @param {LiveRecordingArchiveCreateArgs} args - Arguments to create a LiveRecordingArchive.
     * @example
     * // Create one LiveRecordingArchive
     * const LiveRecordingArchive = await prisma.liveRecordingArchive.create({
     *   data: {
     *     // ... data to create a LiveRecordingArchive
     *   }
     * })
     * 
     */
    create<T extends LiveRecordingArchiveCreateArgs>(args: SelectSubset<T, LiveRecordingArchiveCreateArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LiveRecordingArchives.
     * @param {LiveRecordingArchiveCreateManyArgs} args - Arguments to create many LiveRecordingArchives.
     * @example
     * // Create many LiveRecordingArchives
     * const liveRecordingArchive = await prisma.liveRecordingArchive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LiveRecordingArchiveCreateManyArgs>(args?: SelectSubset<T, LiveRecordingArchiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LiveRecordingArchives and returns the data saved in the database.
     * @param {LiveRecordingArchiveCreateManyAndReturnArgs} args - Arguments to create many LiveRecordingArchives.
     * @example
     * // Create many LiveRecordingArchives
     * const liveRecordingArchive = await prisma.liveRecordingArchive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LiveRecordingArchives and only return the `id`
     * const liveRecordingArchiveWithIdOnly = await prisma.liveRecordingArchive.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LiveRecordingArchiveCreateManyAndReturnArgs>(args?: SelectSubset<T, LiveRecordingArchiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LiveRecordingArchive.
     * @param {LiveRecordingArchiveDeleteArgs} args - Arguments to delete one LiveRecordingArchive.
     * @example
     * // Delete one LiveRecordingArchive
     * const LiveRecordingArchive = await prisma.liveRecordingArchive.delete({
     *   where: {
     *     // ... filter to delete one LiveRecordingArchive
     *   }
     * })
     * 
     */
    delete<T extends LiveRecordingArchiveDeleteArgs>(args: SelectSubset<T, LiveRecordingArchiveDeleteArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LiveRecordingArchive.
     * @param {LiveRecordingArchiveUpdateArgs} args - Arguments to update one LiveRecordingArchive.
     * @example
     * // Update one LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LiveRecordingArchiveUpdateArgs>(args: SelectSubset<T, LiveRecordingArchiveUpdateArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LiveRecordingArchives.
     * @param {LiveRecordingArchiveDeleteManyArgs} args - Arguments to filter LiveRecordingArchives to delete.
     * @example
     * // Delete a few LiveRecordingArchives
     * const { count } = await prisma.liveRecordingArchive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LiveRecordingArchiveDeleteManyArgs>(args?: SelectSubset<T, LiveRecordingArchiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveRecordingArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LiveRecordingArchives
     * const liveRecordingArchive = await prisma.liveRecordingArchive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LiveRecordingArchiveUpdateManyArgs>(args: SelectSubset<T, LiveRecordingArchiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LiveRecordingArchives and returns the data updated in the database.
     * @param {LiveRecordingArchiveUpdateManyAndReturnArgs} args - Arguments to update many LiveRecordingArchives.
     * @example
     * // Update many LiveRecordingArchives
     * const liveRecordingArchive = await prisma.liveRecordingArchive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LiveRecordingArchives and only return the `id`
     * const liveRecordingArchiveWithIdOnly = await prisma.liveRecordingArchive.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LiveRecordingArchiveUpdateManyAndReturnArgs>(args: SelectSubset<T, LiveRecordingArchiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LiveRecordingArchive.
     * @param {LiveRecordingArchiveUpsertArgs} args - Arguments to update or create a LiveRecordingArchive.
     * @example
     * // Update or create a LiveRecordingArchive
     * const liveRecordingArchive = await prisma.liveRecordingArchive.upsert({
     *   create: {
     *     // ... data to create a LiveRecordingArchive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LiveRecordingArchive we want to update
     *   }
     * })
     */
    upsert<T extends LiveRecordingArchiveUpsertArgs>(args: SelectSubset<T, LiveRecordingArchiveUpsertArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LiveRecordingArchives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveCountArgs} args - Arguments to filter LiveRecordingArchives to count.
     * @example
     * // Count the number of LiveRecordingArchives
     * const count = await prisma.liveRecordingArchive.count({
     *   where: {
     *     // ... the filter for the LiveRecordingArchives we want to count
     *   }
     * })
    **/
    count<T extends LiveRecordingArchiveCountArgs>(
      args?: Subset<T, LiveRecordingArchiveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LiveRecordingArchiveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LiveRecordingArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LiveRecordingArchiveAggregateArgs>(args: Subset<T, LiveRecordingArchiveAggregateArgs>): Prisma.PrismaPromise<GetLiveRecordingArchiveAggregateType<T>>

    /**
     * Group by LiveRecordingArchive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LiveRecordingArchiveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LiveRecordingArchiveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LiveRecordingArchiveGroupByArgs['orderBy'] }
        : { orderBy?: LiveRecordingArchiveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LiveRecordingArchiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLiveRecordingArchiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LiveRecordingArchive model
   */
  readonly fields: LiveRecordingArchiveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LiveRecordingArchive.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LiveRecordingArchiveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    SongOccurrenceInLive<T extends LiveRecordingArchive$SongOccurrenceInLiveArgs<ExtArgs> = {}>(args?: Subset<T, LiveRecordingArchive$SongOccurrenceInLiveArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LiveRecordingArchive model
   */
  interface LiveRecordingArchiveFieldRefs {
    readonly id: FieldRef<"LiveRecordingArchive", 'Int'>
    readonly bvid: FieldRef<"LiveRecordingArchive", 'String'>
    readonly title: FieldRef<"LiveRecordingArchive", 'String'>
    readonly pubdate: FieldRef<"LiveRecordingArchive", 'Int'>
    readonly duration: FieldRef<"LiveRecordingArchive", 'Int'>
    readonly cover: FieldRef<"LiveRecordingArchive", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LiveRecordingArchive findUnique
   */
  export type LiveRecordingArchiveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter, which LiveRecordingArchive to fetch.
     */
    where: LiveRecordingArchiveWhereUniqueInput
  }

  /**
   * LiveRecordingArchive findUniqueOrThrow
   */
  export type LiveRecordingArchiveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter, which LiveRecordingArchive to fetch.
     */
    where: LiveRecordingArchiveWhereUniqueInput
  }

  /**
   * LiveRecordingArchive findFirst
   */
  export type LiveRecordingArchiveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter, which LiveRecordingArchive to fetch.
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRecordingArchives to fetch.
     */
    orderBy?: LiveRecordingArchiveOrderByWithRelationInput | LiveRecordingArchiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveRecordingArchives.
     */
    cursor?: LiveRecordingArchiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRecordingArchives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRecordingArchives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveRecordingArchives.
     */
    distinct?: LiveRecordingArchiveScalarFieldEnum | LiveRecordingArchiveScalarFieldEnum[]
  }

  /**
   * LiveRecordingArchive findFirstOrThrow
   */
  export type LiveRecordingArchiveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter, which LiveRecordingArchive to fetch.
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRecordingArchives to fetch.
     */
    orderBy?: LiveRecordingArchiveOrderByWithRelationInput | LiveRecordingArchiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LiveRecordingArchives.
     */
    cursor?: LiveRecordingArchiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRecordingArchives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRecordingArchives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LiveRecordingArchives.
     */
    distinct?: LiveRecordingArchiveScalarFieldEnum | LiveRecordingArchiveScalarFieldEnum[]
  }

  /**
   * LiveRecordingArchive findMany
   */
  export type LiveRecordingArchiveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter, which LiveRecordingArchives to fetch.
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LiveRecordingArchives to fetch.
     */
    orderBy?: LiveRecordingArchiveOrderByWithRelationInput | LiveRecordingArchiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LiveRecordingArchives.
     */
    cursor?: LiveRecordingArchiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LiveRecordingArchives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LiveRecordingArchives.
     */
    skip?: number
    distinct?: LiveRecordingArchiveScalarFieldEnum | LiveRecordingArchiveScalarFieldEnum[]
  }

  /**
   * LiveRecordingArchive create
   */
  export type LiveRecordingArchiveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * The data needed to create a LiveRecordingArchive.
     */
    data: XOR<LiveRecordingArchiveCreateInput, LiveRecordingArchiveUncheckedCreateInput>
  }

  /**
   * LiveRecordingArchive createMany
   */
  export type LiveRecordingArchiveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LiveRecordingArchives.
     */
    data: LiveRecordingArchiveCreateManyInput | LiveRecordingArchiveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiveRecordingArchive createManyAndReturn
   */
  export type LiveRecordingArchiveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * The data used to create many LiveRecordingArchives.
     */
    data: LiveRecordingArchiveCreateManyInput | LiveRecordingArchiveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LiveRecordingArchive update
   */
  export type LiveRecordingArchiveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * The data needed to update a LiveRecordingArchive.
     */
    data: XOR<LiveRecordingArchiveUpdateInput, LiveRecordingArchiveUncheckedUpdateInput>
    /**
     * Choose, which LiveRecordingArchive to update.
     */
    where: LiveRecordingArchiveWhereUniqueInput
  }

  /**
   * LiveRecordingArchive updateMany
   */
  export type LiveRecordingArchiveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LiveRecordingArchives.
     */
    data: XOR<LiveRecordingArchiveUpdateManyMutationInput, LiveRecordingArchiveUncheckedUpdateManyInput>
    /**
     * Filter which LiveRecordingArchives to update
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * Limit how many LiveRecordingArchives to update.
     */
    limit?: number
  }

  /**
   * LiveRecordingArchive updateManyAndReturn
   */
  export type LiveRecordingArchiveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * The data used to update LiveRecordingArchives.
     */
    data: XOR<LiveRecordingArchiveUpdateManyMutationInput, LiveRecordingArchiveUncheckedUpdateManyInput>
    /**
     * Filter which LiveRecordingArchives to update
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * Limit how many LiveRecordingArchives to update.
     */
    limit?: number
  }

  /**
   * LiveRecordingArchive upsert
   */
  export type LiveRecordingArchiveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * The filter to search for the LiveRecordingArchive to update in case it exists.
     */
    where: LiveRecordingArchiveWhereUniqueInput
    /**
     * In case the LiveRecordingArchive found by the `where` argument doesn't exist, create a new LiveRecordingArchive with this data.
     */
    create: XOR<LiveRecordingArchiveCreateInput, LiveRecordingArchiveUncheckedCreateInput>
    /**
     * In case the LiveRecordingArchive was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LiveRecordingArchiveUpdateInput, LiveRecordingArchiveUncheckedUpdateInput>
  }

  /**
   * LiveRecordingArchive delete
   */
  export type LiveRecordingArchiveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
    /**
     * Filter which LiveRecordingArchive to delete.
     */
    where: LiveRecordingArchiveWhereUniqueInput
  }

  /**
   * LiveRecordingArchive deleteMany
   */
  export type LiveRecordingArchiveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LiveRecordingArchives to delete
     */
    where?: LiveRecordingArchiveWhereInput
    /**
     * Limit how many LiveRecordingArchives to delete.
     */
    limit?: number
  }

  /**
   * LiveRecordingArchive.SongOccurrenceInLive
   */
  export type LiveRecordingArchive$SongOccurrenceInLiveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    where?: SongOccurrenceInLiveWhereInput
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SongOccurrenceInLiveScalarFieldEnum | SongOccurrenceInLiveScalarFieldEnum[]
  }

  /**
   * LiveRecordingArchive without action
   */
  export type LiveRecordingArchiveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LiveRecordingArchive
     */
    select?: LiveRecordingArchiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LiveRecordingArchive
     */
    omit?: LiveRecordingArchiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LiveRecordingArchiveInclude<ExtArgs> | null
  }


  /**
   * Model SongOccurrenceInLive
   */

  export type AggregateSongOccurrenceInLive = {
    _count: SongOccurrenceInLiveCountAggregateOutputType | null
    _avg: SongOccurrenceInLiveAvgAggregateOutputType | null
    _sum: SongOccurrenceInLiveSumAggregateOutputType | null
    _min: SongOccurrenceInLiveMinAggregateOutputType | null
    _max: SongOccurrenceInLiveMaxAggregateOutputType | null
  }

  export type SongOccurrenceInLiveAvgAggregateOutputType = {
    songId: number | null
    liveRecordingArchiveId: number | null
    start: number | null
    page: number | null
  }

  export type SongOccurrenceInLiveSumAggregateOutputType = {
    songId: number | null
    liveRecordingArchiveId: number | null
    start: number | null
    page: number | null
  }

  export type SongOccurrenceInLiveMinAggregateOutputType = {
    songId: number | null
    liveRecordingArchiveId: number | null
    start: number | null
    page: number | null
  }

  export type SongOccurrenceInLiveMaxAggregateOutputType = {
    songId: number | null
    liveRecordingArchiveId: number | null
    start: number | null
    page: number | null
  }

  export type SongOccurrenceInLiveCountAggregateOutputType = {
    songId: number
    liveRecordingArchiveId: number
    start: number
    page: number
    _all: number
  }


  export type SongOccurrenceInLiveAvgAggregateInputType = {
    songId?: true
    liveRecordingArchiveId?: true
    start?: true
    page?: true
  }

  export type SongOccurrenceInLiveSumAggregateInputType = {
    songId?: true
    liveRecordingArchiveId?: true
    start?: true
    page?: true
  }

  export type SongOccurrenceInLiveMinAggregateInputType = {
    songId?: true
    liveRecordingArchiveId?: true
    start?: true
    page?: true
  }

  export type SongOccurrenceInLiveMaxAggregateInputType = {
    songId?: true
    liveRecordingArchiveId?: true
    start?: true
    page?: true
  }

  export type SongOccurrenceInLiveCountAggregateInputType = {
    songId?: true
    liveRecordingArchiveId?: true
    start?: true
    page?: true
    _all?: true
  }

  export type SongOccurrenceInLiveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongOccurrenceInLive to aggregate.
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongOccurrenceInLives to fetch.
     */
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongOccurrenceInLives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongOccurrenceInLives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SongOccurrenceInLives
    **/
    _count?: true | SongOccurrenceInLiveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongOccurrenceInLiveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongOccurrenceInLiveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongOccurrenceInLiveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongOccurrenceInLiveMaxAggregateInputType
  }

  export type GetSongOccurrenceInLiveAggregateType<T extends SongOccurrenceInLiveAggregateArgs> = {
        [P in keyof T & keyof AggregateSongOccurrenceInLive]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSongOccurrenceInLive[P]>
      : GetScalarType<T[P], AggregateSongOccurrenceInLive[P]>
  }




  export type SongOccurrenceInLiveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongOccurrenceInLiveWhereInput
    orderBy?: SongOccurrenceInLiveOrderByWithAggregationInput | SongOccurrenceInLiveOrderByWithAggregationInput[]
    by: SongOccurrenceInLiveScalarFieldEnum[] | SongOccurrenceInLiveScalarFieldEnum
    having?: SongOccurrenceInLiveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongOccurrenceInLiveCountAggregateInputType | true
    _avg?: SongOccurrenceInLiveAvgAggregateInputType
    _sum?: SongOccurrenceInLiveSumAggregateInputType
    _min?: SongOccurrenceInLiveMinAggregateInputType
    _max?: SongOccurrenceInLiveMaxAggregateInputType
  }

  export type SongOccurrenceInLiveGroupByOutputType = {
    songId: number
    liveRecordingArchiveId: number
    start: number
    page: number
    _count: SongOccurrenceInLiveCountAggregateOutputType | null
    _avg: SongOccurrenceInLiveAvgAggregateOutputType | null
    _sum: SongOccurrenceInLiveSumAggregateOutputType | null
    _min: SongOccurrenceInLiveMinAggregateOutputType | null
    _max: SongOccurrenceInLiveMaxAggregateOutputType | null
  }

  type GetSongOccurrenceInLiveGroupByPayload<T extends SongOccurrenceInLiveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongOccurrenceInLiveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongOccurrenceInLiveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongOccurrenceInLiveGroupByOutputType[P]>
            : GetScalarType<T[P], SongOccurrenceInLiveGroupByOutputType[P]>
        }
      >
    >


  export type SongOccurrenceInLiveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    songId?: boolean
    liveRecordingArchiveId?: boolean
    start?: boolean
    page?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songOccurrenceInLive"]>

  export type SongOccurrenceInLiveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    songId?: boolean
    liveRecordingArchiveId?: boolean
    start?: boolean
    page?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songOccurrenceInLive"]>

  export type SongOccurrenceInLiveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    songId?: boolean
    liveRecordingArchiveId?: boolean
    start?: boolean
    page?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songOccurrenceInLive"]>

  export type SongOccurrenceInLiveSelectScalar = {
    songId?: boolean
    liveRecordingArchiveId?: boolean
    start?: boolean
    page?: boolean
  }

  export type SongOccurrenceInLiveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"songId" | "liveRecordingArchiveId" | "start" | "page", ExtArgs["result"]["songOccurrenceInLive"]>
  export type SongOccurrenceInLiveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }
  export type SongOccurrenceInLiveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }
  export type SongOccurrenceInLiveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
    liveRecordingArchive?: boolean | LiveRecordingArchiveDefaultArgs<ExtArgs>
  }

  export type $SongOccurrenceInLivePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SongOccurrenceInLive"
    objects: {
      /**
       * The song that was played in the live
       */
      song: Prisma.$SongPayload<ExtArgs>
      /**
       * The live recording archive that the song was played in
       */
      liveRecordingArchive: Prisma.$LiveRecordingArchivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * The id of the song that was played in the live
       */
      songId: number
      /**
       * The id of the live recording archive that the song was played in
       */
      liveRecordingArchiveId: number
      /**
       * The start time of the song in the live (seconds since the start of the live)
       */
      start: number
      /**
       * The page number of the live recording (1-indexed), refer to B站分P视频
       */
      page: number
    }, ExtArgs["result"]["songOccurrenceInLive"]>
    composites: {}
  }

  type SongOccurrenceInLiveGetPayload<S extends boolean | null | undefined | SongOccurrenceInLiveDefaultArgs> = $Result.GetResult<Prisma.$SongOccurrenceInLivePayload, S>

  type SongOccurrenceInLiveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SongOccurrenceInLiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SongOccurrenceInLiveCountAggregateInputType | true
    }

  export interface SongOccurrenceInLiveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SongOccurrenceInLive'], meta: { name: 'SongOccurrenceInLive' } }
    /**
     * Find zero or one SongOccurrenceInLive that matches the filter.
     * @param {SongOccurrenceInLiveFindUniqueArgs} args - Arguments to find a SongOccurrenceInLive
     * @example
     * // Get one SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SongOccurrenceInLiveFindUniqueArgs>(args: SelectSubset<T, SongOccurrenceInLiveFindUniqueArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SongOccurrenceInLive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SongOccurrenceInLiveFindUniqueOrThrowArgs} args - Arguments to find a SongOccurrenceInLive
     * @example
     * // Get one SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SongOccurrenceInLiveFindUniqueOrThrowArgs>(args: SelectSubset<T, SongOccurrenceInLiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SongOccurrenceInLive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveFindFirstArgs} args - Arguments to find a SongOccurrenceInLive
     * @example
     * // Get one SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SongOccurrenceInLiveFindFirstArgs>(args?: SelectSubset<T, SongOccurrenceInLiveFindFirstArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SongOccurrenceInLive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveFindFirstOrThrowArgs} args - Arguments to find a SongOccurrenceInLive
     * @example
     * // Get one SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SongOccurrenceInLiveFindFirstOrThrowArgs>(args?: SelectSubset<T, SongOccurrenceInLiveFindFirstOrThrowArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SongOccurrenceInLives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SongOccurrenceInLives
     * const songOccurrenceInLives = await prisma.songOccurrenceInLive.findMany()
     * 
     * // Get first 10 SongOccurrenceInLives
     * const songOccurrenceInLives = await prisma.songOccurrenceInLive.findMany({ take: 10 })
     * 
     * // Only select the `songId`
     * const songOccurrenceInLiveWithSongIdOnly = await prisma.songOccurrenceInLive.findMany({ select: { songId: true } })
     * 
     */
    findMany<T extends SongOccurrenceInLiveFindManyArgs>(args?: SelectSubset<T, SongOccurrenceInLiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SongOccurrenceInLive.
     * @param {SongOccurrenceInLiveCreateArgs} args - Arguments to create a SongOccurrenceInLive.
     * @example
     * // Create one SongOccurrenceInLive
     * const SongOccurrenceInLive = await prisma.songOccurrenceInLive.create({
     *   data: {
     *     // ... data to create a SongOccurrenceInLive
     *   }
     * })
     * 
     */
    create<T extends SongOccurrenceInLiveCreateArgs>(args: SelectSubset<T, SongOccurrenceInLiveCreateArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SongOccurrenceInLives.
     * @param {SongOccurrenceInLiveCreateManyArgs} args - Arguments to create many SongOccurrenceInLives.
     * @example
     * // Create many SongOccurrenceInLives
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SongOccurrenceInLiveCreateManyArgs>(args?: SelectSubset<T, SongOccurrenceInLiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SongOccurrenceInLives and returns the data saved in the database.
     * @param {SongOccurrenceInLiveCreateManyAndReturnArgs} args - Arguments to create many SongOccurrenceInLives.
     * @example
     * // Create many SongOccurrenceInLives
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SongOccurrenceInLives and only return the `songId`
     * const songOccurrenceInLiveWithSongIdOnly = await prisma.songOccurrenceInLive.createManyAndReturn({
     *   select: { songId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SongOccurrenceInLiveCreateManyAndReturnArgs>(args?: SelectSubset<T, SongOccurrenceInLiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SongOccurrenceInLive.
     * @param {SongOccurrenceInLiveDeleteArgs} args - Arguments to delete one SongOccurrenceInLive.
     * @example
     * // Delete one SongOccurrenceInLive
     * const SongOccurrenceInLive = await prisma.songOccurrenceInLive.delete({
     *   where: {
     *     // ... filter to delete one SongOccurrenceInLive
     *   }
     * })
     * 
     */
    delete<T extends SongOccurrenceInLiveDeleteArgs>(args: SelectSubset<T, SongOccurrenceInLiveDeleteArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SongOccurrenceInLive.
     * @param {SongOccurrenceInLiveUpdateArgs} args - Arguments to update one SongOccurrenceInLive.
     * @example
     * // Update one SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SongOccurrenceInLiveUpdateArgs>(args: SelectSubset<T, SongOccurrenceInLiveUpdateArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SongOccurrenceInLives.
     * @param {SongOccurrenceInLiveDeleteManyArgs} args - Arguments to filter SongOccurrenceInLives to delete.
     * @example
     * // Delete a few SongOccurrenceInLives
     * const { count } = await prisma.songOccurrenceInLive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SongOccurrenceInLiveDeleteManyArgs>(args?: SelectSubset<T, SongOccurrenceInLiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SongOccurrenceInLives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SongOccurrenceInLives
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SongOccurrenceInLiveUpdateManyArgs>(args: SelectSubset<T, SongOccurrenceInLiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SongOccurrenceInLives and returns the data updated in the database.
     * @param {SongOccurrenceInLiveUpdateManyAndReturnArgs} args - Arguments to update many SongOccurrenceInLives.
     * @example
     * // Update many SongOccurrenceInLives
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SongOccurrenceInLives and only return the `songId`
     * const songOccurrenceInLiveWithSongIdOnly = await prisma.songOccurrenceInLive.updateManyAndReturn({
     *   select: { songId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SongOccurrenceInLiveUpdateManyAndReturnArgs>(args: SelectSubset<T, SongOccurrenceInLiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SongOccurrenceInLive.
     * @param {SongOccurrenceInLiveUpsertArgs} args - Arguments to update or create a SongOccurrenceInLive.
     * @example
     * // Update or create a SongOccurrenceInLive
     * const songOccurrenceInLive = await prisma.songOccurrenceInLive.upsert({
     *   create: {
     *     // ... data to create a SongOccurrenceInLive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SongOccurrenceInLive we want to update
     *   }
     * })
     */
    upsert<T extends SongOccurrenceInLiveUpsertArgs>(args: SelectSubset<T, SongOccurrenceInLiveUpsertArgs<ExtArgs>>): Prisma__SongOccurrenceInLiveClient<$Result.GetResult<Prisma.$SongOccurrenceInLivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SongOccurrenceInLives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveCountArgs} args - Arguments to filter SongOccurrenceInLives to count.
     * @example
     * // Count the number of SongOccurrenceInLives
     * const count = await prisma.songOccurrenceInLive.count({
     *   where: {
     *     // ... the filter for the SongOccurrenceInLives we want to count
     *   }
     * })
    **/
    count<T extends SongOccurrenceInLiveCountArgs>(
      args?: Subset<T, SongOccurrenceInLiveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongOccurrenceInLiveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SongOccurrenceInLive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongOccurrenceInLiveAggregateArgs>(args: Subset<T, SongOccurrenceInLiveAggregateArgs>): Prisma.PrismaPromise<GetSongOccurrenceInLiveAggregateType<T>>

    /**
     * Group by SongOccurrenceInLive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongOccurrenceInLiveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongOccurrenceInLiveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongOccurrenceInLiveGroupByArgs['orderBy'] }
        : { orderBy?: SongOccurrenceInLiveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongOccurrenceInLiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongOccurrenceInLiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SongOccurrenceInLive model
   */
  readonly fields: SongOccurrenceInLiveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SongOccurrenceInLive.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongOccurrenceInLiveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    song<T extends SongDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SongDefaultArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    liveRecordingArchive<T extends LiveRecordingArchiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LiveRecordingArchiveDefaultArgs<ExtArgs>>): Prisma__LiveRecordingArchiveClient<$Result.GetResult<Prisma.$LiveRecordingArchivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SongOccurrenceInLive model
   */
  interface SongOccurrenceInLiveFieldRefs {
    readonly songId: FieldRef<"SongOccurrenceInLive", 'Int'>
    readonly liveRecordingArchiveId: FieldRef<"SongOccurrenceInLive", 'Int'>
    readonly start: FieldRef<"SongOccurrenceInLive", 'Int'>
    readonly page: FieldRef<"SongOccurrenceInLive", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SongOccurrenceInLive findUnique
   */
  export type SongOccurrenceInLiveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter, which SongOccurrenceInLive to fetch.
     */
    where: SongOccurrenceInLiveWhereUniqueInput
  }

  /**
   * SongOccurrenceInLive findUniqueOrThrow
   */
  export type SongOccurrenceInLiveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter, which SongOccurrenceInLive to fetch.
     */
    where: SongOccurrenceInLiveWhereUniqueInput
  }

  /**
   * SongOccurrenceInLive findFirst
   */
  export type SongOccurrenceInLiveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter, which SongOccurrenceInLive to fetch.
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongOccurrenceInLives to fetch.
     */
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongOccurrenceInLives.
     */
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongOccurrenceInLives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongOccurrenceInLives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongOccurrenceInLives.
     */
    distinct?: SongOccurrenceInLiveScalarFieldEnum | SongOccurrenceInLiveScalarFieldEnum[]
  }

  /**
   * SongOccurrenceInLive findFirstOrThrow
   */
  export type SongOccurrenceInLiveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter, which SongOccurrenceInLive to fetch.
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongOccurrenceInLives to fetch.
     */
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongOccurrenceInLives.
     */
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongOccurrenceInLives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongOccurrenceInLives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongOccurrenceInLives.
     */
    distinct?: SongOccurrenceInLiveScalarFieldEnum | SongOccurrenceInLiveScalarFieldEnum[]
  }

  /**
   * SongOccurrenceInLive findMany
   */
  export type SongOccurrenceInLiveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter, which SongOccurrenceInLives to fetch.
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongOccurrenceInLives to fetch.
     */
    orderBy?: SongOccurrenceInLiveOrderByWithRelationInput | SongOccurrenceInLiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SongOccurrenceInLives.
     */
    cursor?: SongOccurrenceInLiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongOccurrenceInLives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongOccurrenceInLives.
     */
    skip?: number
    distinct?: SongOccurrenceInLiveScalarFieldEnum | SongOccurrenceInLiveScalarFieldEnum[]
  }

  /**
   * SongOccurrenceInLive create
   */
  export type SongOccurrenceInLiveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * The data needed to create a SongOccurrenceInLive.
     */
    data: XOR<SongOccurrenceInLiveCreateInput, SongOccurrenceInLiveUncheckedCreateInput>
  }

  /**
   * SongOccurrenceInLive createMany
   */
  export type SongOccurrenceInLiveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SongOccurrenceInLives.
     */
    data: SongOccurrenceInLiveCreateManyInput | SongOccurrenceInLiveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SongOccurrenceInLive createManyAndReturn
   */
  export type SongOccurrenceInLiveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * The data used to create many SongOccurrenceInLives.
     */
    data: SongOccurrenceInLiveCreateManyInput | SongOccurrenceInLiveCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SongOccurrenceInLive update
   */
  export type SongOccurrenceInLiveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * The data needed to update a SongOccurrenceInLive.
     */
    data: XOR<SongOccurrenceInLiveUpdateInput, SongOccurrenceInLiveUncheckedUpdateInput>
    /**
     * Choose, which SongOccurrenceInLive to update.
     */
    where: SongOccurrenceInLiveWhereUniqueInput
  }

  /**
   * SongOccurrenceInLive updateMany
   */
  export type SongOccurrenceInLiveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SongOccurrenceInLives.
     */
    data: XOR<SongOccurrenceInLiveUpdateManyMutationInput, SongOccurrenceInLiveUncheckedUpdateManyInput>
    /**
     * Filter which SongOccurrenceInLives to update
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * Limit how many SongOccurrenceInLives to update.
     */
    limit?: number
  }

  /**
   * SongOccurrenceInLive updateManyAndReturn
   */
  export type SongOccurrenceInLiveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * The data used to update SongOccurrenceInLives.
     */
    data: XOR<SongOccurrenceInLiveUpdateManyMutationInput, SongOccurrenceInLiveUncheckedUpdateManyInput>
    /**
     * Filter which SongOccurrenceInLives to update
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * Limit how many SongOccurrenceInLives to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SongOccurrenceInLive upsert
   */
  export type SongOccurrenceInLiveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * The filter to search for the SongOccurrenceInLive to update in case it exists.
     */
    where: SongOccurrenceInLiveWhereUniqueInput
    /**
     * In case the SongOccurrenceInLive found by the `where` argument doesn't exist, create a new SongOccurrenceInLive with this data.
     */
    create: XOR<SongOccurrenceInLiveCreateInput, SongOccurrenceInLiveUncheckedCreateInput>
    /**
     * In case the SongOccurrenceInLive was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongOccurrenceInLiveUpdateInput, SongOccurrenceInLiveUncheckedUpdateInput>
  }

  /**
   * SongOccurrenceInLive delete
   */
  export type SongOccurrenceInLiveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
    /**
     * Filter which SongOccurrenceInLive to delete.
     */
    where: SongOccurrenceInLiveWhereUniqueInput
  }

  /**
   * SongOccurrenceInLive deleteMany
   */
  export type SongOccurrenceInLiveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongOccurrenceInLives to delete
     */
    where?: SongOccurrenceInLiveWhereInput
    /**
     * Limit how many SongOccurrenceInLives to delete.
     */
    limit?: number
  }

  /**
   * SongOccurrenceInLive without action
   */
  export type SongOccurrenceInLiveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongOccurrenceInLive
     */
    select?: SongOccurrenceInLiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongOccurrenceInLive
     */
    omit?: SongOccurrenceInLiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongOccurrenceInLiveInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VtuberProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    defaultThemeId: 'defaultThemeId',
    createdOn: 'createdOn',
    updatedOn: 'updatedOn'
  };

  export type VtuberProfileScalarFieldEnum = (typeof VtuberProfileScalarFieldEnum)[keyof typeof VtuberProfileScalarFieldEnum]


  export const ThemeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    avatarImagePath: 'avatarImagePath',
    backgroundImagePath: 'backgroundImagePath',
    isActive: 'isActive',
    vtuberProfileId: 'vtuberProfileId',
    createdOn: 'createdOn',
    updatedOn: 'updatedOn'
  };

  export type ThemeScalarFieldEnum = (typeof ThemeScalarFieldEnum)[keyof typeof ThemeScalarFieldEnum]


  export const VtuberExternalLinkScalarFieldEnum: {
    id: 'id',
    value: 'value',
    icon: 'icon',
    href: 'href',
    displayOrder: 'displayOrder',
    vtuberProfileId: 'vtuberProfileId',
    createdOn: 'createdOn',
    updatedOn: 'updatedOn'
  };

  export type VtuberExternalLinkScalarFieldEnum = (typeof VtuberExternalLinkScalarFieldEnum)[keyof typeof VtuberExternalLinkScalarFieldEnum]


  export const SongScalarFieldEnum: {
    id: 'id',
    title: 'title',
    artist: 'artist',
    remark: 'remark',
    extra: 'extra',
    created_on: 'created_on',
    lang: 'lang',
    tag: 'tag',
    url: 'url',
    lyrics_fragment: 'lyrics_fragment'
  };

  export type SongScalarFieldEnum = (typeof SongScalarFieldEnum)[keyof typeof SongScalarFieldEnum]


  export const UserScalarFieldEnum: {
    salt: 'salt',
    password_hash: 'password_hash',
    username: 'username'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    content: 'content',
    created_on: 'created_on'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const FooterScalarFieldEnum: {
    content: 'content',
    id: 'id'
  };

  export type FooterScalarFieldEnum = (typeof FooterScalarFieldEnum)[keyof typeof FooterScalarFieldEnum]


  export const LiveRecordingArchiveScalarFieldEnum: {
    id: 'id',
    bvid: 'bvid',
    title: 'title',
    pubdate: 'pubdate',
    duration: 'duration',
    cover: 'cover'
  };

  export type LiveRecordingArchiveScalarFieldEnum = (typeof LiveRecordingArchiveScalarFieldEnum)[keyof typeof LiveRecordingArchiveScalarFieldEnum]


  export const SongOccurrenceInLiveScalarFieldEnum: {
    songId: 'songId',
    liveRecordingArchiveId: 'liveRecordingArchiveId',
    start: 'start',
    page: 'page'
  };

  export type SongOccurrenceInLiveScalarFieldEnum = (typeof SongOccurrenceInLiveScalarFieldEnum)[keyof typeof SongOccurrenceInLiveScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type VtuberProfileWhereInput = {
    AND?: VtuberProfileWhereInput | VtuberProfileWhereInput[]
    OR?: VtuberProfileWhereInput[]
    NOT?: VtuberProfileWhereInput | VtuberProfileWhereInput[]
    id?: IntFilter<"VtuberProfile"> | number
    name?: StringFilter<"VtuberProfile"> | string
    metaTitle?: StringNullableFilter<"VtuberProfile"> | string | null
    metaDescription?: StringNullableFilter<"VtuberProfile"> | string | null
    defaultThemeId?: IntNullableFilter<"VtuberProfile"> | number | null
    createdOn?: DateTimeFilter<"VtuberProfile"> | Date | string
    updatedOn?: DateTimeFilter<"VtuberProfile"> | Date | string
    defaultTheme?: XOR<ThemeNullableScalarRelationFilter, ThemeWhereInput> | null
    externalLinks?: VtuberExternalLinkListRelationFilter
    themes?: ThemeListRelationFilter
  }

  export type VtuberProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    defaultThemeId?: SortOrderInput | SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    defaultTheme?: ThemeOrderByWithRelationInput
    externalLinks?: VtuberExternalLinkOrderByRelationAggregateInput
    themes?: ThemeOrderByRelationAggregateInput
  }

  export type VtuberProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    defaultThemeId?: number
    AND?: VtuberProfileWhereInput | VtuberProfileWhereInput[]
    OR?: VtuberProfileWhereInput[]
    NOT?: VtuberProfileWhereInput | VtuberProfileWhereInput[]
    name?: StringFilter<"VtuberProfile"> | string
    metaTitle?: StringNullableFilter<"VtuberProfile"> | string | null
    metaDescription?: StringNullableFilter<"VtuberProfile"> | string | null
    createdOn?: DateTimeFilter<"VtuberProfile"> | Date | string
    updatedOn?: DateTimeFilter<"VtuberProfile"> | Date | string
    defaultTheme?: XOR<ThemeNullableScalarRelationFilter, ThemeWhereInput> | null
    externalLinks?: VtuberExternalLinkListRelationFilter
    themes?: ThemeListRelationFilter
  }, "id" | "defaultThemeId">

  export type VtuberProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    defaultThemeId?: SortOrderInput | SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    _count?: VtuberProfileCountOrderByAggregateInput
    _avg?: VtuberProfileAvgOrderByAggregateInput
    _max?: VtuberProfileMaxOrderByAggregateInput
    _min?: VtuberProfileMinOrderByAggregateInput
    _sum?: VtuberProfileSumOrderByAggregateInput
  }

  export type VtuberProfileScalarWhereWithAggregatesInput = {
    AND?: VtuberProfileScalarWhereWithAggregatesInput | VtuberProfileScalarWhereWithAggregatesInput[]
    OR?: VtuberProfileScalarWhereWithAggregatesInput[]
    NOT?: VtuberProfileScalarWhereWithAggregatesInput | VtuberProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VtuberProfile"> | number
    name?: StringWithAggregatesFilter<"VtuberProfile"> | string
    metaTitle?: StringNullableWithAggregatesFilter<"VtuberProfile"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"VtuberProfile"> | string | null
    defaultThemeId?: IntNullableWithAggregatesFilter<"VtuberProfile"> | number | null
    createdOn?: DateTimeWithAggregatesFilter<"VtuberProfile"> | Date | string
    updatedOn?: DateTimeWithAggregatesFilter<"VtuberProfile"> | Date | string
  }

  export type ThemeWhereInput = {
    AND?: ThemeWhereInput | ThemeWhereInput[]
    OR?: ThemeWhereInput[]
    NOT?: ThemeWhereInput | ThemeWhereInput[]
    id?: IntFilter<"Theme"> | number
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    avatarImagePath?: StringFilter<"Theme"> | string
    backgroundImagePath?: StringNullableFilter<"Theme"> | string | null
    isActive?: BoolFilter<"Theme"> | boolean
    vtuberProfileId?: IntFilter<"Theme"> | number
    createdOn?: DateTimeFilter<"Theme"> | Date | string
    updatedOn?: DateTimeFilter<"Theme"> | Date | string
    vtuberProfile?: XOR<VtuberProfileScalarRelationFilter, VtuberProfileWhereInput>
    defaultForProfile?: XOR<VtuberProfileNullableScalarRelationFilter, VtuberProfileWhereInput> | null
  }

  export type ThemeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatarImagePath?: SortOrder
    backgroundImagePath?: SortOrderInput | SortOrder
    isActive?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    vtuberProfile?: VtuberProfileOrderByWithRelationInput
    defaultForProfile?: VtuberProfileOrderByWithRelationInput
  }

  export type ThemeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ThemeWhereInput | ThemeWhereInput[]
    OR?: ThemeWhereInput[]
    NOT?: ThemeWhereInput | ThemeWhereInput[]
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    avatarImagePath?: StringFilter<"Theme"> | string
    backgroundImagePath?: StringNullableFilter<"Theme"> | string | null
    isActive?: BoolFilter<"Theme"> | boolean
    vtuberProfileId?: IntFilter<"Theme"> | number
    createdOn?: DateTimeFilter<"Theme"> | Date | string
    updatedOn?: DateTimeFilter<"Theme"> | Date | string
    vtuberProfile?: XOR<VtuberProfileScalarRelationFilter, VtuberProfileWhereInput>
    defaultForProfile?: XOR<VtuberProfileNullableScalarRelationFilter, VtuberProfileWhereInput> | null
  }, "id">

  export type ThemeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatarImagePath?: SortOrder
    backgroundImagePath?: SortOrderInput | SortOrder
    isActive?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    _count?: ThemeCountOrderByAggregateInput
    _avg?: ThemeAvgOrderByAggregateInput
    _max?: ThemeMaxOrderByAggregateInput
    _min?: ThemeMinOrderByAggregateInput
    _sum?: ThemeSumOrderByAggregateInput
  }

  export type ThemeScalarWhereWithAggregatesInput = {
    AND?: ThemeScalarWhereWithAggregatesInput | ThemeScalarWhereWithAggregatesInput[]
    OR?: ThemeScalarWhereWithAggregatesInput[]
    NOT?: ThemeScalarWhereWithAggregatesInput | ThemeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Theme"> | number
    name?: StringWithAggregatesFilter<"Theme"> | string
    description?: StringNullableWithAggregatesFilter<"Theme"> | string | null
    avatarImagePath?: StringWithAggregatesFilter<"Theme"> | string
    backgroundImagePath?: StringNullableWithAggregatesFilter<"Theme"> | string | null
    isActive?: BoolWithAggregatesFilter<"Theme"> | boolean
    vtuberProfileId?: IntWithAggregatesFilter<"Theme"> | number
    createdOn?: DateTimeWithAggregatesFilter<"Theme"> | Date | string
    updatedOn?: DateTimeWithAggregatesFilter<"Theme"> | Date | string
  }

  export type VtuberExternalLinkWhereInput = {
    AND?: VtuberExternalLinkWhereInput | VtuberExternalLinkWhereInput[]
    OR?: VtuberExternalLinkWhereInput[]
    NOT?: VtuberExternalLinkWhereInput | VtuberExternalLinkWhereInput[]
    id?: IntFilter<"VtuberExternalLink"> | number
    value?: StringFilter<"VtuberExternalLink"> | string
    icon?: StringNullableFilter<"VtuberExternalLink"> | string | null
    href?: StringFilter<"VtuberExternalLink"> | string
    displayOrder?: IntFilter<"VtuberExternalLink"> | number
    vtuberProfileId?: IntFilter<"VtuberExternalLink"> | number
    createdOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
    updatedOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
    vtuberProfile?: XOR<VtuberProfileScalarRelationFilter, VtuberProfileWhereInput>
  }

  export type VtuberExternalLinkOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    icon?: SortOrderInput | SortOrder
    href?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    vtuberProfile?: VtuberProfileOrderByWithRelationInput
  }

  export type VtuberExternalLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VtuberExternalLinkWhereInput | VtuberExternalLinkWhereInput[]
    OR?: VtuberExternalLinkWhereInput[]
    NOT?: VtuberExternalLinkWhereInput | VtuberExternalLinkWhereInput[]
    value?: StringFilter<"VtuberExternalLink"> | string
    icon?: StringNullableFilter<"VtuberExternalLink"> | string | null
    href?: StringFilter<"VtuberExternalLink"> | string
    displayOrder?: IntFilter<"VtuberExternalLink"> | number
    vtuberProfileId?: IntFilter<"VtuberExternalLink"> | number
    createdOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
    updatedOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
    vtuberProfile?: XOR<VtuberProfileScalarRelationFilter, VtuberProfileWhereInput>
  }, "id">

  export type VtuberExternalLinkOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    icon?: SortOrderInput | SortOrder
    href?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
    _count?: VtuberExternalLinkCountOrderByAggregateInput
    _avg?: VtuberExternalLinkAvgOrderByAggregateInput
    _max?: VtuberExternalLinkMaxOrderByAggregateInput
    _min?: VtuberExternalLinkMinOrderByAggregateInput
    _sum?: VtuberExternalLinkSumOrderByAggregateInput
  }

  export type VtuberExternalLinkScalarWhereWithAggregatesInput = {
    AND?: VtuberExternalLinkScalarWhereWithAggregatesInput | VtuberExternalLinkScalarWhereWithAggregatesInput[]
    OR?: VtuberExternalLinkScalarWhereWithAggregatesInput[]
    NOT?: VtuberExternalLinkScalarWhereWithAggregatesInput | VtuberExternalLinkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VtuberExternalLink"> | number
    value?: StringWithAggregatesFilter<"VtuberExternalLink"> | string
    icon?: StringNullableWithAggregatesFilter<"VtuberExternalLink"> | string | null
    href?: StringWithAggregatesFilter<"VtuberExternalLink"> | string
    displayOrder?: IntWithAggregatesFilter<"VtuberExternalLink"> | number
    vtuberProfileId?: IntWithAggregatesFilter<"VtuberExternalLink"> | number
    createdOn?: DateTimeWithAggregatesFilter<"VtuberExternalLink"> | Date | string
    updatedOn?: DateTimeWithAggregatesFilter<"VtuberExternalLink"> | Date | string
  }

  export type SongWhereInput = {
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    id?: IntFilter<"Song"> | number
    title?: StringFilter<"Song"> | string
    artist?: StringFilter<"Song"> | string
    remark?: StringFilter<"Song"> | string
    extra?: JsonFilter<"Song">
    created_on?: DateTimeFilter<"Song"> | Date | string
    lang?: StringNullableListFilter<"Song">
    tag?: StringNullableListFilter<"Song">
    url?: StringNullableFilter<"Song"> | string | null
    lyrics_fragment?: StringNullableFilter<"Song"> | string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveListRelationFilter
  }

  export type SongOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    remark?: SortOrder
    extra?: SortOrder
    created_on?: SortOrder
    lang?: SortOrder
    tag?: SortOrder
    url?: SortOrderInput | SortOrder
    lyrics_fragment?: SortOrderInput | SortOrder
    SongOccurrenceInLive?: SongOccurrenceInLiveOrderByRelationAggregateInput
  }

  export type SongWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    title?: StringFilter<"Song"> | string
    artist?: StringFilter<"Song"> | string
    remark?: StringFilter<"Song"> | string
    extra?: JsonFilter<"Song">
    created_on?: DateTimeFilter<"Song"> | Date | string
    lang?: StringNullableListFilter<"Song">
    tag?: StringNullableListFilter<"Song">
    url?: StringNullableFilter<"Song"> | string | null
    lyrics_fragment?: StringNullableFilter<"Song"> | string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveListRelationFilter
  }, "id">

  export type SongOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    remark?: SortOrder
    extra?: SortOrder
    created_on?: SortOrder
    lang?: SortOrder
    tag?: SortOrder
    url?: SortOrderInput | SortOrder
    lyrics_fragment?: SortOrderInput | SortOrder
    _count?: SongCountOrderByAggregateInput
    _avg?: SongAvgOrderByAggregateInput
    _max?: SongMaxOrderByAggregateInput
    _min?: SongMinOrderByAggregateInput
    _sum?: SongSumOrderByAggregateInput
  }

  export type SongScalarWhereWithAggregatesInput = {
    AND?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    OR?: SongScalarWhereWithAggregatesInput[]
    NOT?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Song"> | number
    title?: StringWithAggregatesFilter<"Song"> | string
    artist?: StringWithAggregatesFilter<"Song"> | string
    remark?: StringWithAggregatesFilter<"Song"> | string
    extra?: JsonWithAggregatesFilter<"Song">
    created_on?: DateTimeWithAggregatesFilter<"Song"> | Date | string
    lang?: StringNullableListFilter<"Song">
    tag?: StringNullableListFilter<"Song">
    url?: StringNullableWithAggregatesFilter<"Song"> | string | null
    lyrics_fragment?: StringNullableWithAggregatesFilter<"Song"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    salt?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
  }

  export type UserOrderByWithRelationInput = {
    salt?: SortOrder
    password_hash?: SortOrder
    username?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    salt?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
  }, "username">

  export type UserOrderByWithAggregationInput = {
    salt?: SortOrder
    password_hash?: SortOrder
    username?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    salt?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    content?: StringFilter<"Feedback"> | string
    created_on?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    created_on?: SortOrder
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    content?: StringFilter<"Feedback"> | string
    created_on?: DateTimeFilter<"Feedback"> | Date | string
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    created_on?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    content?: StringWithAggregatesFilter<"Feedback"> | string
    created_on?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type FooterWhereInput = {
    AND?: FooterWhereInput | FooterWhereInput[]
    OR?: FooterWhereInput[]
    NOT?: FooterWhereInput | FooterWhereInput[]
    content?: StringFilter<"Footer"> | string
    id?: IntFilter<"Footer"> | number
  }

  export type FooterOrderByWithRelationInput = {
    content?: SortOrder
    id?: SortOrder
  }

  export type FooterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FooterWhereInput | FooterWhereInput[]
    OR?: FooterWhereInput[]
    NOT?: FooterWhereInput | FooterWhereInput[]
    content?: StringFilter<"Footer"> | string
  }, "id">

  export type FooterOrderByWithAggregationInput = {
    content?: SortOrder
    id?: SortOrder
    _count?: FooterCountOrderByAggregateInput
    _avg?: FooterAvgOrderByAggregateInput
    _max?: FooterMaxOrderByAggregateInput
    _min?: FooterMinOrderByAggregateInput
    _sum?: FooterSumOrderByAggregateInput
  }

  export type FooterScalarWhereWithAggregatesInput = {
    AND?: FooterScalarWhereWithAggregatesInput | FooterScalarWhereWithAggregatesInput[]
    OR?: FooterScalarWhereWithAggregatesInput[]
    NOT?: FooterScalarWhereWithAggregatesInput | FooterScalarWhereWithAggregatesInput[]
    content?: StringWithAggregatesFilter<"Footer"> | string
    id?: IntWithAggregatesFilter<"Footer"> | number
  }

  export type LiveRecordingArchiveWhereInput = {
    AND?: LiveRecordingArchiveWhereInput | LiveRecordingArchiveWhereInput[]
    OR?: LiveRecordingArchiveWhereInput[]
    NOT?: LiveRecordingArchiveWhereInput | LiveRecordingArchiveWhereInput[]
    id?: IntFilter<"LiveRecordingArchive"> | number
    bvid?: StringFilter<"LiveRecordingArchive"> | string
    title?: StringFilter<"LiveRecordingArchive"> | string
    pubdate?: IntFilter<"LiveRecordingArchive"> | number
    duration?: IntFilter<"LiveRecordingArchive"> | number
    cover?: StringFilter<"LiveRecordingArchive"> | string
    SongOccurrenceInLive?: SongOccurrenceInLiveListRelationFilter
  }

  export type LiveRecordingArchiveOrderByWithRelationInput = {
    id?: SortOrder
    bvid?: SortOrder
    title?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
    cover?: SortOrder
    SongOccurrenceInLive?: SongOccurrenceInLiveOrderByRelationAggregateInput
  }

  export type LiveRecordingArchiveWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    bvid?: string
    AND?: LiveRecordingArchiveWhereInput | LiveRecordingArchiveWhereInput[]
    OR?: LiveRecordingArchiveWhereInput[]
    NOT?: LiveRecordingArchiveWhereInput | LiveRecordingArchiveWhereInput[]
    title?: StringFilter<"LiveRecordingArchive"> | string
    pubdate?: IntFilter<"LiveRecordingArchive"> | number
    duration?: IntFilter<"LiveRecordingArchive"> | number
    cover?: StringFilter<"LiveRecordingArchive"> | string
    SongOccurrenceInLive?: SongOccurrenceInLiveListRelationFilter
  }, "id" | "bvid">

  export type LiveRecordingArchiveOrderByWithAggregationInput = {
    id?: SortOrder
    bvid?: SortOrder
    title?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
    cover?: SortOrder
    _count?: LiveRecordingArchiveCountOrderByAggregateInput
    _avg?: LiveRecordingArchiveAvgOrderByAggregateInput
    _max?: LiveRecordingArchiveMaxOrderByAggregateInput
    _min?: LiveRecordingArchiveMinOrderByAggregateInput
    _sum?: LiveRecordingArchiveSumOrderByAggregateInput
  }

  export type LiveRecordingArchiveScalarWhereWithAggregatesInput = {
    AND?: LiveRecordingArchiveScalarWhereWithAggregatesInput | LiveRecordingArchiveScalarWhereWithAggregatesInput[]
    OR?: LiveRecordingArchiveScalarWhereWithAggregatesInput[]
    NOT?: LiveRecordingArchiveScalarWhereWithAggregatesInput | LiveRecordingArchiveScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LiveRecordingArchive"> | number
    bvid?: StringWithAggregatesFilter<"LiveRecordingArchive"> | string
    title?: StringWithAggregatesFilter<"LiveRecordingArchive"> | string
    pubdate?: IntWithAggregatesFilter<"LiveRecordingArchive"> | number
    duration?: IntWithAggregatesFilter<"LiveRecordingArchive"> | number
    cover?: StringWithAggregatesFilter<"LiveRecordingArchive"> | string
  }

  export type SongOccurrenceInLiveWhereInput = {
    AND?: SongOccurrenceInLiveWhereInput | SongOccurrenceInLiveWhereInput[]
    OR?: SongOccurrenceInLiveWhereInput[]
    NOT?: SongOccurrenceInLiveWhereInput | SongOccurrenceInLiveWhereInput[]
    songId?: IntFilter<"SongOccurrenceInLive"> | number
    liveRecordingArchiveId?: IntFilter<"SongOccurrenceInLive"> | number
    start?: IntFilter<"SongOccurrenceInLive"> | number
    page?: IntFilter<"SongOccurrenceInLive"> | number
    song?: XOR<SongScalarRelationFilter, SongWhereInput>
    liveRecordingArchive?: XOR<LiveRecordingArchiveScalarRelationFilter, LiveRecordingArchiveWhereInput>
  }

  export type SongOccurrenceInLiveOrderByWithRelationInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
    song?: SongOrderByWithRelationInput
    liveRecordingArchive?: LiveRecordingArchiveOrderByWithRelationInput
  }

  export type SongOccurrenceInLiveWhereUniqueInput = Prisma.AtLeast<{
    songId_liveRecordingArchiveId?: SongOccurrenceInLiveSongIdLiveRecordingArchiveIdCompoundUniqueInput
    AND?: SongOccurrenceInLiveWhereInput | SongOccurrenceInLiveWhereInput[]
    OR?: SongOccurrenceInLiveWhereInput[]
    NOT?: SongOccurrenceInLiveWhereInput | SongOccurrenceInLiveWhereInput[]
    songId?: IntFilter<"SongOccurrenceInLive"> | number
    liveRecordingArchiveId?: IntFilter<"SongOccurrenceInLive"> | number
    start?: IntFilter<"SongOccurrenceInLive"> | number
    page?: IntFilter<"SongOccurrenceInLive"> | number
    song?: XOR<SongScalarRelationFilter, SongWhereInput>
    liveRecordingArchive?: XOR<LiveRecordingArchiveScalarRelationFilter, LiveRecordingArchiveWhereInput>
  }, "songId_liveRecordingArchiveId">

  export type SongOccurrenceInLiveOrderByWithAggregationInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
    _count?: SongOccurrenceInLiveCountOrderByAggregateInput
    _avg?: SongOccurrenceInLiveAvgOrderByAggregateInput
    _max?: SongOccurrenceInLiveMaxOrderByAggregateInput
    _min?: SongOccurrenceInLiveMinOrderByAggregateInput
    _sum?: SongOccurrenceInLiveSumOrderByAggregateInput
  }

  export type SongOccurrenceInLiveScalarWhereWithAggregatesInput = {
    AND?: SongOccurrenceInLiveScalarWhereWithAggregatesInput | SongOccurrenceInLiveScalarWhereWithAggregatesInput[]
    OR?: SongOccurrenceInLiveScalarWhereWithAggregatesInput[]
    NOT?: SongOccurrenceInLiveScalarWhereWithAggregatesInput | SongOccurrenceInLiveScalarWhereWithAggregatesInput[]
    songId?: IntWithAggregatesFilter<"SongOccurrenceInLive"> | number
    liveRecordingArchiveId?: IntWithAggregatesFilter<"SongOccurrenceInLive"> | number
    start?: IntWithAggregatesFilter<"SongOccurrenceInLive"> | number
    page?: IntWithAggregatesFilter<"SongOccurrenceInLive"> | number
  }

  export type VtuberProfileCreateInput = {
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultTheme?: ThemeCreateNestedOneWithoutDefaultForProfileInput
    externalLinks?: VtuberExternalLinkCreateNestedManyWithoutVtuberProfileInput
    themes?: ThemeCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileUncheckedCreateInput = {
    id?: number
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    defaultThemeId?: number | null
    createdOn?: Date | string
    updatedOn?: Date | string
    externalLinks?: VtuberExternalLinkUncheckedCreateNestedManyWithoutVtuberProfileInput
    themes?: ThemeUncheckedCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultTheme?: ThemeUpdateOneWithoutDefaultForProfileNestedInput
    externalLinks?: VtuberExternalLinkUpdateManyWithoutVtuberProfileNestedInput
    themes?: ThemeUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    defaultThemeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    externalLinks?: VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileNestedInput
    themes?: ThemeUncheckedUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileCreateManyInput = {
    id?: number
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    defaultThemeId?: number | null
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberProfileUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    defaultThemeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeCreateInput = {
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    createdOn?: Date | string
    updatedOn?: Date | string
    vtuberProfile: VtuberProfileCreateNestedOneWithoutThemesInput
    defaultForProfile?: VtuberProfileCreateNestedOneWithoutDefaultThemeInput
  }

  export type ThemeUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    vtuberProfileId: number
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultForProfile?: VtuberProfileUncheckedCreateNestedOneWithoutDefaultThemeInput
  }

  export type ThemeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    vtuberProfile?: VtuberProfileUpdateOneRequiredWithoutThemesNestedInput
    defaultForProfile?: VtuberProfileUpdateOneWithoutDefaultThemeNestedInput
  }

  export type ThemeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    vtuberProfileId?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForProfile?: VtuberProfileUncheckedUpdateOneWithoutDefaultThemeNestedInput
  }

  export type ThemeCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    vtuberProfileId: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type ThemeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    vtuberProfileId?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkCreateInput = {
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    createdOn?: Date | string
    updatedOn?: Date | string
    vtuberProfile: VtuberProfileCreateNestedOneWithoutExternalLinksInput
  }

  export type VtuberExternalLinkUncheckedCreateInput = {
    id?: number
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    vtuberProfileId: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberExternalLinkUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    vtuberProfile?: VtuberProfileUpdateOneRequiredWithoutExternalLinksNestedInput
  }

  export type VtuberExternalLinkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    vtuberProfileId?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkCreateManyInput = {
    id?: number
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    vtuberProfileId: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberExternalLinkUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    vtuberProfileId?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongCreateInput = {
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on?: Date | string
    lang?: SongCreatelangInput | string[]
    tag?: SongCreatetagInput | string[]
    url?: string | null
    lyrics_fragment?: string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveCreateNestedManyWithoutSongInput
  }

  export type SongUncheckedCreateInput = {
    id?: number
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on?: Date | string
    lang?: SongCreatelangInput | string[]
    tag?: SongCreatetagInput | string[]
    url?: string | null
    lyrics_fragment?: string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveUncheckedCreateNestedManyWithoutSongInput
  }

  export type SongUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveUpdateManyWithoutSongNestedInput
  }

  export type SongUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
    SongOccurrenceInLive?: SongOccurrenceInLiveUncheckedUpdateManyWithoutSongNestedInput
  }

  export type SongCreateManyInput = {
    id?: number
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on?: Date | string
    lang?: SongCreatelangInput | string[]
    tag?: SongCreatetagInput | string[]
    url?: string | null
    lyrics_fragment?: string | null
  }

  export type SongUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SongUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    salt: string
    password_hash: string
    username: string
  }

  export type UserUncheckedCreateInput = {
    salt: string
    password_hash: string
    username: string
  }

  export type UserUpdateInput = {
    salt?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateInput = {
    salt?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateManyInput = {
    salt: string
    password_hash: string
    username: string
  }

  export type UserUpdateManyMutationInput = {
    salt?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    salt?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type FeedbackCreateInput = {
    id?: string
    content: string
    created_on?: Date | string
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    content: string
    created_on?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    content: string
    created_on?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FooterCreateInput = {
    content: string
  }

  export type FooterUncheckedCreateInput = {
    content: string
    id?: number
  }

  export type FooterUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
  }

  export type FooterUncheckedUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    id?: IntFieldUpdateOperationsInput | number
  }

  export type FooterCreateManyInput = {
    content: string
    id?: number
  }

  export type FooterUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
  }

  export type FooterUncheckedUpdateManyInput = {
    content?: StringFieldUpdateOperationsInput | string
    id?: IntFieldUpdateOperationsInput | number
  }

  export type LiveRecordingArchiveCreateInput = {
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
    SongOccurrenceInLive?: SongOccurrenceInLiveCreateNestedManyWithoutLiveRecordingArchiveInput
  }

  export type LiveRecordingArchiveUncheckedCreateInput = {
    id?: number
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
    SongOccurrenceInLive?: SongOccurrenceInLiveUncheckedCreateNestedManyWithoutLiveRecordingArchiveInput
  }

  export type LiveRecordingArchiveUpdateInput = {
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
    SongOccurrenceInLive?: SongOccurrenceInLiveUpdateManyWithoutLiveRecordingArchiveNestedInput
  }

  export type LiveRecordingArchiveUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
    SongOccurrenceInLive?: SongOccurrenceInLiveUncheckedUpdateManyWithoutLiveRecordingArchiveNestedInput
  }

  export type LiveRecordingArchiveCreateManyInput = {
    id?: number
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
  }

  export type LiveRecordingArchiveUpdateManyMutationInput = {
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
  }

  export type LiveRecordingArchiveUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
  }

  export type SongOccurrenceInLiveCreateInput = {
    start: number
    page: number
    song: SongCreateNestedOneWithoutSongOccurrenceInLiveInput
    liveRecordingArchive: LiveRecordingArchiveCreateNestedOneWithoutSongOccurrenceInLiveInput
  }

  export type SongOccurrenceInLiveUncheckedCreateInput = {
    songId: number
    liveRecordingArchiveId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveUpdateInput = {
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
    song?: SongUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput
    liveRecordingArchive?: LiveRecordingArchiveUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput
  }

  export type SongOccurrenceInLiveUncheckedUpdateInput = {
    songId?: IntFieldUpdateOperationsInput | number
    liveRecordingArchiveId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type SongOccurrenceInLiveCreateManyInput = {
    songId: number
    liveRecordingArchiveId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveUpdateManyMutationInput = {
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type SongOccurrenceInLiveUncheckedUpdateManyInput = {
    songId?: IntFieldUpdateOperationsInput | number
    liveRecordingArchiveId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ThemeNullableScalarRelationFilter = {
    is?: ThemeWhereInput | null
    isNot?: ThemeWhereInput | null
  }

  export type VtuberExternalLinkListRelationFilter = {
    every?: VtuberExternalLinkWhereInput
    some?: VtuberExternalLinkWhereInput
    none?: VtuberExternalLinkWhereInput
  }

  export type ThemeListRelationFilter = {
    every?: ThemeWhereInput
    some?: ThemeWhereInput
    none?: ThemeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VtuberExternalLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ThemeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VtuberProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    defaultThemeId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    defaultThemeId?: SortOrder
  }

  export type VtuberProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    defaultThemeId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    defaultThemeId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberProfileSumOrderByAggregateInput = {
    id?: SortOrder
    defaultThemeId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type VtuberProfileScalarRelationFilter = {
    is?: VtuberProfileWhereInput
    isNot?: VtuberProfileWhereInput
  }

  export type VtuberProfileNullableScalarRelationFilter = {
    is?: VtuberProfileWhereInput | null
    isNot?: VtuberProfileWhereInput | null
  }

  export type ThemeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarImagePath?: SortOrder
    backgroundImagePath?: SortOrder
    isActive?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type ThemeAvgOrderByAggregateInput = {
    id?: SortOrder
    vtuberProfileId?: SortOrder
  }

  export type ThemeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarImagePath?: SortOrder
    backgroundImagePath?: SortOrder
    isActive?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type ThemeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatarImagePath?: SortOrder
    backgroundImagePath?: SortOrder
    isActive?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type ThemeSumOrderByAggregateInput = {
    id?: SortOrder
    vtuberProfileId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type VtuberExternalLinkCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    href?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberExternalLinkAvgOrderByAggregateInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
  }

  export type VtuberExternalLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    href?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberExternalLinkMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    icon?: SortOrder
    href?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
    createdOn?: SortOrder
    updatedOn?: SortOrder
  }

  export type VtuberExternalLinkSumOrderByAggregateInput = {
    id?: SortOrder
    displayOrder?: SortOrder
    vtuberProfileId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SongOccurrenceInLiveListRelationFilter = {
    every?: SongOccurrenceInLiveWhereInput
    some?: SongOccurrenceInLiveWhereInput
    none?: SongOccurrenceInLiveWhereInput
  }

  export type SongOccurrenceInLiveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SongCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    remark?: SortOrder
    extra?: SortOrder
    created_on?: SortOrder
    lang?: SortOrder
    tag?: SortOrder
    url?: SortOrder
    lyrics_fragment?: SortOrder
  }

  export type SongAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SongMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    remark?: SortOrder
    created_on?: SortOrder
    url?: SortOrder
    lyrics_fragment?: SortOrder
  }

  export type SongMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    remark?: SortOrder
    created_on?: SortOrder
    url?: SortOrder
    lyrics_fragment?: SortOrder
  }

  export type SongSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserCountOrderByAggregateInput = {
    salt?: SortOrder
    password_hash?: SortOrder
    username?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    salt?: SortOrder
    password_hash?: SortOrder
    username?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    salt?: SortOrder
    password_hash?: SortOrder
    username?: SortOrder
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_on?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_on?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_on?: SortOrder
  }

  export type FooterCountOrderByAggregateInput = {
    content?: SortOrder
    id?: SortOrder
  }

  export type FooterAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FooterMaxOrderByAggregateInput = {
    content?: SortOrder
    id?: SortOrder
  }

  export type FooterMinOrderByAggregateInput = {
    content?: SortOrder
    id?: SortOrder
  }

  export type FooterSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LiveRecordingArchiveCountOrderByAggregateInput = {
    id?: SortOrder
    bvid?: SortOrder
    title?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
    cover?: SortOrder
  }

  export type LiveRecordingArchiveAvgOrderByAggregateInput = {
    id?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
  }

  export type LiveRecordingArchiveMaxOrderByAggregateInput = {
    id?: SortOrder
    bvid?: SortOrder
    title?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
    cover?: SortOrder
  }

  export type LiveRecordingArchiveMinOrderByAggregateInput = {
    id?: SortOrder
    bvid?: SortOrder
    title?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
    cover?: SortOrder
  }

  export type LiveRecordingArchiveSumOrderByAggregateInput = {
    id?: SortOrder
    pubdate?: SortOrder
    duration?: SortOrder
  }

  export type SongScalarRelationFilter = {
    is?: SongWhereInput
    isNot?: SongWhereInput
  }

  export type LiveRecordingArchiveScalarRelationFilter = {
    is?: LiveRecordingArchiveWhereInput
    isNot?: LiveRecordingArchiveWhereInput
  }

  export type SongOccurrenceInLiveSongIdLiveRecordingArchiveIdCompoundUniqueInput = {
    songId: number
    liveRecordingArchiveId: number
  }

  export type SongOccurrenceInLiveCountOrderByAggregateInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
  }

  export type SongOccurrenceInLiveAvgOrderByAggregateInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
  }

  export type SongOccurrenceInLiveMaxOrderByAggregateInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
  }

  export type SongOccurrenceInLiveMinOrderByAggregateInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
  }

  export type SongOccurrenceInLiveSumOrderByAggregateInput = {
    songId?: SortOrder
    liveRecordingArchiveId?: SortOrder
    start?: SortOrder
    page?: SortOrder
  }

  export type ThemeCreateNestedOneWithoutDefaultForProfileInput = {
    create?: XOR<ThemeCreateWithoutDefaultForProfileInput, ThemeUncheckedCreateWithoutDefaultForProfileInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutDefaultForProfileInput
    connect?: ThemeWhereUniqueInput
  }

  export type VtuberExternalLinkCreateNestedManyWithoutVtuberProfileInput = {
    create?: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput> | VtuberExternalLinkCreateWithoutVtuberProfileInput[] | VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput | VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput[]
    createMany?: VtuberExternalLinkCreateManyVtuberProfileInputEnvelope
    connect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
  }

  export type ThemeCreateNestedManyWithoutVtuberProfileInput = {
    create?: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput> | ThemeCreateWithoutVtuberProfileInput[] | ThemeUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutVtuberProfileInput | ThemeCreateOrConnectWithoutVtuberProfileInput[]
    createMany?: ThemeCreateManyVtuberProfileInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type VtuberExternalLinkUncheckedCreateNestedManyWithoutVtuberProfileInput = {
    create?: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput> | VtuberExternalLinkCreateWithoutVtuberProfileInput[] | VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput | VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput[]
    createMany?: VtuberExternalLinkCreateManyVtuberProfileInputEnvelope
    connect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
  }

  export type ThemeUncheckedCreateNestedManyWithoutVtuberProfileInput = {
    create?: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput> | ThemeCreateWithoutVtuberProfileInput[] | ThemeUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutVtuberProfileInput | ThemeCreateOrConnectWithoutVtuberProfileInput[]
    createMany?: ThemeCreateManyVtuberProfileInputEnvelope
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ThemeUpdateOneWithoutDefaultForProfileNestedInput = {
    create?: XOR<ThemeCreateWithoutDefaultForProfileInput, ThemeUncheckedCreateWithoutDefaultForProfileInput>
    connectOrCreate?: ThemeCreateOrConnectWithoutDefaultForProfileInput
    upsert?: ThemeUpsertWithoutDefaultForProfileInput
    disconnect?: ThemeWhereInput | boolean
    delete?: ThemeWhereInput | boolean
    connect?: ThemeWhereUniqueInput
    update?: XOR<XOR<ThemeUpdateToOneWithWhereWithoutDefaultForProfileInput, ThemeUpdateWithoutDefaultForProfileInput>, ThemeUncheckedUpdateWithoutDefaultForProfileInput>
  }

  export type VtuberExternalLinkUpdateManyWithoutVtuberProfileNestedInput = {
    create?: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput> | VtuberExternalLinkCreateWithoutVtuberProfileInput[] | VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput | VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput[]
    upsert?: VtuberExternalLinkUpsertWithWhereUniqueWithoutVtuberProfileInput | VtuberExternalLinkUpsertWithWhereUniqueWithoutVtuberProfileInput[]
    createMany?: VtuberExternalLinkCreateManyVtuberProfileInputEnvelope
    set?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    disconnect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    delete?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    connect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    update?: VtuberExternalLinkUpdateWithWhereUniqueWithoutVtuberProfileInput | VtuberExternalLinkUpdateWithWhereUniqueWithoutVtuberProfileInput[]
    updateMany?: VtuberExternalLinkUpdateManyWithWhereWithoutVtuberProfileInput | VtuberExternalLinkUpdateManyWithWhereWithoutVtuberProfileInput[]
    deleteMany?: VtuberExternalLinkScalarWhereInput | VtuberExternalLinkScalarWhereInput[]
  }

  export type ThemeUpdateManyWithoutVtuberProfileNestedInput = {
    create?: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput> | ThemeCreateWithoutVtuberProfileInput[] | ThemeUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutVtuberProfileInput | ThemeCreateOrConnectWithoutVtuberProfileInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutVtuberProfileInput | ThemeUpsertWithWhereUniqueWithoutVtuberProfileInput[]
    createMany?: ThemeCreateManyVtuberProfileInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutVtuberProfileInput | ThemeUpdateWithWhereUniqueWithoutVtuberProfileInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutVtuberProfileInput | ThemeUpdateManyWithWhereWithoutVtuberProfileInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileNestedInput = {
    create?: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput> | VtuberExternalLinkCreateWithoutVtuberProfileInput[] | VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput | VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput[]
    upsert?: VtuberExternalLinkUpsertWithWhereUniqueWithoutVtuberProfileInput | VtuberExternalLinkUpsertWithWhereUniqueWithoutVtuberProfileInput[]
    createMany?: VtuberExternalLinkCreateManyVtuberProfileInputEnvelope
    set?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    disconnect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    delete?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    connect?: VtuberExternalLinkWhereUniqueInput | VtuberExternalLinkWhereUniqueInput[]
    update?: VtuberExternalLinkUpdateWithWhereUniqueWithoutVtuberProfileInput | VtuberExternalLinkUpdateWithWhereUniqueWithoutVtuberProfileInput[]
    updateMany?: VtuberExternalLinkUpdateManyWithWhereWithoutVtuberProfileInput | VtuberExternalLinkUpdateManyWithWhereWithoutVtuberProfileInput[]
    deleteMany?: VtuberExternalLinkScalarWhereInput | VtuberExternalLinkScalarWhereInput[]
  }

  export type ThemeUncheckedUpdateManyWithoutVtuberProfileNestedInput = {
    create?: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput> | ThemeCreateWithoutVtuberProfileInput[] | ThemeUncheckedCreateWithoutVtuberProfileInput[]
    connectOrCreate?: ThemeCreateOrConnectWithoutVtuberProfileInput | ThemeCreateOrConnectWithoutVtuberProfileInput[]
    upsert?: ThemeUpsertWithWhereUniqueWithoutVtuberProfileInput | ThemeUpsertWithWhereUniqueWithoutVtuberProfileInput[]
    createMany?: ThemeCreateManyVtuberProfileInputEnvelope
    set?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    disconnect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    delete?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    connect?: ThemeWhereUniqueInput | ThemeWhereUniqueInput[]
    update?: ThemeUpdateWithWhereUniqueWithoutVtuberProfileInput | ThemeUpdateWithWhereUniqueWithoutVtuberProfileInput[]
    updateMany?: ThemeUpdateManyWithWhereWithoutVtuberProfileInput | ThemeUpdateManyWithWhereWithoutVtuberProfileInput[]
    deleteMany?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
  }

  export type VtuberProfileCreateNestedOneWithoutThemesInput = {
    create?: XOR<VtuberProfileCreateWithoutThemesInput, VtuberProfileUncheckedCreateWithoutThemesInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutThemesInput
    connect?: VtuberProfileWhereUniqueInput
  }

  export type VtuberProfileCreateNestedOneWithoutDefaultThemeInput = {
    create?: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutDefaultThemeInput
    connect?: VtuberProfileWhereUniqueInput
  }

  export type VtuberProfileUncheckedCreateNestedOneWithoutDefaultThemeInput = {
    create?: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutDefaultThemeInput
    connect?: VtuberProfileWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type VtuberProfileUpdateOneRequiredWithoutThemesNestedInput = {
    create?: XOR<VtuberProfileCreateWithoutThemesInput, VtuberProfileUncheckedCreateWithoutThemesInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutThemesInput
    upsert?: VtuberProfileUpsertWithoutThemesInput
    connect?: VtuberProfileWhereUniqueInput
    update?: XOR<XOR<VtuberProfileUpdateToOneWithWhereWithoutThemesInput, VtuberProfileUpdateWithoutThemesInput>, VtuberProfileUncheckedUpdateWithoutThemesInput>
  }

  export type VtuberProfileUpdateOneWithoutDefaultThemeNestedInput = {
    create?: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutDefaultThemeInput
    upsert?: VtuberProfileUpsertWithoutDefaultThemeInput
    disconnect?: VtuberProfileWhereInput | boolean
    delete?: VtuberProfileWhereInput | boolean
    connect?: VtuberProfileWhereUniqueInput
    update?: XOR<XOR<VtuberProfileUpdateToOneWithWhereWithoutDefaultThemeInput, VtuberProfileUpdateWithoutDefaultThemeInput>, VtuberProfileUncheckedUpdateWithoutDefaultThemeInput>
  }

  export type VtuberProfileUncheckedUpdateOneWithoutDefaultThemeNestedInput = {
    create?: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutDefaultThemeInput
    upsert?: VtuberProfileUpsertWithoutDefaultThemeInput
    disconnect?: VtuberProfileWhereInput | boolean
    delete?: VtuberProfileWhereInput | boolean
    connect?: VtuberProfileWhereUniqueInput
    update?: XOR<XOR<VtuberProfileUpdateToOneWithWhereWithoutDefaultThemeInput, VtuberProfileUpdateWithoutDefaultThemeInput>, VtuberProfileUncheckedUpdateWithoutDefaultThemeInput>
  }

  export type VtuberProfileCreateNestedOneWithoutExternalLinksInput = {
    create?: XOR<VtuberProfileCreateWithoutExternalLinksInput, VtuberProfileUncheckedCreateWithoutExternalLinksInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutExternalLinksInput
    connect?: VtuberProfileWhereUniqueInput
  }

  export type VtuberProfileUpdateOneRequiredWithoutExternalLinksNestedInput = {
    create?: XOR<VtuberProfileCreateWithoutExternalLinksInput, VtuberProfileUncheckedCreateWithoutExternalLinksInput>
    connectOrCreate?: VtuberProfileCreateOrConnectWithoutExternalLinksInput
    upsert?: VtuberProfileUpsertWithoutExternalLinksInput
    connect?: VtuberProfileWhereUniqueInput
    update?: XOR<XOR<VtuberProfileUpdateToOneWithWhereWithoutExternalLinksInput, VtuberProfileUpdateWithoutExternalLinksInput>, VtuberProfileUncheckedUpdateWithoutExternalLinksInput>
  }

  export type SongCreatelangInput = {
    set: string[]
  }

  export type SongCreatetagInput = {
    set: string[]
  }

  export type SongOccurrenceInLiveCreateNestedManyWithoutSongInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput> | SongOccurrenceInLiveCreateWithoutSongInput[] | SongOccurrenceInLiveUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutSongInput | SongOccurrenceInLiveCreateOrConnectWithoutSongInput[]
    createMany?: SongOccurrenceInLiveCreateManySongInputEnvelope
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
  }

  export type SongOccurrenceInLiveUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput> | SongOccurrenceInLiveCreateWithoutSongInput[] | SongOccurrenceInLiveUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutSongInput | SongOccurrenceInLiveCreateOrConnectWithoutSongInput[]
    createMany?: SongOccurrenceInLiveCreateManySongInputEnvelope
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
  }

  export type SongUpdatelangInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SongUpdatetagInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SongOccurrenceInLiveUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput> | SongOccurrenceInLiveCreateWithoutSongInput[] | SongOccurrenceInLiveUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutSongInput | SongOccurrenceInLiveCreateOrConnectWithoutSongInput[]
    upsert?: SongOccurrenceInLiveUpsertWithWhereUniqueWithoutSongInput | SongOccurrenceInLiveUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongOccurrenceInLiveCreateManySongInputEnvelope
    set?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    disconnect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    delete?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    update?: SongOccurrenceInLiveUpdateWithWhereUniqueWithoutSongInput | SongOccurrenceInLiveUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongOccurrenceInLiveUpdateManyWithWhereWithoutSongInput | SongOccurrenceInLiveUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
  }

  export type SongOccurrenceInLiveUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput> | SongOccurrenceInLiveCreateWithoutSongInput[] | SongOccurrenceInLiveUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutSongInput | SongOccurrenceInLiveCreateOrConnectWithoutSongInput[]
    upsert?: SongOccurrenceInLiveUpsertWithWhereUniqueWithoutSongInput | SongOccurrenceInLiveUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongOccurrenceInLiveCreateManySongInputEnvelope
    set?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    disconnect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    delete?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    update?: SongOccurrenceInLiveUpdateWithWhereUniqueWithoutSongInput | SongOccurrenceInLiveUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongOccurrenceInLiveUpdateManyWithWhereWithoutSongInput | SongOccurrenceInLiveUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
  }

  export type SongOccurrenceInLiveCreateNestedManyWithoutLiveRecordingArchiveInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput> | SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput[] | SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput[]
    createMany?: SongOccurrenceInLiveCreateManyLiveRecordingArchiveInputEnvelope
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
  }

  export type SongOccurrenceInLiveUncheckedCreateNestedManyWithoutLiveRecordingArchiveInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput> | SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput[] | SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput[]
    createMany?: SongOccurrenceInLiveCreateManyLiveRecordingArchiveInputEnvelope
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
  }

  export type SongOccurrenceInLiveUpdateManyWithoutLiveRecordingArchiveNestedInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput> | SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput[] | SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput[]
    upsert?: SongOccurrenceInLiveUpsertWithWhereUniqueWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpsertWithWhereUniqueWithoutLiveRecordingArchiveInput[]
    createMany?: SongOccurrenceInLiveCreateManyLiveRecordingArchiveInputEnvelope
    set?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    disconnect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    delete?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    update?: SongOccurrenceInLiveUpdateWithWhereUniqueWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpdateWithWhereUniqueWithoutLiveRecordingArchiveInput[]
    updateMany?: SongOccurrenceInLiveUpdateManyWithWhereWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpdateManyWithWhereWithoutLiveRecordingArchiveInput[]
    deleteMany?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
  }

  export type SongOccurrenceInLiveUncheckedUpdateManyWithoutLiveRecordingArchiveNestedInput = {
    create?: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput> | SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput[] | SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput[]
    connectOrCreate?: SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput[]
    upsert?: SongOccurrenceInLiveUpsertWithWhereUniqueWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpsertWithWhereUniqueWithoutLiveRecordingArchiveInput[]
    createMany?: SongOccurrenceInLiveCreateManyLiveRecordingArchiveInputEnvelope
    set?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    disconnect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    delete?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    connect?: SongOccurrenceInLiveWhereUniqueInput | SongOccurrenceInLiveWhereUniqueInput[]
    update?: SongOccurrenceInLiveUpdateWithWhereUniqueWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpdateWithWhereUniqueWithoutLiveRecordingArchiveInput[]
    updateMany?: SongOccurrenceInLiveUpdateManyWithWhereWithoutLiveRecordingArchiveInput | SongOccurrenceInLiveUpdateManyWithWhereWithoutLiveRecordingArchiveInput[]
    deleteMany?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
  }

  export type SongCreateNestedOneWithoutSongOccurrenceInLiveInput = {
    create?: XOR<SongCreateWithoutSongOccurrenceInLiveInput, SongUncheckedCreateWithoutSongOccurrenceInLiveInput>
    connectOrCreate?: SongCreateOrConnectWithoutSongOccurrenceInLiveInput
    connect?: SongWhereUniqueInput
  }

  export type LiveRecordingArchiveCreateNestedOneWithoutSongOccurrenceInLiveInput = {
    create?: XOR<LiveRecordingArchiveCreateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedCreateWithoutSongOccurrenceInLiveInput>
    connectOrCreate?: LiveRecordingArchiveCreateOrConnectWithoutSongOccurrenceInLiveInput
    connect?: LiveRecordingArchiveWhereUniqueInput
  }

  export type SongUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput = {
    create?: XOR<SongCreateWithoutSongOccurrenceInLiveInput, SongUncheckedCreateWithoutSongOccurrenceInLiveInput>
    connectOrCreate?: SongCreateOrConnectWithoutSongOccurrenceInLiveInput
    upsert?: SongUpsertWithoutSongOccurrenceInLiveInput
    connect?: SongWhereUniqueInput
    update?: XOR<XOR<SongUpdateToOneWithWhereWithoutSongOccurrenceInLiveInput, SongUpdateWithoutSongOccurrenceInLiveInput>, SongUncheckedUpdateWithoutSongOccurrenceInLiveInput>
  }

  export type LiveRecordingArchiveUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput = {
    create?: XOR<LiveRecordingArchiveCreateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedCreateWithoutSongOccurrenceInLiveInput>
    connectOrCreate?: LiveRecordingArchiveCreateOrConnectWithoutSongOccurrenceInLiveInput
    upsert?: LiveRecordingArchiveUpsertWithoutSongOccurrenceInLiveInput
    connect?: LiveRecordingArchiveWhereUniqueInput
    update?: XOR<XOR<LiveRecordingArchiveUpdateToOneWithWhereWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUpdateWithoutSongOccurrenceInLiveInput>, LiveRecordingArchiveUncheckedUpdateWithoutSongOccurrenceInLiveInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ThemeCreateWithoutDefaultForProfileInput = {
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    createdOn?: Date | string
    updatedOn?: Date | string
    vtuberProfile: VtuberProfileCreateNestedOneWithoutThemesInput
  }

  export type ThemeUncheckedCreateWithoutDefaultForProfileInput = {
    id?: number
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    vtuberProfileId: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type ThemeCreateOrConnectWithoutDefaultForProfileInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutDefaultForProfileInput, ThemeUncheckedCreateWithoutDefaultForProfileInput>
  }

  export type VtuberExternalLinkCreateWithoutVtuberProfileInput = {
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput = {
    id?: number
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberExternalLinkCreateOrConnectWithoutVtuberProfileInput = {
    where: VtuberExternalLinkWhereUniqueInput
    create: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput>
  }

  export type VtuberExternalLinkCreateManyVtuberProfileInputEnvelope = {
    data: VtuberExternalLinkCreateManyVtuberProfileInput | VtuberExternalLinkCreateManyVtuberProfileInput[]
    skipDuplicates?: boolean
  }

  export type ThemeCreateWithoutVtuberProfileInput = {
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultForProfile?: VtuberProfileCreateNestedOneWithoutDefaultThemeInput
  }

  export type ThemeUncheckedCreateWithoutVtuberProfileInput = {
    id?: number
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultForProfile?: VtuberProfileUncheckedCreateNestedOneWithoutDefaultThemeInput
  }

  export type ThemeCreateOrConnectWithoutVtuberProfileInput = {
    where: ThemeWhereUniqueInput
    create: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput>
  }

  export type ThemeCreateManyVtuberProfileInputEnvelope = {
    data: ThemeCreateManyVtuberProfileInput | ThemeCreateManyVtuberProfileInput[]
    skipDuplicates?: boolean
  }

  export type ThemeUpsertWithoutDefaultForProfileInput = {
    update: XOR<ThemeUpdateWithoutDefaultForProfileInput, ThemeUncheckedUpdateWithoutDefaultForProfileInput>
    create: XOR<ThemeCreateWithoutDefaultForProfileInput, ThemeUncheckedCreateWithoutDefaultForProfileInput>
    where?: ThemeWhereInput
  }

  export type ThemeUpdateToOneWithWhereWithoutDefaultForProfileInput = {
    where?: ThemeWhereInput
    data: XOR<ThemeUpdateWithoutDefaultForProfileInput, ThemeUncheckedUpdateWithoutDefaultForProfileInput>
  }

  export type ThemeUpdateWithoutDefaultForProfileInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    vtuberProfile?: VtuberProfileUpdateOneRequiredWithoutThemesNestedInput
  }

  export type ThemeUncheckedUpdateWithoutDefaultForProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    vtuberProfileId?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkUpsertWithWhereUniqueWithoutVtuberProfileInput = {
    where: VtuberExternalLinkWhereUniqueInput
    update: XOR<VtuberExternalLinkUpdateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedUpdateWithoutVtuberProfileInput>
    create: XOR<VtuberExternalLinkCreateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedCreateWithoutVtuberProfileInput>
  }

  export type VtuberExternalLinkUpdateWithWhereUniqueWithoutVtuberProfileInput = {
    where: VtuberExternalLinkWhereUniqueInput
    data: XOR<VtuberExternalLinkUpdateWithoutVtuberProfileInput, VtuberExternalLinkUncheckedUpdateWithoutVtuberProfileInput>
  }

  export type VtuberExternalLinkUpdateManyWithWhereWithoutVtuberProfileInput = {
    where: VtuberExternalLinkScalarWhereInput
    data: XOR<VtuberExternalLinkUpdateManyMutationInput, VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileInput>
  }

  export type VtuberExternalLinkScalarWhereInput = {
    AND?: VtuberExternalLinkScalarWhereInput | VtuberExternalLinkScalarWhereInput[]
    OR?: VtuberExternalLinkScalarWhereInput[]
    NOT?: VtuberExternalLinkScalarWhereInput | VtuberExternalLinkScalarWhereInput[]
    id?: IntFilter<"VtuberExternalLink"> | number
    value?: StringFilter<"VtuberExternalLink"> | string
    icon?: StringNullableFilter<"VtuberExternalLink"> | string | null
    href?: StringFilter<"VtuberExternalLink"> | string
    displayOrder?: IntFilter<"VtuberExternalLink"> | number
    vtuberProfileId?: IntFilter<"VtuberExternalLink"> | number
    createdOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
    updatedOn?: DateTimeFilter<"VtuberExternalLink"> | Date | string
  }

  export type ThemeUpsertWithWhereUniqueWithoutVtuberProfileInput = {
    where: ThemeWhereUniqueInput
    update: XOR<ThemeUpdateWithoutVtuberProfileInput, ThemeUncheckedUpdateWithoutVtuberProfileInput>
    create: XOR<ThemeCreateWithoutVtuberProfileInput, ThemeUncheckedCreateWithoutVtuberProfileInput>
  }

  export type ThemeUpdateWithWhereUniqueWithoutVtuberProfileInput = {
    where: ThemeWhereUniqueInput
    data: XOR<ThemeUpdateWithoutVtuberProfileInput, ThemeUncheckedUpdateWithoutVtuberProfileInput>
  }

  export type ThemeUpdateManyWithWhereWithoutVtuberProfileInput = {
    where: ThemeScalarWhereInput
    data: XOR<ThemeUpdateManyMutationInput, ThemeUncheckedUpdateManyWithoutVtuberProfileInput>
  }

  export type ThemeScalarWhereInput = {
    AND?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
    OR?: ThemeScalarWhereInput[]
    NOT?: ThemeScalarWhereInput | ThemeScalarWhereInput[]
    id?: IntFilter<"Theme"> | number
    name?: StringFilter<"Theme"> | string
    description?: StringNullableFilter<"Theme"> | string | null
    avatarImagePath?: StringFilter<"Theme"> | string
    backgroundImagePath?: StringNullableFilter<"Theme"> | string | null
    isActive?: BoolFilter<"Theme"> | boolean
    vtuberProfileId?: IntFilter<"Theme"> | number
    createdOn?: DateTimeFilter<"Theme"> | Date | string
    updatedOn?: DateTimeFilter<"Theme"> | Date | string
  }

  export type VtuberProfileCreateWithoutThemesInput = {
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultTheme?: ThemeCreateNestedOneWithoutDefaultForProfileInput
    externalLinks?: VtuberExternalLinkCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileUncheckedCreateWithoutThemesInput = {
    id?: number
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    defaultThemeId?: number | null
    createdOn?: Date | string
    updatedOn?: Date | string
    externalLinks?: VtuberExternalLinkUncheckedCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileCreateOrConnectWithoutThemesInput = {
    where: VtuberProfileWhereUniqueInput
    create: XOR<VtuberProfileCreateWithoutThemesInput, VtuberProfileUncheckedCreateWithoutThemesInput>
  }

  export type VtuberProfileCreateWithoutDefaultThemeInput = {
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    createdOn?: Date | string
    updatedOn?: Date | string
    externalLinks?: VtuberExternalLinkCreateNestedManyWithoutVtuberProfileInput
    themes?: ThemeCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileUncheckedCreateWithoutDefaultThemeInput = {
    id?: number
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    createdOn?: Date | string
    updatedOn?: Date | string
    externalLinks?: VtuberExternalLinkUncheckedCreateNestedManyWithoutVtuberProfileInput
    themes?: ThemeUncheckedCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileCreateOrConnectWithoutDefaultThemeInput = {
    where: VtuberProfileWhereUniqueInput
    create: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
  }

  export type VtuberProfileUpsertWithoutThemesInput = {
    update: XOR<VtuberProfileUpdateWithoutThemesInput, VtuberProfileUncheckedUpdateWithoutThemesInput>
    create: XOR<VtuberProfileCreateWithoutThemesInput, VtuberProfileUncheckedCreateWithoutThemesInput>
    where?: VtuberProfileWhereInput
  }

  export type VtuberProfileUpdateToOneWithWhereWithoutThemesInput = {
    where?: VtuberProfileWhereInput
    data: XOR<VtuberProfileUpdateWithoutThemesInput, VtuberProfileUncheckedUpdateWithoutThemesInput>
  }

  export type VtuberProfileUpdateWithoutThemesInput = {
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultTheme?: ThemeUpdateOneWithoutDefaultForProfileNestedInput
    externalLinks?: VtuberExternalLinkUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileUncheckedUpdateWithoutThemesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    defaultThemeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    externalLinks?: VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileUpsertWithoutDefaultThemeInput = {
    update: XOR<VtuberProfileUpdateWithoutDefaultThemeInput, VtuberProfileUncheckedUpdateWithoutDefaultThemeInput>
    create: XOR<VtuberProfileCreateWithoutDefaultThemeInput, VtuberProfileUncheckedCreateWithoutDefaultThemeInput>
    where?: VtuberProfileWhereInput
  }

  export type VtuberProfileUpdateToOneWithWhereWithoutDefaultThemeInput = {
    where?: VtuberProfileWhereInput
    data: XOR<VtuberProfileUpdateWithoutDefaultThemeInput, VtuberProfileUncheckedUpdateWithoutDefaultThemeInput>
  }

  export type VtuberProfileUpdateWithoutDefaultThemeInput = {
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    externalLinks?: VtuberExternalLinkUpdateManyWithoutVtuberProfileNestedInput
    themes?: ThemeUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileUncheckedUpdateWithoutDefaultThemeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    externalLinks?: VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileNestedInput
    themes?: ThemeUncheckedUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileCreateWithoutExternalLinksInput = {
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    createdOn?: Date | string
    updatedOn?: Date | string
    defaultTheme?: ThemeCreateNestedOneWithoutDefaultForProfileInput
    themes?: ThemeCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileUncheckedCreateWithoutExternalLinksInput = {
    id?: number
    name: string
    metaTitle?: string | null
    metaDescription?: string | null
    defaultThemeId?: number | null
    createdOn?: Date | string
    updatedOn?: Date | string
    themes?: ThemeUncheckedCreateNestedManyWithoutVtuberProfileInput
  }

  export type VtuberProfileCreateOrConnectWithoutExternalLinksInput = {
    where: VtuberProfileWhereUniqueInput
    create: XOR<VtuberProfileCreateWithoutExternalLinksInput, VtuberProfileUncheckedCreateWithoutExternalLinksInput>
  }

  export type VtuberProfileUpsertWithoutExternalLinksInput = {
    update: XOR<VtuberProfileUpdateWithoutExternalLinksInput, VtuberProfileUncheckedUpdateWithoutExternalLinksInput>
    create: XOR<VtuberProfileCreateWithoutExternalLinksInput, VtuberProfileUncheckedCreateWithoutExternalLinksInput>
    where?: VtuberProfileWhereInput
  }

  export type VtuberProfileUpdateToOneWithWhereWithoutExternalLinksInput = {
    where?: VtuberProfileWhereInput
    data: XOR<VtuberProfileUpdateWithoutExternalLinksInput, VtuberProfileUncheckedUpdateWithoutExternalLinksInput>
  }

  export type VtuberProfileUpdateWithoutExternalLinksInput = {
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultTheme?: ThemeUpdateOneWithoutDefaultForProfileNestedInput
    themes?: ThemeUpdateManyWithoutVtuberProfileNestedInput
  }

  export type VtuberProfileUncheckedUpdateWithoutExternalLinksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    defaultThemeId?: NullableIntFieldUpdateOperationsInput | number | null
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    themes?: ThemeUncheckedUpdateManyWithoutVtuberProfileNestedInput
  }

  export type SongOccurrenceInLiveCreateWithoutSongInput = {
    start: number
    page: number
    liveRecordingArchive: LiveRecordingArchiveCreateNestedOneWithoutSongOccurrenceInLiveInput
  }

  export type SongOccurrenceInLiveUncheckedCreateWithoutSongInput = {
    liveRecordingArchiveId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveCreateOrConnectWithoutSongInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    create: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput>
  }

  export type SongOccurrenceInLiveCreateManySongInputEnvelope = {
    data: SongOccurrenceInLiveCreateManySongInput | SongOccurrenceInLiveCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type SongOccurrenceInLiveUpsertWithWhereUniqueWithoutSongInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    update: XOR<SongOccurrenceInLiveUpdateWithoutSongInput, SongOccurrenceInLiveUncheckedUpdateWithoutSongInput>
    create: XOR<SongOccurrenceInLiveCreateWithoutSongInput, SongOccurrenceInLiveUncheckedCreateWithoutSongInput>
  }

  export type SongOccurrenceInLiveUpdateWithWhereUniqueWithoutSongInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    data: XOR<SongOccurrenceInLiveUpdateWithoutSongInput, SongOccurrenceInLiveUncheckedUpdateWithoutSongInput>
  }

  export type SongOccurrenceInLiveUpdateManyWithWhereWithoutSongInput = {
    where: SongOccurrenceInLiveScalarWhereInput
    data: XOR<SongOccurrenceInLiveUpdateManyMutationInput, SongOccurrenceInLiveUncheckedUpdateManyWithoutSongInput>
  }

  export type SongOccurrenceInLiveScalarWhereInput = {
    AND?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
    OR?: SongOccurrenceInLiveScalarWhereInput[]
    NOT?: SongOccurrenceInLiveScalarWhereInput | SongOccurrenceInLiveScalarWhereInput[]
    songId?: IntFilter<"SongOccurrenceInLive"> | number
    liveRecordingArchiveId?: IntFilter<"SongOccurrenceInLive"> | number
    start?: IntFilter<"SongOccurrenceInLive"> | number
    page?: IntFilter<"SongOccurrenceInLive"> | number
  }

  export type SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput = {
    start: number
    page: number
    song: SongCreateNestedOneWithoutSongOccurrenceInLiveInput
  }

  export type SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput = {
    songId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveCreateOrConnectWithoutLiveRecordingArchiveInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    create: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput>
  }

  export type SongOccurrenceInLiveCreateManyLiveRecordingArchiveInputEnvelope = {
    data: SongOccurrenceInLiveCreateManyLiveRecordingArchiveInput | SongOccurrenceInLiveCreateManyLiveRecordingArchiveInput[]
    skipDuplicates?: boolean
  }

  export type SongOccurrenceInLiveUpsertWithWhereUniqueWithoutLiveRecordingArchiveInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    update: XOR<SongOccurrenceInLiveUpdateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedUpdateWithoutLiveRecordingArchiveInput>
    create: XOR<SongOccurrenceInLiveCreateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedCreateWithoutLiveRecordingArchiveInput>
  }

  export type SongOccurrenceInLiveUpdateWithWhereUniqueWithoutLiveRecordingArchiveInput = {
    where: SongOccurrenceInLiveWhereUniqueInput
    data: XOR<SongOccurrenceInLiveUpdateWithoutLiveRecordingArchiveInput, SongOccurrenceInLiveUncheckedUpdateWithoutLiveRecordingArchiveInput>
  }

  export type SongOccurrenceInLiveUpdateManyWithWhereWithoutLiveRecordingArchiveInput = {
    where: SongOccurrenceInLiveScalarWhereInput
    data: XOR<SongOccurrenceInLiveUpdateManyMutationInput, SongOccurrenceInLiveUncheckedUpdateManyWithoutLiveRecordingArchiveInput>
  }

  export type SongCreateWithoutSongOccurrenceInLiveInput = {
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on?: Date | string
    lang?: SongCreatelangInput | string[]
    tag?: SongCreatetagInput | string[]
    url?: string | null
    lyrics_fragment?: string | null
  }

  export type SongUncheckedCreateWithoutSongOccurrenceInLiveInput = {
    id?: number
    title: string
    artist: string
    remark: string
    extra: PrismaJson.SongExtraType
    created_on?: Date | string
    lang?: SongCreatelangInput | string[]
    tag?: SongCreatetagInput | string[]
    url?: string | null
    lyrics_fragment?: string | null
  }

  export type SongCreateOrConnectWithoutSongOccurrenceInLiveInput = {
    where: SongWhereUniqueInput
    create: XOR<SongCreateWithoutSongOccurrenceInLiveInput, SongUncheckedCreateWithoutSongOccurrenceInLiveInput>
  }

  export type LiveRecordingArchiveCreateWithoutSongOccurrenceInLiveInput = {
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
  }

  export type LiveRecordingArchiveUncheckedCreateWithoutSongOccurrenceInLiveInput = {
    id?: number
    bvid: string
    title: string
    pubdate: number
    duration: number
    cover: string
  }

  export type LiveRecordingArchiveCreateOrConnectWithoutSongOccurrenceInLiveInput = {
    where: LiveRecordingArchiveWhereUniqueInput
    create: XOR<LiveRecordingArchiveCreateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedCreateWithoutSongOccurrenceInLiveInput>
  }

  export type SongUpsertWithoutSongOccurrenceInLiveInput = {
    update: XOR<SongUpdateWithoutSongOccurrenceInLiveInput, SongUncheckedUpdateWithoutSongOccurrenceInLiveInput>
    create: XOR<SongCreateWithoutSongOccurrenceInLiveInput, SongUncheckedCreateWithoutSongOccurrenceInLiveInput>
    where?: SongWhereInput
  }

  export type SongUpdateToOneWithWhereWithoutSongOccurrenceInLiveInput = {
    where?: SongWhereInput
    data: XOR<SongUpdateWithoutSongOccurrenceInLiveInput, SongUncheckedUpdateWithoutSongOccurrenceInLiveInput>
  }

  export type SongUpdateWithoutSongOccurrenceInLiveInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SongUncheckedUpdateWithoutSongOccurrenceInLiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    remark?: StringFieldUpdateOperationsInput | string
    extra?: PrismaJson.SongExtraType
    created_on?: DateTimeFieldUpdateOperationsInput | Date | string
    lang?: SongUpdatelangInput | string[]
    tag?: SongUpdatetagInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    lyrics_fragment?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LiveRecordingArchiveUpsertWithoutSongOccurrenceInLiveInput = {
    update: XOR<LiveRecordingArchiveUpdateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedUpdateWithoutSongOccurrenceInLiveInput>
    create: XOR<LiveRecordingArchiveCreateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedCreateWithoutSongOccurrenceInLiveInput>
    where?: LiveRecordingArchiveWhereInput
  }

  export type LiveRecordingArchiveUpdateToOneWithWhereWithoutSongOccurrenceInLiveInput = {
    where?: LiveRecordingArchiveWhereInput
    data: XOR<LiveRecordingArchiveUpdateWithoutSongOccurrenceInLiveInput, LiveRecordingArchiveUncheckedUpdateWithoutSongOccurrenceInLiveInput>
  }

  export type LiveRecordingArchiveUpdateWithoutSongOccurrenceInLiveInput = {
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
  }

  export type LiveRecordingArchiveUncheckedUpdateWithoutSongOccurrenceInLiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    bvid?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    pubdate?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    cover?: StringFieldUpdateOperationsInput | string
  }

  export type VtuberExternalLinkCreateManyVtuberProfileInput = {
    id?: number
    value: string
    icon?: string | null
    href: string
    displayOrder?: number
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type ThemeCreateManyVtuberProfileInput = {
    id?: number
    name: string
    description?: string | null
    avatarImagePath: string
    backgroundImagePath?: string | null
    isActive?: boolean
    createdOn?: Date | string
    updatedOn?: Date | string
  }

  export type VtuberExternalLinkUpdateWithoutVtuberProfileInput = {
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkUncheckedUpdateWithoutVtuberProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VtuberExternalLinkUncheckedUpdateManyWithoutVtuberProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    href?: StringFieldUpdateOperationsInput | string
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ThemeUpdateWithoutVtuberProfileInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForProfile?: VtuberProfileUpdateOneWithoutDefaultThemeNestedInput
  }

  export type ThemeUncheckedUpdateWithoutVtuberProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForProfile?: VtuberProfileUncheckedUpdateOneWithoutDefaultThemeNestedInput
  }

  export type ThemeUncheckedUpdateManyWithoutVtuberProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatarImagePath?: StringFieldUpdateOperationsInput | string
    backgroundImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdOn?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedOn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongOccurrenceInLiveCreateManySongInput = {
    liveRecordingArchiveId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveUpdateWithoutSongInput = {
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
    liveRecordingArchive?: LiveRecordingArchiveUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput
  }

  export type SongOccurrenceInLiveUncheckedUpdateWithoutSongInput = {
    liveRecordingArchiveId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type SongOccurrenceInLiveUncheckedUpdateManyWithoutSongInput = {
    liveRecordingArchiveId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type SongOccurrenceInLiveCreateManyLiveRecordingArchiveInput = {
    songId: number
    start: number
    page: number
  }

  export type SongOccurrenceInLiveUpdateWithoutLiveRecordingArchiveInput = {
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
    song?: SongUpdateOneRequiredWithoutSongOccurrenceInLiveNestedInput
  }

  export type SongOccurrenceInLiveUncheckedUpdateWithoutLiveRecordingArchiveInput = {
    songId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }

  export type SongOccurrenceInLiveUncheckedUpdateManyWithoutLiveRecordingArchiveInput = {
    songId?: IntFieldUpdateOperationsInput | number
    start?: IntFieldUpdateOperationsInput | number
    page?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}