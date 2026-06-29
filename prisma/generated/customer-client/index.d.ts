
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model BackupTarget
 * 
 */
export type BackupTarget = $Result.DefaultSelection<Prisma.$BackupTargetPayload>
/**
 * Model BackupPolicy
 * 
 */
export type BackupPolicy = $Result.DefaultSelection<Prisma.$BackupPolicyPayload>
/**
 * Model BackupJob
 * 
 */
export type BackupJob = $Result.DefaultSelection<Prisma.$BackupJobPayload>
/**
 * Model Snapshot
 * 
 */
export type Snapshot = $Result.DefaultSelection<Prisma.$SnapshotPayload>
/**
 * Model RestoreJob
 * 
 */
export type RestoreJob = $Result.DefaultSelection<Prisma.$RestoreJobPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  User: 'User',
  Admin: 'Admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PolicyStatus: {
  Active: 'Active',
  Paused: 'Paused',
  Deleted: 'Deleted'
};

export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus]


export const JobStatus: {
  Running: 'Running',
  Success: 'Success',
  Failed: 'Failed'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const RestoreStatus: {
  Pending: 'Pending',
  Running: 'Running',
  Completed: 'Completed',
  Failed: 'Failed'
};

export type RestoreStatus = (typeof RestoreStatus)[keyof typeof RestoreStatus]


export const NotificationStatus: {
  Sent: 'Sent',
  Read: 'Read'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PolicyStatus = $Enums.PolicyStatus

export const PolicyStatus: typeof $Enums.PolicyStatus

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type RestoreStatus = $Enums.RestoreStatus

export const RestoreStatus: typeof $Enums.RestoreStatus

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.backupTarget`: Exposes CRUD operations for the **BackupTarget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackupTargets
    * const backupTargets = await prisma.backupTarget.findMany()
    * ```
    */
  get backupTarget(): Prisma.BackupTargetDelegate<ExtArgs>;

  /**
   * `prisma.backupPolicy`: Exposes CRUD operations for the **BackupPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackupPolicies
    * const backupPolicies = await prisma.backupPolicy.findMany()
    * ```
    */
  get backupPolicy(): Prisma.BackupPolicyDelegate<ExtArgs>;

  /**
   * `prisma.backupJob`: Exposes CRUD operations for the **BackupJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackupJobs
    * const backupJobs = await prisma.backupJob.findMany()
    * ```
    */
  get backupJob(): Prisma.BackupJobDelegate<ExtArgs>;

  /**
   * `prisma.snapshot`: Exposes CRUD operations for the **Snapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Snapshots
    * const snapshots = await prisma.snapshot.findMany()
    * ```
    */
  get snapshot(): Prisma.SnapshotDelegate<ExtArgs>;

  /**
   * `prisma.restoreJob`: Exposes CRUD operations for the **RestoreJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RestoreJobs
    * const restoreJobs = await prisma.restoreJob.findMany()
    * ```
    */
  get restoreJob(): Prisma.RestoreJobDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    BackupTarget: 'BackupTarget',
    BackupPolicy: 'BackupPolicy',
    BackupJob: 'BackupJob',
    Snapshot: 'Snapshot',
    RestoreJob: 'RestoreJob',
    Notification: 'Notification',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "backupTarget" | "backupPolicy" | "backupJob" | "snapshot" | "restoreJob" | "notification" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      BackupTarget: {
        payload: Prisma.$BackupTargetPayload<ExtArgs>
        fields: Prisma.BackupTargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackupTargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackupTargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          findFirst: {
            args: Prisma.BackupTargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackupTargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          findMany: {
            args: Prisma.BackupTargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>[]
          }
          create: {
            args: Prisma.BackupTargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          createMany: {
            args: Prisma.BackupTargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackupTargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>[]
          }
          delete: {
            args: Prisma.BackupTargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          update: {
            args: Prisma.BackupTargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          deleteMany: {
            args: Prisma.BackupTargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackupTargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BackupTargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupTargetPayload>
          }
          aggregate: {
            args: Prisma.BackupTargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackupTarget>
          }
          groupBy: {
            args: Prisma.BackupTargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackupTargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackupTargetCountArgs<ExtArgs>
            result: $Utils.Optional<BackupTargetCountAggregateOutputType> | number
          }
        }
      }
      BackupPolicy: {
        payload: Prisma.$BackupPolicyPayload<ExtArgs>
        fields: Prisma.BackupPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackupPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackupPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          findFirst: {
            args: Prisma.BackupPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackupPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          findMany: {
            args: Prisma.BackupPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>[]
          }
          create: {
            args: Prisma.BackupPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          createMany: {
            args: Prisma.BackupPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackupPolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>[]
          }
          delete: {
            args: Prisma.BackupPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          update: {
            args: Prisma.BackupPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          deleteMany: {
            args: Prisma.BackupPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackupPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BackupPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupPolicyPayload>
          }
          aggregate: {
            args: Prisma.BackupPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackupPolicy>
          }
          groupBy: {
            args: Prisma.BackupPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackupPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackupPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<BackupPolicyCountAggregateOutputType> | number
          }
        }
      }
      BackupJob: {
        payload: Prisma.$BackupJobPayload<ExtArgs>
        fields: Prisma.BackupJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackupJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackupJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          findFirst: {
            args: Prisma.BackupJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackupJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          findMany: {
            args: Prisma.BackupJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>[]
          }
          create: {
            args: Prisma.BackupJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          createMany: {
            args: Prisma.BackupJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackupJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>[]
          }
          delete: {
            args: Prisma.BackupJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          update: {
            args: Prisma.BackupJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          deleteMany: {
            args: Prisma.BackupJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackupJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BackupJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackupJobPayload>
          }
          aggregate: {
            args: Prisma.BackupJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackupJob>
          }
          groupBy: {
            args: Prisma.BackupJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackupJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackupJobCountArgs<ExtArgs>
            result: $Utils.Optional<BackupJobCountAggregateOutputType> | number
          }
        }
      }
      Snapshot: {
        payload: Prisma.$SnapshotPayload<ExtArgs>
        fields: Prisma.SnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          findFirst: {
            args: Prisma.SnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          findMany: {
            args: Prisma.SnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>[]
          }
          create: {
            args: Prisma.SnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          createMany: {
            args: Prisma.SnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>[]
          }
          delete: {
            args: Prisma.SnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          update: {
            args: Prisma.SnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          deleteMany: {
            args: Prisma.SnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnapshotPayload>
          }
          aggregate: {
            args: Prisma.SnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSnapshot>
          }
          groupBy: {
            args: Prisma.SnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<SnapshotCountAggregateOutputType> | number
          }
        }
      }
      RestoreJob: {
        payload: Prisma.$RestoreJobPayload<ExtArgs>
        fields: Prisma.RestoreJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestoreJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestoreJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          findFirst: {
            args: Prisma.RestoreJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestoreJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          findMany: {
            args: Prisma.RestoreJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>[]
          }
          create: {
            args: Prisma.RestoreJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          createMany: {
            args: Prisma.RestoreJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestoreJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>[]
          }
          delete: {
            args: Prisma.RestoreJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          update: {
            args: Prisma.RestoreJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          deleteMany: {
            args: Prisma.RestoreJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestoreJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RestoreJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestoreJobPayload>
          }
          aggregate: {
            args: Prisma.RestoreJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestoreJob>
          }
          groupBy: {
            args: Prisma.RestoreJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestoreJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestoreJobCountArgs<ExtArgs>
            result: $Utils.Optional<RestoreJobCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    targets: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targets?: boolean | UserCountOutputTypeCountTargetsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupTargetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type BackupTargetCountOutputType
   */

  export type BackupTargetCountOutputType = {
    policies: number
  }

  export type BackupTargetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policies?: boolean | BackupTargetCountOutputTypeCountPoliciesArgs
  }

  // Custom InputTypes
  /**
   * BackupTargetCountOutputType without action
   */
  export type BackupTargetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTargetCountOutputType
     */
    select?: BackupTargetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BackupTargetCountOutputType without action
   */
  export type BackupTargetCountOutputTypeCountPoliciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupPolicyWhereInput
  }


  /**
   * Count Type BackupPolicyCountOutputType
   */

  export type BackupPolicyCountOutputType = {
    jobs: number
  }

  export type BackupPolicyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | BackupPolicyCountOutputTypeCountJobsArgs
  }

  // Custom InputTypes
  /**
   * BackupPolicyCountOutputType without action
   */
  export type BackupPolicyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicyCountOutputType
     */
    select?: BackupPolicyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BackupPolicyCountOutputType without action
   */
  export type BackupPolicyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupJobWhereInput
  }


  /**
   * Count Type BackupJobCountOutputType
   */

  export type BackupJobCountOutputType = {
    snapshots: number
  }

  export type BackupJobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshots?: boolean | BackupJobCountOutputTypeCountSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * BackupJobCountOutputType without action
   */
  export type BackupJobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJobCountOutputType
     */
    select?: BackupJobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BackupJobCountOutputType without action
   */
  export type BackupJobCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SnapshotWhereInput
  }


  /**
   * Count Type SnapshotCountOutputType
   */

  export type SnapshotCountOutputType = {
    restores: number
  }

  export type SnapshotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restores?: boolean | SnapshotCountOutputTypeCountRestoresArgs
  }

  // Custom InputTypes
  /**
   * SnapshotCountOutputType without action
   */
  export type SnapshotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnapshotCountOutputType
     */
    select?: SnapshotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SnapshotCountOutputType without action
   */
  export type SnapshotCountOutputTypeCountRestoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestoreJobWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.Role | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    created_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    created_at?: true
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
    id: string
    email: string
    name: string
    role: $Enums.Role
    created_at: Date
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
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    created_at?: boolean
    targets?: boolean | User$targetsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    created_at?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targets?: boolean | User$targetsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      targets: Prisma.$BackupTargetPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.Role
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    targets<T extends User$targetsArgs<ExtArgs> = {}>(args?: Subset<T, User$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly created_at: FieldRef<"User", 'DateTime'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  }

  /**
   * User.targets
   */
  export type User$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    where?: BackupTargetWhereInput
    orderBy?: BackupTargetOrderByWithRelationInput | BackupTargetOrderByWithRelationInput[]
    cursor?: BackupTargetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackupTargetScalarFieldEnum | BackupTargetScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model BackupTarget
   */

  export type AggregateBackupTarget = {
    _count: BackupTargetCountAggregateOutputType | null
    _min: BackupTargetMinAggregateOutputType | null
    _max: BackupTargetMaxAggregateOutputType | null
  }

  export type BackupTargetMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    name: string | null
    instance_id: string | null
    volume_id: string | null
    region: string | null
    created_at: Date | null
  }

  export type BackupTargetMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    name: string | null
    instance_id: string | null
    volume_id: string | null
    region: string | null
    created_at: Date | null
  }

  export type BackupTargetCountAggregateOutputType = {
    id: number
    user_id: number
    name: number
    instance_id: number
    volume_id: number
    region: number
    created_at: number
    _all: number
  }


  export type BackupTargetMinAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    instance_id?: true
    volume_id?: true
    region?: true
    created_at?: true
  }

  export type BackupTargetMaxAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    instance_id?: true
    volume_id?: true
    region?: true
    created_at?: true
  }

  export type BackupTargetCountAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    instance_id?: true
    volume_id?: true
    region?: true
    created_at?: true
    _all?: true
  }

  export type BackupTargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupTarget to aggregate.
     */
    where?: BackupTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupTargets to fetch.
     */
    orderBy?: BackupTargetOrderByWithRelationInput | BackupTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackupTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackupTargets
    **/
    _count?: true | BackupTargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackupTargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackupTargetMaxAggregateInputType
  }

  export type GetBackupTargetAggregateType<T extends BackupTargetAggregateArgs> = {
        [P in keyof T & keyof AggregateBackupTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackupTarget[P]>
      : GetScalarType<T[P], AggregateBackupTarget[P]>
  }




  export type BackupTargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupTargetWhereInput
    orderBy?: BackupTargetOrderByWithAggregationInput | BackupTargetOrderByWithAggregationInput[]
    by: BackupTargetScalarFieldEnum[] | BackupTargetScalarFieldEnum
    having?: BackupTargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackupTargetCountAggregateInputType | true
    _min?: BackupTargetMinAggregateInputType
    _max?: BackupTargetMaxAggregateInputType
  }

  export type BackupTargetGroupByOutputType = {
    id: string
    user_id: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at: Date
    _count: BackupTargetCountAggregateOutputType | null
    _min: BackupTargetMinAggregateOutputType | null
    _max: BackupTargetMaxAggregateOutputType | null
  }

  type GetBackupTargetGroupByPayload<T extends BackupTargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackupTargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackupTargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackupTargetGroupByOutputType[P]>
            : GetScalarType<T[P], BackupTargetGroupByOutputType[P]>
        }
      >
    >


  export type BackupTargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    instance_id?: boolean
    volume_id?: boolean
    region?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    policies?: boolean | BackupTarget$policiesArgs<ExtArgs>
    _count?: boolean | BackupTargetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupTarget"]>

  export type BackupTargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    instance_id?: boolean
    volume_id?: boolean
    region?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupTarget"]>

  export type BackupTargetSelectScalar = {
    id?: boolean
    user_id?: boolean
    name?: boolean
    instance_id?: boolean
    volume_id?: boolean
    region?: boolean
    created_at?: boolean
  }

  export type BackupTargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    policies?: boolean | BackupTarget$policiesArgs<ExtArgs>
    _count?: boolean | BackupTargetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BackupTargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BackupTargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackupTarget"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      policies: Prisma.$BackupPolicyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      name: string
      instance_id: string
      volume_id: string
      region: string
      created_at: Date
    }, ExtArgs["result"]["backupTarget"]>
    composites: {}
  }

  type BackupTargetGetPayload<S extends boolean | null | undefined | BackupTargetDefaultArgs> = $Result.GetResult<Prisma.$BackupTargetPayload, S>

  type BackupTargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BackupTargetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BackupTargetCountAggregateInputType | true
    }

  export interface BackupTargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackupTarget'], meta: { name: 'BackupTarget' } }
    /**
     * Find zero or one BackupTarget that matches the filter.
     * @param {BackupTargetFindUniqueArgs} args - Arguments to find a BackupTarget
     * @example
     * // Get one BackupTarget
     * const backupTarget = await prisma.backupTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackupTargetFindUniqueArgs>(args: SelectSubset<T, BackupTargetFindUniqueArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BackupTarget that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BackupTargetFindUniqueOrThrowArgs} args - Arguments to find a BackupTarget
     * @example
     * // Get one BackupTarget
     * const backupTarget = await prisma.backupTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackupTargetFindUniqueOrThrowArgs>(args: SelectSubset<T, BackupTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BackupTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetFindFirstArgs} args - Arguments to find a BackupTarget
     * @example
     * // Get one BackupTarget
     * const backupTarget = await prisma.backupTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackupTargetFindFirstArgs>(args?: SelectSubset<T, BackupTargetFindFirstArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BackupTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetFindFirstOrThrowArgs} args - Arguments to find a BackupTarget
     * @example
     * // Get one BackupTarget
     * const backupTarget = await prisma.backupTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackupTargetFindFirstOrThrowArgs>(args?: SelectSubset<T, BackupTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BackupTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackupTargets
     * const backupTargets = await prisma.backupTarget.findMany()
     * 
     * // Get first 10 BackupTargets
     * const backupTargets = await prisma.backupTarget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backupTargetWithIdOnly = await prisma.backupTarget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackupTargetFindManyArgs>(args?: SelectSubset<T, BackupTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BackupTarget.
     * @param {BackupTargetCreateArgs} args - Arguments to create a BackupTarget.
     * @example
     * // Create one BackupTarget
     * const BackupTarget = await prisma.backupTarget.create({
     *   data: {
     *     // ... data to create a BackupTarget
     *   }
     * })
     * 
     */
    create<T extends BackupTargetCreateArgs>(args: SelectSubset<T, BackupTargetCreateArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BackupTargets.
     * @param {BackupTargetCreateManyArgs} args - Arguments to create many BackupTargets.
     * @example
     * // Create many BackupTargets
     * const backupTarget = await prisma.backupTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackupTargetCreateManyArgs>(args?: SelectSubset<T, BackupTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackupTargets and returns the data saved in the database.
     * @param {BackupTargetCreateManyAndReturnArgs} args - Arguments to create many BackupTargets.
     * @example
     * // Create many BackupTargets
     * const backupTarget = await prisma.backupTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackupTargets and only return the `id`
     * const backupTargetWithIdOnly = await prisma.backupTarget.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackupTargetCreateManyAndReturnArgs>(args?: SelectSubset<T, BackupTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BackupTarget.
     * @param {BackupTargetDeleteArgs} args - Arguments to delete one BackupTarget.
     * @example
     * // Delete one BackupTarget
     * const BackupTarget = await prisma.backupTarget.delete({
     *   where: {
     *     // ... filter to delete one BackupTarget
     *   }
     * })
     * 
     */
    delete<T extends BackupTargetDeleteArgs>(args: SelectSubset<T, BackupTargetDeleteArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BackupTarget.
     * @param {BackupTargetUpdateArgs} args - Arguments to update one BackupTarget.
     * @example
     * // Update one BackupTarget
     * const backupTarget = await prisma.backupTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackupTargetUpdateArgs>(args: SelectSubset<T, BackupTargetUpdateArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BackupTargets.
     * @param {BackupTargetDeleteManyArgs} args - Arguments to filter BackupTargets to delete.
     * @example
     * // Delete a few BackupTargets
     * const { count } = await prisma.backupTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackupTargetDeleteManyArgs>(args?: SelectSubset<T, BackupTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackupTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackupTargets
     * const backupTarget = await prisma.backupTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackupTargetUpdateManyArgs>(args: SelectSubset<T, BackupTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BackupTarget.
     * @param {BackupTargetUpsertArgs} args - Arguments to update or create a BackupTarget.
     * @example
     * // Update or create a BackupTarget
     * const backupTarget = await prisma.backupTarget.upsert({
     *   create: {
     *     // ... data to create a BackupTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackupTarget we want to update
     *   }
     * })
     */
    upsert<T extends BackupTargetUpsertArgs>(args: SelectSubset<T, BackupTargetUpsertArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BackupTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetCountArgs} args - Arguments to filter BackupTargets to count.
     * @example
     * // Count the number of BackupTargets
     * const count = await prisma.backupTarget.count({
     *   where: {
     *     // ... the filter for the BackupTargets we want to count
     *   }
     * })
    **/
    count<T extends BackupTargetCountArgs>(
      args?: Subset<T, BackupTargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackupTargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackupTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BackupTargetAggregateArgs>(args: Subset<T, BackupTargetAggregateArgs>): Prisma.PrismaPromise<GetBackupTargetAggregateType<T>>

    /**
     * Group by BackupTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupTargetGroupByArgs} args - Group by arguments.
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
      T extends BackupTargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackupTargetGroupByArgs['orderBy'] }
        : { orderBy?: BackupTargetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BackupTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackupTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackupTarget model
   */
  readonly fields: BackupTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackupTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackupTargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    policies<T extends BackupTarget$policiesArgs<ExtArgs> = {}>(args?: Subset<T, BackupTarget$policiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the BackupTarget model
   */ 
  interface BackupTargetFieldRefs {
    readonly id: FieldRef<"BackupTarget", 'String'>
    readonly user_id: FieldRef<"BackupTarget", 'String'>
    readonly name: FieldRef<"BackupTarget", 'String'>
    readonly instance_id: FieldRef<"BackupTarget", 'String'>
    readonly volume_id: FieldRef<"BackupTarget", 'String'>
    readonly region: FieldRef<"BackupTarget", 'String'>
    readonly created_at: FieldRef<"BackupTarget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BackupTarget findUnique
   */
  export type BackupTargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter, which BackupTarget to fetch.
     */
    where: BackupTargetWhereUniqueInput
  }

  /**
   * BackupTarget findUniqueOrThrow
   */
  export type BackupTargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter, which BackupTarget to fetch.
     */
    where: BackupTargetWhereUniqueInput
  }

  /**
   * BackupTarget findFirst
   */
  export type BackupTargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter, which BackupTarget to fetch.
     */
    where?: BackupTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupTargets to fetch.
     */
    orderBy?: BackupTargetOrderByWithRelationInput | BackupTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupTargets.
     */
    cursor?: BackupTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupTargets.
     */
    distinct?: BackupTargetScalarFieldEnum | BackupTargetScalarFieldEnum[]
  }

  /**
   * BackupTarget findFirstOrThrow
   */
  export type BackupTargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter, which BackupTarget to fetch.
     */
    where?: BackupTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupTargets to fetch.
     */
    orderBy?: BackupTargetOrderByWithRelationInput | BackupTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupTargets.
     */
    cursor?: BackupTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupTargets.
     */
    distinct?: BackupTargetScalarFieldEnum | BackupTargetScalarFieldEnum[]
  }

  /**
   * BackupTarget findMany
   */
  export type BackupTargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter, which BackupTargets to fetch.
     */
    where?: BackupTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupTargets to fetch.
     */
    orderBy?: BackupTargetOrderByWithRelationInput | BackupTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackupTargets.
     */
    cursor?: BackupTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupTargets.
     */
    skip?: number
    distinct?: BackupTargetScalarFieldEnum | BackupTargetScalarFieldEnum[]
  }

  /**
   * BackupTarget create
   */
  export type BackupTargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * The data needed to create a BackupTarget.
     */
    data: XOR<BackupTargetCreateInput, BackupTargetUncheckedCreateInput>
  }

  /**
   * BackupTarget createMany
   */
  export type BackupTargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackupTargets.
     */
    data: BackupTargetCreateManyInput | BackupTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackupTarget createManyAndReturn
   */
  export type BackupTargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BackupTargets.
     */
    data: BackupTargetCreateManyInput | BackupTargetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackupTarget update
   */
  export type BackupTargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * The data needed to update a BackupTarget.
     */
    data: XOR<BackupTargetUpdateInput, BackupTargetUncheckedUpdateInput>
    /**
     * Choose, which BackupTarget to update.
     */
    where: BackupTargetWhereUniqueInput
  }

  /**
   * BackupTarget updateMany
   */
  export type BackupTargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackupTargets.
     */
    data: XOR<BackupTargetUpdateManyMutationInput, BackupTargetUncheckedUpdateManyInput>
    /**
     * Filter which BackupTargets to update
     */
    where?: BackupTargetWhereInput
  }

  /**
   * BackupTarget upsert
   */
  export type BackupTargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * The filter to search for the BackupTarget to update in case it exists.
     */
    where: BackupTargetWhereUniqueInput
    /**
     * In case the BackupTarget found by the `where` argument doesn't exist, create a new BackupTarget with this data.
     */
    create: XOR<BackupTargetCreateInput, BackupTargetUncheckedCreateInput>
    /**
     * In case the BackupTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackupTargetUpdateInput, BackupTargetUncheckedUpdateInput>
  }

  /**
   * BackupTarget delete
   */
  export type BackupTargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
    /**
     * Filter which BackupTarget to delete.
     */
    where: BackupTargetWhereUniqueInput
  }

  /**
   * BackupTarget deleteMany
   */
  export type BackupTargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupTargets to delete
     */
    where?: BackupTargetWhereInput
  }

  /**
   * BackupTarget.policies
   */
  export type BackupTarget$policiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    where?: BackupPolicyWhereInput
    orderBy?: BackupPolicyOrderByWithRelationInput | BackupPolicyOrderByWithRelationInput[]
    cursor?: BackupPolicyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackupPolicyScalarFieldEnum | BackupPolicyScalarFieldEnum[]
  }

  /**
   * BackupTarget without action
   */
  export type BackupTargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupTarget
     */
    select?: BackupTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupTargetInclude<ExtArgs> | null
  }


  /**
   * Model BackupPolicy
   */

  export type AggregateBackupPolicy = {
    _count: BackupPolicyCountAggregateOutputType | null
    _avg: BackupPolicyAvgAggregateOutputType | null
    _sum: BackupPolicySumAggregateOutputType | null
    _min: BackupPolicyMinAggregateOutputType | null
    _max: BackupPolicyMaxAggregateOutputType | null
  }

  export type BackupPolicyAvgAggregateOutputType = {
    retention_days: number | null
  }

  export type BackupPolicySumAggregateOutputType = {
    retention_days: number | null
  }

  export type BackupPolicyMinAggregateOutputType = {
    id: string | null
    target_id: string | null
    name: string | null
    frequency: string | null
    retention_days: number | null
    email_alerts: boolean | null
    status: $Enums.PolicyStatus | null
    eventbridge_schedule_name: string | null
    created_at: Date | null
  }

  export type BackupPolicyMaxAggregateOutputType = {
    id: string | null
    target_id: string | null
    name: string | null
    frequency: string | null
    retention_days: number | null
    email_alerts: boolean | null
    status: $Enums.PolicyStatus | null
    eventbridge_schedule_name: string | null
    created_at: Date | null
  }

  export type BackupPolicyCountAggregateOutputType = {
    id: number
    target_id: number
    name: number
    frequency: number
    retention_days: number
    email_alerts: number
    status: number
    eventbridge_schedule_name: number
    created_at: number
    _all: number
  }


  export type BackupPolicyAvgAggregateInputType = {
    retention_days?: true
  }

  export type BackupPolicySumAggregateInputType = {
    retention_days?: true
  }

  export type BackupPolicyMinAggregateInputType = {
    id?: true
    target_id?: true
    name?: true
    frequency?: true
    retention_days?: true
    email_alerts?: true
    status?: true
    eventbridge_schedule_name?: true
    created_at?: true
  }

  export type BackupPolicyMaxAggregateInputType = {
    id?: true
    target_id?: true
    name?: true
    frequency?: true
    retention_days?: true
    email_alerts?: true
    status?: true
    eventbridge_schedule_name?: true
    created_at?: true
  }

  export type BackupPolicyCountAggregateInputType = {
    id?: true
    target_id?: true
    name?: true
    frequency?: true
    retention_days?: true
    email_alerts?: true
    status?: true
    eventbridge_schedule_name?: true
    created_at?: true
    _all?: true
  }

  export type BackupPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupPolicy to aggregate.
     */
    where?: BackupPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupPolicies to fetch.
     */
    orderBy?: BackupPolicyOrderByWithRelationInput | BackupPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackupPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackupPolicies
    **/
    _count?: true | BackupPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BackupPolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BackupPolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackupPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackupPolicyMaxAggregateInputType
  }

  export type GetBackupPolicyAggregateType<T extends BackupPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateBackupPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackupPolicy[P]>
      : GetScalarType<T[P], AggregateBackupPolicy[P]>
  }




  export type BackupPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupPolicyWhereInput
    orderBy?: BackupPolicyOrderByWithAggregationInput | BackupPolicyOrderByWithAggregationInput[]
    by: BackupPolicyScalarFieldEnum[] | BackupPolicyScalarFieldEnum
    having?: BackupPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackupPolicyCountAggregateInputType | true
    _avg?: BackupPolicyAvgAggregateInputType
    _sum?: BackupPolicySumAggregateInputType
    _min?: BackupPolicyMinAggregateInputType
    _max?: BackupPolicyMaxAggregateInputType
  }

  export type BackupPolicyGroupByOutputType = {
    id: string
    target_id: string
    name: string
    frequency: string
    retention_days: number
    email_alerts: boolean
    status: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at: Date
    _count: BackupPolicyCountAggregateOutputType | null
    _avg: BackupPolicyAvgAggregateOutputType | null
    _sum: BackupPolicySumAggregateOutputType | null
    _min: BackupPolicyMinAggregateOutputType | null
    _max: BackupPolicyMaxAggregateOutputType | null
  }

  type GetBackupPolicyGroupByPayload<T extends BackupPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackupPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackupPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackupPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], BackupPolicyGroupByOutputType[P]>
        }
      >
    >


  export type BackupPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target_id?: boolean
    name?: boolean
    frequency?: boolean
    retention_days?: boolean
    email_alerts?: boolean
    status?: boolean
    eventbridge_schedule_name?: boolean
    created_at?: boolean
    target?: boolean | BackupTargetDefaultArgs<ExtArgs>
    jobs?: boolean | BackupPolicy$jobsArgs<ExtArgs>
    _count?: boolean | BackupPolicyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupPolicy"]>

  export type BackupPolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target_id?: boolean
    name?: boolean
    frequency?: boolean
    retention_days?: boolean
    email_alerts?: boolean
    status?: boolean
    eventbridge_schedule_name?: boolean
    created_at?: boolean
    target?: boolean | BackupTargetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupPolicy"]>

  export type BackupPolicySelectScalar = {
    id?: boolean
    target_id?: boolean
    name?: boolean
    frequency?: boolean
    retention_days?: boolean
    email_alerts?: boolean
    status?: boolean
    eventbridge_schedule_name?: boolean
    created_at?: boolean
  }

  export type BackupPolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | BackupTargetDefaultArgs<ExtArgs>
    jobs?: boolean | BackupPolicy$jobsArgs<ExtArgs>
    _count?: boolean | BackupPolicyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BackupPolicyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    target?: boolean | BackupTargetDefaultArgs<ExtArgs>
  }

  export type $BackupPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackupPolicy"
    objects: {
      target: Prisma.$BackupTargetPayload<ExtArgs>
      jobs: Prisma.$BackupJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      target_id: string
      name: string
      frequency: string
      retention_days: number
      email_alerts: boolean
      status: $Enums.PolicyStatus
      eventbridge_schedule_name: string
      created_at: Date
    }, ExtArgs["result"]["backupPolicy"]>
    composites: {}
  }

  type BackupPolicyGetPayload<S extends boolean | null | undefined | BackupPolicyDefaultArgs> = $Result.GetResult<Prisma.$BackupPolicyPayload, S>

  type BackupPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BackupPolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BackupPolicyCountAggregateInputType | true
    }

  export interface BackupPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackupPolicy'], meta: { name: 'BackupPolicy' } }
    /**
     * Find zero or one BackupPolicy that matches the filter.
     * @param {BackupPolicyFindUniqueArgs} args - Arguments to find a BackupPolicy
     * @example
     * // Get one BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackupPolicyFindUniqueArgs>(args: SelectSubset<T, BackupPolicyFindUniqueArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BackupPolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BackupPolicyFindUniqueOrThrowArgs} args - Arguments to find a BackupPolicy
     * @example
     * // Get one BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackupPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, BackupPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BackupPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyFindFirstArgs} args - Arguments to find a BackupPolicy
     * @example
     * // Get one BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackupPolicyFindFirstArgs>(args?: SelectSubset<T, BackupPolicyFindFirstArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BackupPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyFindFirstOrThrowArgs} args - Arguments to find a BackupPolicy
     * @example
     * // Get one BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackupPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, BackupPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BackupPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackupPolicies
     * const backupPolicies = await prisma.backupPolicy.findMany()
     * 
     * // Get first 10 BackupPolicies
     * const backupPolicies = await prisma.backupPolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backupPolicyWithIdOnly = await prisma.backupPolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackupPolicyFindManyArgs>(args?: SelectSubset<T, BackupPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BackupPolicy.
     * @param {BackupPolicyCreateArgs} args - Arguments to create a BackupPolicy.
     * @example
     * // Create one BackupPolicy
     * const BackupPolicy = await prisma.backupPolicy.create({
     *   data: {
     *     // ... data to create a BackupPolicy
     *   }
     * })
     * 
     */
    create<T extends BackupPolicyCreateArgs>(args: SelectSubset<T, BackupPolicyCreateArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BackupPolicies.
     * @param {BackupPolicyCreateManyArgs} args - Arguments to create many BackupPolicies.
     * @example
     * // Create many BackupPolicies
     * const backupPolicy = await prisma.backupPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackupPolicyCreateManyArgs>(args?: SelectSubset<T, BackupPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackupPolicies and returns the data saved in the database.
     * @param {BackupPolicyCreateManyAndReturnArgs} args - Arguments to create many BackupPolicies.
     * @example
     * // Create many BackupPolicies
     * const backupPolicy = await prisma.backupPolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackupPolicies and only return the `id`
     * const backupPolicyWithIdOnly = await prisma.backupPolicy.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackupPolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, BackupPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BackupPolicy.
     * @param {BackupPolicyDeleteArgs} args - Arguments to delete one BackupPolicy.
     * @example
     * // Delete one BackupPolicy
     * const BackupPolicy = await prisma.backupPolicy.delete({
     *   where: {
     *     // ... filter to delete one BackupPolicy
     *   }
     * })
     * 
     */
    delete<T extends BackupPolicyDeleteArgs>(args: SelectSubset<T, BackupPolicyDeleteArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BackupPolicy.
     * @param {BackupPolicyUpdateArgs} args - Arguments to update one BackupPolicy.
     * @example
     * // Update one BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackupPolicyUpdateArgs>(args: SelectSubset<T, BackupPolicyUpdateArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BackupPolicies.
     * @param {BackupPolicyDeleteManyArgs} args - Arguments to filter BackupPolicies to delete.
     * @example
     * // Delete a few BackupPolicies
     * const { count } = await prisma.backupPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackupPolicyDeleteManyArgs>(args?: SelectSubset<T, BackupPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackupPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackupPolicies
     * const backupPolicy = await prisma.backupPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackupPolicyUpdateManyArgs>(args: SelectSubset<T, BackupPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BackupPolicy.
     * @param {BackupPolicyUpsertArgs} args - Arguments to update or create a BackupPolicy.
     * @example
     * // Update or create a BackupPolicy
     * const backupPolicy = await prisma.backupPolicy.upsert({
     *   create: {
     *     // ... data to create a BackupPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackupPolicy we want to update
     *   }
     * })
     */
    upsert<T extends BackupPolicyUpsertArgs>(args: SelectSubset<T, BackupPolicyUpsertArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BackupPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyCountArgs} args - Arguments to filter BackupPolicies to count.
     * @example
     * // Count the number of BackupPolicies
     * const count = await prisma.backupPolicy.count({
     *   where: {
     *     // ... the filter for the BackupPolicies we want to count
     *   }
     * })
    **/
    count<T extends BackupPolicyCountArgs>(
      args?: Subset<T, BackupPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackupPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackupPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BackupPolicyAggregateArgs>(args: Subset<T, BackupPolicyAggregateArgs>): Prisma.PrismaPromise<GetBackupPolicyAggregateType<T>>

    /**
     * Group by BackupPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupPolicyGroupByArgs} args - Group by arguments.
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
      T extends BackupPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackupPolicyGroupByArgs['orderBy'] }
        : { orderBy?: BackupPolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BackupPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackupPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackupPolicy model
   */
  readonly fields: BackupPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackupPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackupPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    target<T extends BackupTargetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BackupTargetDefaultArgs<ExtArgs>>): Prisma__BackupTargetClient<$Result.GetResult<Prisma.$BackupTargetPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jobs<T extends BackupPolicy$jobsArgs<ExtArgs> = {}>(args?: Subset<T, BackupPolicy$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the BackupPolicy model
   */ 
  interface BackupPolicyFieldRefs {
    readonly id: FieldRef<"BackupPolicy", 'String'>
    readonly target_id: FieldRef<"BackupPolicy", 'String'>
    readonly name: FieldRef<"BackupPolicy", 'String'>
    readonly frequency: FieldRef<"BackupPolicy", 'String'>
    readonly retention_days: FieldRef<"BackupPolicy", 'Int'>
    readonly email_alerts: FieldRef<"BackupPolicy", 'Boolean'>
    readonly status: FieldRef<"BackupPolicy", 'PolicyStatus'>
    readonly eventbridge_schedule_name: FieldRef<"BackupPolicy", 'String'>
    readonly created_at: FieldRef<"BackupPolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BackupPolicy findUnique
   */
  export type BackupPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BackupPolicy to fetch.
     */
    where: BackupPolicyWhereUniqueInput
  }

  /**
   * BackupPolicy findUniqueOrThrow
   */
  export type BackupPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BackupPolicy to fetch.
     */
    where: BackupPolicyWhereUniqueInput
  }

  /**
   * BackupPolicy findFirst
   */
  export type BackupPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BackupPolicy to fetch.
     */
    where?: BackupPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupPolicies to fetch.
     */
    orderBy?: BackupPolicyOrderByWithRelationInput | BackupPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupPolicies.
     */
    cursor?: BackupPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupPolicies.
     */
    distinct?: BackupPolicyScalarFieldEnum | BackupPolicyScalarFieldEnum[]
  }

  /**
   * BackupPolicy findFirstOrThrow
   */
  export type BackupPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BackupPolicy to fetch.
     */
    where?: BackupPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupPolicies to fetch.
     */
    orderBy?: BackupPolicyOrderByWithRelationInput | BackupPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupPolicies.
     */
    cursor?: BackupPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupPolicies.
     */
    distinct?: BackupPolicyScalarFieldEnum | BackupPolicyScalarFieldEnum[]
  }

  /**
   * BackupPolicy findMany
   */
  export type BackupPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter, which BackupPolicies to fetch.
     */
    where?: BackupPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupPolicies to fetch.
     */
    orderBy?: BackupPolicyOrderByWithRelationInput | BackupPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackupPolicies.
     */
    cursor?: BackupPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupPolicies.
     */
    skip?: number
    distinct?: BackupPolicyScalarFieldEnum | BackupPolicyScalarFieldEnum[]
  }

  /**
   * BackupPolicy create
   */
  export type BackupPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a BackupPolicy.
     */
    data: XOR<BackupPolicyCreateInput, BackupPolicyUncheckedCreateInput>
  }

  /**
   * BackupPolicy createMany
   */
  export type BackupPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackupPolicies.
     */
    data: BackupPolicyCreateManyInput | BackupPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackupPolicy createManyAndReturn
   */
  export type BackupPolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BackupPolicies.
     */
    data: BackupPolicyCreateManyInput | BackupPolicyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackupPolicy update
   */
  export type BackupPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a BackupPolicy.
     */
    data: XOR<BackupPolicyUpdateInput, BackupPolicyUncheckedUpdateInput>
    /**
     * Choose, which BackupPolicy to update.
     */
    where: BackupPolicyWhereUniqueInput
  }

  /**
   * BackupPolicy updateMany
   */
  export type BackupPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackupPolicies.
     */
    data: XOR<BackupPolicyUpdateManyMutationInput, BackupPolicyUncheckedUpdateManyInput>
    /**
     * Filter which BackupPolicies to update
     */
    where?: BackupPolicyWhereInput
  }

  /**
   * BackupPolicy upsert
   */
  export type BackupPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the BackupPolicy to update in case it exists.
     */
    where: BackupPolicyWhereUniqueInput
    /**
     * In case the BackupPolicy found by the `where` argument doesn't exist, create a new BackupPolicy with this data.
     */
    create: XOR<BackupPolicyCreateInput, BackupPolicyUncheckedCreateInput>
    /**
     * In case the BackupPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackupPolicyUpdateInput, BackupPolicyUncheckedUpdateInput>
  }

  /**
   * BackupPolicy delete
   */
  export type BackupPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
    /**
     * Filter which BackupPolicy to delete.
     */
    where: BackupPolicyWhereUniqueInput
  }

  /**
   * BackupPolicy deleteMany
   */
  export type BackupPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupPolicies to delete
     */
    where?: BackupPolicyWhereInput
  }

  /**
   * BackupPolicy.jobs
   */
  export type BackupPolicy$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    where?: BackupJobWhereInput
    orderBy?: BackupJobOrderByWithRelationInput | BackupJobOrderByWithRelationInput[]
    cursor?: BackupJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BackupJobScalarFieldEnum | BackupJobScalarFieldEnum[]
  }

  /**
   * BackupPolicy without action
   */
  export type BackupPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupPolicy
     */
    select?: BackupPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupPolicyInclude<ExtArgs> | null
  }


  /**
   * Model BackupJob
   */

  export type AggregateBackupJob = {
    _count: BackupJobCountAggregateOutputType | null
    _min: BackupJobMinAggregateOutputType | null
    _max: BackupJobMaxAggregateOutputType | null
  }

  export type BackupJobMinAggregateOutputType = {
    id: string | null
    policy_id: string | null
    started_at: Date | null
    completed_at: Date | null
    status: $Enums.JobStatus | null
    error_message: string | null
  }

  export type BackupJobMaxAggregateOutputType = {
    id: string | null
    policy_id: string | null
    started_at: Date | null
    completed_at: Date | null
    status: $Enums.JobStatus | null
    error_message: string | null
  }

  export type BackupJobCountAggregateOutputType = {
    id: number
    policy_id: number
    started_at: number
    completed_at: number
    status: number
    error_message: number
    _all: number
  }


  export type BackupJobMinAggregateInputType = {
    id?: true
    policy_id?: true
    started_at?: true
    completed_at?: true
    status?: true
    error_message?: true
  }

  export type BackupJobMaxAggregateInputType = {
    id?: true
    policy_id?: true
    started_at?: true
    completed_at?: true
    status?: true
    error_message?: true
  }

  export type BackupJobCountAggregateInputType = {
    id?: true
    policy_id?: true
    started_at?: true
    completed_at?: true
    status?: true
    error_message?: true
    _all?: true
  }

  export type BackupJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupJob to aggregate.
     */
    where?: BackupJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupJobs to fetch.
     */
    orderBy?: BackupJobOrderByWithRelationInput | BackupJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackupJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackupJobs
    **/
    _count?: true | BackupJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackupJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackupJobMaxAggregateInputType
  }

  export type GetBackupJobAggregateType<T extends BackupJobAggregateArgs> = {
        [P in keyof T & keyof AggregateBackupJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackupJob[P]>
      : GetScalarType<T[P], AggregateBackupJob[P]>
  }




  export type BackupJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackupJobWhereInput
    orderBy?: BackupJobOrderByWithAggregationInput | BackupJobOrderByWithAggregationInput[]
    by: BackupJobScalarFieldEnum[] | BackupJobScalarFieldEnum
    having?: BackupJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackupJobCountAggregateInputType | true
    _min?: BackupJobMinAggregateInputType
    _max?: BackupJobMaxAggregateInputType
  }

  export type BackupJobGroupByOutputType = {
    id: string
    policy_id: string
    started_at: Date
    completed_at: Date | null
    status: $Enums.JobStatus
    error_message: string | null
    _count: BackupJobCountAggregateOutputType | null
    _min: BackupJobMinAggregateOutputType | null
    _max: BackupJobMaxAggregateOutputType | null
  }

  type GetBackupJobGroupByPayload<T extends BackupJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackupJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackupJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackupJobGroupByOutputType[P]>
            : GetScalarType<T[P], BackupJobGroupByOutputType[P]>
        }
      >
    >


  export type BackupJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policy_id?: boolean
    started_at?: boolean
    completed_at?: boolean
    status?: boolean
    error_message?: boolean
    policy?: boolean | BackupPolicyDefaultArgs<ExtArgs>
    snapshots?: boolean | BackupJob$snapshotsArgs<ExtArgs>
    _count?: boolean | BackupJobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupJob"]>

  export type BackupJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    policy_id?: boolean
    started_at?: boolean
    completed_at?: boolean
    status?: boolean
    error_message?: boolean
    policy?: boolean | BackupPolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backupJob"]>

  export type BackupJobSelectScalar = {
    id?: boolean
    policy_id?: boolean
    started_at?: boolean
    completed_at?: boolean
    status?: boolean
    error_message?: boolean
  }

  export type BackupJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy?: boolean | BackupPolicyDefaultArgs<ExtArgs>
    snapshots?: boolean | BackupJob$snapshotsArgs<ExtArgs>
    _count?: boolean | BackupJobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BackupJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy?: boolean | BackupPolicyDefaultArgs<ExtArgs>
  }

  export type $BackupJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackupJob"
    objects: {
      policy: Prisma.$BackupPolicyPayload<ExtArgs>
      snapshots: Prisma.$SnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      policy_id: string
      started_at: Date
      completed_at: Date | null
      status: $Enums.JobStatus
      error_message: string | null
    }, ExtArgs["result"]["backupJob"]>
    composites: {}
  }

  type BackupJobGetPayload<S extends boolean | null | undefined | BackupJobDefaultArgs> = $Result.GetResult<Prisma.$BackupJobPayload, S>

  type BackupJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BackupJobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BackupJobCountAggregateInputType | true
    }

  export interface BackupJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackupJob'], meta: { name: 'BackupJob' } }
    /**
     * Find zero or one BackupJob that matches the filter.
     * @param {BackupJobFindUniqueArgs} args - Arguments to find a BackupJob
     * @example
     * // Get one BackupJob
     * const backupJob = await prisma.backupJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackupJobFindUniqueArgs>(args: SelectSubset<T, BackupJobFindUniqueArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BackupJob that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BackupJobFindUniqueOrThrowArgs} args - Arguments to find a BackupJob
     * @example
     * // Get one BackupJob
     * const backupJob = await prisma.backupJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackupJobFindUniqueOrThrowArgs>(args: SelectSubset<T, BackupJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BackupJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobFindFirstArgs} args - Arguments to find a BackupJob
     * @example
     * // Get one BackupJob
     * const backupJob = await prisma.backupJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackupJobFindFirstArgs>(args?: SelectSubset<T, BackupJobFindFirstArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BackupJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobFindFirstOrThrowArgs} args - Arguments to find a BackupJob
     * @example
     * // Get one BackupJob
     * const backupJob = await prisma.backupJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackupJobFindFirstOrThrowArgs>(args?: SelectSubset<T, BackupJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BackupJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackupJobs
     * const backupJobs = await prisma.backupJob.findMany()
     * 
     * // Get first 10 BackupJobs
     * const backupJobs = await prisma.backupJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backupJobWithIdOnly = await prisma.backupJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackupJobFindManyArgs>(args?: SelectSubset<T, BackupJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BackupJob.
     * @param {BackupJobCreateArgs} args - Arguments to create a BackupJob.
     * @example
     * // Create one BackupJob
     * const BackupJob = await prisma.backupJob.create({
     *   data: {
     *     // ... data to create a BackupJob
     *   }
     * })
     * 
     */
    create<T extends BackupJobCreateArgs>(args: SelectSubset<T, BackupJobCreateArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BackupJobs.
     * @param {BackupJobCreateManyArgs} args - Arguments to create many BackupJobs.
     * @example
     * // Create many BackupJobs
     * const backupJob = await prisma.backupJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackupJobCreateManyArgs>(args?: SelectSubset<T, BackupJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackupJobs and returns the data saved in the database.
     * @param {BackupJobCreateManyAndReturnArgs} args - Arguments to create many BackupJobs.
     * @example
     * // Create many BackupJobs
     * const backupJob = await prisma.backupJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackupJobs and only return the `id`
     * const backupJobWithIdOnly = await prisma.backupJob.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackupJobCreateManyAndReturnArgs>(args?: SelectSubset<T, BackupJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BackupJob.
     * @param {BackupJobDeleteArgs} args - Arguments to delete one BackupJob.
     * @example
     * // Delete one BackupJob
     * const BackupJob = await prisma.backupJob.delete({
     *   where: {
     *     // ... filter to delete one BackupJob
     *   }
     * })
     * 
     */
    delete<T extends BackupJobDeleteArgs>(args: SelectSubset<T, BackupJobDeleteArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BackupJob.
     * @param {BackupJobUpdateArgs} args - Arguments to update one BackupJob.
     * @example
     * // Update one BackupJob
     * const backupJob = await prisma.backupJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackupJobUpdateArgs>(args: SelectSubset<T, BackupJobUpdateArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BackupJobs.
     * @param {BackupJobDeleteManyArgs} args - Arguments to filter BackupJobs to delete.
     * @example
     * // Delete a few BackupJobs
     * const { count } = await prisma.backupJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackupJobDeleteManyArgs>(args?: SelectSubset<T, BackupJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackupJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackupJobs
     * const backupJob = await prisma.backupJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackupJobUpdateManyArgs>(args: SelectSubset<T, BackupJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BackupJob.
     * @param {BackupJobUpsertArgs} args - Arguments to update or create a BackupJob.
     * @example
     * // Update or create a BackupJob
     * const backupJob = await prisma.backupJob.upsert({
     *   create: {
     *     // ... data to create a BackupJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackupJob we want to update
     *   }
     * })
     */
    upsert<T extends BackupJobUpsertArgs>(args: SelectSubset<T, BackupJobUpsertArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BackupJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobCountArgs} args - Arguments to filter BackupJobs to count.
     * @example
     * // Count the number of BackupJobs
     * const count = await prisma.backupJob.count({
     *   where: {
     *     // ... the filter for the BackupJobs we want to count
     *   }
     * })
    **/
    count<T extends BackupJobCountArgs>(
      args?: Subset<T, BackupJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackupJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackupJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BackupJobAggregateArgs>(args: Subset<T, BackupJobAggregateArgs>): Prisma.PrismaPromise<GetBackupJobAggregateType<T>>

    /**
     * Group by BackupJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackupJobGroupByArgs} args - Group by arguments.
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
      T extends BackupJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackupJobGroupByArgs['orderBy'] }
        : { orderBy?: BackupJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BackupJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackupJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackupJob model
   */
  readonly fields: BackupJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackupJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackupJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policy<T extends BackupPolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BackupPolicyDefaultArgs<ExtArgs>>): Prisma__BackupPolicyClient<$Result.GetResult<Prisma.$BackupPolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    snapshots<T extends BackupJob$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, BackupJob$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the BackupJob model
   */ 
  interface BackupJobFieldRefs {
    readonly id: FieldRef<"BackupJob", 'String'>
    readonly policy_id: FieldRef<"BackupJob", 'String'>
    readonly started_at: FieldRef<"BackupJob", 'DateTime'>
    readonly completed_at: FieldRef<"BackupJob", 'DateTime'>
    readonly status: FieldRef<"BackupJob", 'JobStatus'>
    readonly error_message: FieldRef<"BackupJob", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BackupJob findUnique
   */
  export type BackupJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter, which BackupJob to fetch.
     */
    where: BackupJobWhereUniqueInput
  }

  /**
   * BackupJob findUniqueOrThrow
   */
  export type BackupJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter, which BackupJob to fetch.
     */
    where: BackupJobWhereUniqueInput
  }

  /**
   * BackupJob findFirst
   */
  export type BackupJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter, which BackupJob to fetch.
     */
    where?: BackupJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupJobs to fetch.
     */
    orderBy?: BackupJobOrderByWithRelationInput | BackupJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupJobs.
     */
    cursor?: BackupJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupJobs.
     */
    distinct?: BackupJobScalarFieldEnum | BackupJobScalarFieldEnum[]
  }

  /**
   * BackupJob findFirstOrThrow
   */
  export type BackupJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter, which BackupJob to fetch.
     */
    where?: BackupJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupJobs to fetch.
     */
    orderBy?: BackupJobOrderByWithRelationInput | BackupJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackupJobs.
     */
    cursor?: BackupJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackupJobs.
     */
    distinct?: BackupJobScalarFieldEnum | BackupJobScalarFieldEnum[]
  }

  /**
   * BackupJob findMany
   */
  export type BackupJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter, which BackupJobs to fetch.
     */
    where?: BackupJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackupJobs to fetch.
     */
    orderBy?: BackupJobOrderByWithRelationInput | BackupJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackupJobs.
     */
    cursor?: BackupJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackupJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackupJobs.
     */
    skip?: number
    distinct?: BackupJobScalarFieldEnum | BackupJobScalarFieldEnum[]
  }

  /**
   * BackupJob create
   */
  export type BackupJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * The data needed to create a BackupJob.
     */
    data: XOR<BackupJobCreateInput, BackupJobUncheckedCreateInput>
  }

  /**
   * BackupJob createMany
   */
  export type BackupJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackupJobs.
     */
    data: BackupJobCreateManyInput | BackupJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackupJob createManyAndReturn
   */
  export type BackupJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BackupJobs.
     */
    data: BackupJobCreateManyInput | BackupJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BackupJob update
   */
  export type BackupJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * The data needed to update a BackupJob.
     */
    data: XOR<BackupJobUpdateInput, BackupJobUncheckedUpdateInput>
    /**
     * Choose, which BackupJob to update.
     */
    where: BackupJobWhereUniqueInput
  }

  /**
   * BackupJob updateMany
   */
  export type BackupJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackupJobs.
     */
    data: XOR<BackupJobUpdateManyMutationInput, BackupJobUncheckedUpdateManyInput>
    /**
     * Filter which BackupJobs to update
     */
    where?: BackupJobWhereInput
  }

  /**
   * BackupJob upsert
   */
  export type BackupJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * The filter to search for the BackupJob to update in case it exists.
     */
    where: BackupJobWhereUniqueInput
    /**
     * In case the BackupJob found by the `where` argument doesn't exist, create a new BackupJob with this data.
     */
    create: XOR<BackupJobCreateInput, BackupJobUncheckedCreateInput>
    /**
     * In case the BackupJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackupJobUpdateInput, BackupJobUncheckedUpdateInput>
  }

  /**
   * BackupJob delete
   */
  export type BackupJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
    /**
     * Filter which BackupJob to delete.
     */
    where: BackupJobWhereUniqueInput
  }

  /**
   * BackupJob deleteMany
   */
  export type BackupJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackupJobs to delete
     */
    where?: BackupJobWhereInput
  }

  /**
   * BackupJob.snapshots
   */
  export type BackupJob$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    where?: SnapshotWhereInput
    orderBy?: SnapshotOrderByWithRelationInput | SnapshotOrderByWithRelationInput[]
    cursor?: SnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SnapshotScalarFieldEnum | SnapshotScalarFieldEnum[]
  }

  /**
   * BackupJob without action
   */
  export type BackupJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackupJob
     */
    select?: BackupJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackupJobInclude<ExtArgs> | null
  }


  /**
   * Model Snapshot
   */

  export type AggregateSnapshot = {
    _count: SnapshotCountAggregateOutputType | null
    _avg: SnapshotAvgAggregateOutputType | null
    _sum: SnapshotSumAggregateOutputType | null
    _min: SnapshotMinAggregateOutputType | null
    _max: SnapshotMaxAggregateOutputType | null
  }

  export type SnapshotAvgAggregateOutputType = {
    size: number | null
  }

  export type SnapshotSumAggregateOutputType = {
    size: number | null
  }

  export type SnapshotMinAggregateOutputType = {
    snapshot_id: string | null
    job_id: string | null
    size: number | null
    state: string | null
    created_at: Date | null
  }

  export type SnapshotMaxAggregateOutputType = {
    snapshot_id: string | null
    job_id: string | null
    size: number | null
    state: string | null
    created_at: Date | null
  }

  export type SnapshotCountAggregateOutputType = {
    snapshot_id: number
    job_id: number
    size: number
    state: number
    created_at: number
    _all: number
  }


  export type SnapshotAvgAggregateInputType = {
    size?: true
  }

  export type SnapshotSumAggregateInputType = {
    size?: true
  }

  export type SnapshotMinAggregateInputType = {
    snapshot_id?: true
    job_id?: true
    size?: true
    state?: true
    created_at?: true
  }

  export type SnapshotMaxAggregateInputType = {
    snapshot_id?: true
    job_id?: true
    size?: true
    state?: true
    created_at?: true
  }

  export type SnapshotCountAggregateInputType = {
    snapshot_id?: true
    job_id?: true
    size?: true
    state?: true
    created_at?: true
    _all?: true
  }

  export type SnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Snapshot to aggregate.
     */
    where?: SnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Snapshots to fetch.
     */
    orderBy?: SnapshotOrderByWithRelationInput | SnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Snapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Snapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Snapshots
    **/
    _count?: true | SnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SnapshotMaxAggregateInputType
  }

  export type GetSnapshotAggregateType<T extends SnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSnapshot[P]>
      : GetScalarType<T[P], AggregateSnapshot[P]>
  }




  export type SnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SnapshotWhereInput
    orderBy?: SnapshotOrderByWithAggregationInput | SnapshotOrderByWithAggregationInput[]
    by: SnapshotScalarFieldEnum[] | SnapshotScalarFieldEnum
    having?: SnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SnapshotCountAggregateInputType | true
    _avg?: SnapshotAvgAggregateInputType
    _sum?: SnapshotSumAggregateInputType
    _min?: SnapshotMinAggregateInputType
    _max?: SnapshotMaxAggregateInputType
  }

  export type SnapshotGroupByOutputType = {
    snapshot_id: string
    job_id: string
    size: number
    state: string
    created_at: Date
    _count: SnapshotCountAggregateOutputType | null
    _avg: SnapshotAvgAggregateOutputType | null
    _sum: SnapshotSumAggregateOutputType | null
    _min: SnapshotMinAggregateOutputType | null
    _max: SnapshotMaxAggregateOutputType | null
  }

  type GetSnapshotGroupByPayload<T extends SnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], SnapshotGroupByOutputType[P]>
        }
      >
    >


  export type SnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    snapshot_id?: boolean
    job_id?: boolean
    size?: boolean
    state?: boolean
    created_at?: boolean
    job?: boolean | BackupJobDefaultArgs<ExtArgs>
    restores?: boolean | Snapshot$restoresArgs<ExtArgs>
    _count?: boolean | SnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["snapshot"]>

  export type SnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    snapshot_id?: boolean
    job_id?: boolean
    size?: boolean
    state?: boolean
    created_at?: boolean
    job?: boolean | BackupJobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["snapshot"]>

  export type SnapshotSelectScalar = {
    snapshot_id?: boolean
    job_id?: boolean
    size?: boolean
    state?: boolean
    created_at?: boolean
  }

  export type SnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | BackupJobDefaultArgs<ExtArgs>
    restores?: boolean | Snapshot$restoresArgs<ExtArgs>
    _count?: boolean | SnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | BackupJobDefaultArgs<ExtArgs>
  }

  export type $SnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Snapshot"
    objects: {
      job: Prisma.$BackupJobPayload<ExtArgs>
      restores: Prisma.$RestoreJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      snapshot_id: string
      job_id: string
      size: number
      state: string
      created_at: Date
    }, ExtArgs["result"]["snapshot"]>
    composites: {}
  }

  type SnapshotGetPayload<S extends boolean | null | undefined | SnapshotDefaultArgs> = $Result.GetResult<Prisma.$SnapshotPayload, S>

  type SnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SnapshotCountAggregateInputType | true
    }

  export interface SnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Snapshot'], meta: { name: 'Snapshot' } }
    /**
     * Find zero or one Snapshot that matches the filter.
     * @param {SnapshotFindUniqueArgs} args - Arguments to find a Snapshot
     * @example
     * // Get one Snapshot
     * const snapshot = await prisma.snapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SnapshotFindUniqueArgs>(args: SelectSubset<T, SnapshotFindUniqueArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Snapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SnapshotFindUniqueOrThrowArgs} args - Arguments to find a Snapshot
     * @example
     * // Get one Snapshot
     * const snapshot = await prisma.snapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, SnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Snapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotFindFirstArgs} args - Arguments to find a Snapshot
     * @example
     * // Get one Snapshot
     * const snapshot = await prisma.snapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SnapshotFindFirstArgs>(args?: SelectSubset<T, SnapshotFindFirstArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Snapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotFindFirstOrThrowArgs} args - Arguments to find a Snapshot
     * @example
     * // Get one Snapshot
     * const snapshot = await prisma.snapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, SnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Snapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Snapshots
     * const snapshots = await prisma.snapshot.findMany()
     * 
     * // Get first 10 Snapshots
     * const snapshots = await prisma.snapshot.findMany({ take: 10 })
     * 
     * // Only select the `snapshot_id`
     * const snapshotWithSnapshot_idOnly = await prisma.snapshot.findMany({ select: { snapshot_id: true } })
     * 
     */
    findMany<T extends SnapshotFindManyArgs>(args?: SelectSubset<T, SnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Snapshot.
     * @param {SnapshotCreateArgs} args - Arguments to create a Snapshot.
     * @example
     * // Create one Snapshot
     * const Snapshot = await prisma.snapshot.create({
     *   data: {
     *     // ... data to create a Snapshot
     *   }
     * })
     * 
     */
    create<T extends SnapshotCreateArgs>(args: SelectSubset<T, SnapshotCreateArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Snapshots.
     * @param {SnapshotCreateManyArgs} args - Arguments to create many Snapshots.
     * @example
     * // Create many Snapshots
     * const snapshot = await prisma.snapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SnapshotCreateManyArgs>(args?: SelectSubset<T, SnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Snapshots and returns the data saved in the database.
     * @param {SnapshotCreateManyAndReturnArgs} args - Arguments to create many Snapshots.
     * @example
     * // Create many Snapshots
     * const snapshot = await prisma.snapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Snapshots and only return the `snapshot_id`
     * const snapshotWithSnapshot_idOnly = await prisma.snapshot.createManyAndReturn({ 
     *   select: { snapshot_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, SnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Snapshot.
     * @param {SnapshotDeleteArgs} args - Arguments to delete one Snapshot.
     * @example
     * // Delete one Snapshot
     * const Snapshot = await prisma.snapshot.delete({
     *   where: {
     *     // ... filter to delete one Snapshot
     *   }
     * })
     * 
     */
    delete<T extends SnapshotDeleteArgs>(args: SelectSubset<T, SnapshotDeleteArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Snapshot.
     * @param {SnapshotUpdateArgs} args - Arguments to update one Snapshot.
     * @example
     * // Update one Snapshot
     * const snapshot = await prisma.snapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SnapshotUpdateArgs>(args: SelectSubset<T, SnapshotUpdateArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Snapshots.
     * @param {SnapshotDeleteManyArgs} args - Arguments to filter Snapshots to delete.
     * @example
     * // Delete a few Snapshots
     * const { count } = await prisma.snapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SnapshotDeleteManyArgs>(args?: SelectSubset<T, SnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Snapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Snapshots
     * const snapshot = await prisma.snapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SnapshotUpdateManyArgs>(args: SelectSubset<T, SnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Snapshot.
     * @param {SnapshotUpsertArgs} args - Arguments to update or create a Snapshot.
     * @example
     * // Update or create a Snapshot
     * const snapshot = await prisma.snapshot.upsert({
     *   create: {
     *     // ... data to create a Snapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Snapshot we want to update
     *   }
     * })
     */
    upsert<T extends SnapshotUpsertArgs>(args: SelectSubset<T, SnapshotUpsertArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Snapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotCountArgs} args - Arguments to filter Snapshots to count.
     * @example
     * // Count the number of Snapshots
     * const count = await prisma.snapshot.count({
     *   where: {
     *     // ... the filter for the Snapshots we want to count
     *   }
     * })
    **/
    count<T extends SnapshotCountArgs>(
      args?: Subset<T, SnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Snapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SnapshotAggregateArgs>(args: Subset<T, SnapshotAggregateArgs>): Prisma.PrismaPromise<GetSnapshotAggregateType<T>>

    /**
     * Group by Snapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnapshotGroupByArgs} args - Group by arguments.
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
      T extends SnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SnapshotGroupByArgs['orderBy'] }
        : { orderBy?: SnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Snapshot model
   */
  readonly fields: SnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Snapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends BackupJobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BackupJobDefaultArgs<ExtArgs>>): Prisma__BackupJobClient<$Result.GetResult<Prisma.$BackupJobPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    restores<T extends Snapshot$restoresArgs<ExtArgs> = {}>(args?: Subset<T, Snapshot$restoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Snapshot model
   */ 
  interface SnapshotFieldRefs {
    readonly snapshot_id: FieldRef<"Snapshot", 'String'>
    readonly job_id: FieldRef<"Snapshot", 'String'>
    readonly size: FieldRef<"Snapshot", 'Int'>
    readonly state: FieldRef<"Snapshot", 'String'>
    readonly created_at: FieldRef<"Snapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Snapshot findUnique
   */
  export type SnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter, which Snapshot to fetch.
     */
    where: SnapshotWhereUniqueInput
  }

  /**
   * Snapshot findUniqueOrThrow
   */
  export type SnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter, which Snapshot to fetch.
     */
    where: SnapshotWhereUniqueInput
  }

  /**
   * Snapshot findFirst
   */
  export type SnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter, which Snapshot to fetch.
     */
    where?: SnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Snapshots to fetch.
     */
    orderBy?: SnapshotOrderByWithRelationInput | SnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Snapshots.
     */
    cursor?: SnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Snapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Snapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Snapshots.
     */
    distinct?: SnapshotScalarFieldEnum | SnapshotScalarFieldEnum[]
  }

  /**
   * Snapshot findFirstOrThrow
   */
  export type SnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter, which Snapshot to fetch.
     */
    where?: SnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Snapshots to fetch.
     */
    orderBy?: SnapshotOrderByWithRelationInput | SnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Snapshots.
     */
    cursor?: SnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Snapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Snapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Snapshots.
     */
    distinct?: SnapshotScalarFieldEnum | SnapshotScalarFieldEnum[]
  }

  /**
   * Snapshot findMany
   */
  export type SnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter, which Snapshots to fetch.
     */
    where?: SnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Snapshots to fetch.
     */
    orderBy?: SnapshotOrderByWithRelationInput | SnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Snapshots.
     */
    cursor?: SnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Snapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Snapshots.
     */
    skip?: number
    distinct?: SnapshotScalarFieldEnum | SnapshotScalarFieldEnum[]
  }

  /**
   * Snapshot create
   */
  export type SnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a Snapshot.
     */
    data: XOR<SnapshotCreateInput, SnapshotUncheckedCreateInput>
  }

  /**
   * Snapshot createMany
   */
  export type SnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Snapshots.
     */
    data: SnapshotCreateManyInput | SnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Snapshot createManyAndReturn
   */
  export type SnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Snapshots.
     */
    data: SnapshotCreateManyInput | SnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Snapshot update
   */
  export type SnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a Snapshot.
     */
    data: XOR<SnapshotUpdateInput, SnapshotUncheckedUpdateInput>
    /**
     * Choose, which Snapshot to update.
     */
    where: SnapshotWhereUniqueInput
  }

  /**
   * Snapshot updateMany
   */
  export type SnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Snapshots.
     */
    data: XOR<SnapshotUpdateManyMutationInput, SnapshotUncheckedUpdateManyInput>
    /**
     * Filter which Snapshots to update
     */
    where?: SnapshotWhereInput
  }

  /**
   * Snapshot upsert
   */
  export type SnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the Snapshot to update in case it exists.
     */
    where: SnapshotWhereUniqueInput
    /**
     * In case the Snapshot found by the `where` argument doesn't exist, create a new Snapshot with this data.
     */
    create: XOR<SnapshotCreateInput, SnapshotUncheckedCreateInput>
    /**
     * In case the Snapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SnapshotUpdateInput, SnapshotUncheckedUpdateInput>
  }

  /**
   * Snapshot delete
   */
  export type SnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
    /**
     * Filter which Snapshot to delete.
     */
    where: SnapshotWhereUniqueInput
  }

  /**
   * Snapshot deleteMany
   */
  export type SnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Snapshots to delete
     */
    where?: SnapshotWhereInput
  }

  /**
   * Snapshot.restores
   */
  export type Snapshot$restoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    where?: RestoreJobWhereInput
    orderBy?: RestoreJobOrderByWithRelationInput | RestoreJobOrderByWithRelationInput[]
    cursor?: RestoreJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RestoreJobScalarFieldEnum | RestoreJobScalarFieldEnum[]
  }

  /**
   * Snapshot without action
   */
  export type SnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Snapshot
     */
    select?: SnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SnapshotInclude<ExtArgs> | null
  }


  /**
   * Model RestoreJob
   */

  export type AggregateRestoreJob = {
    _count: RestoreJobCountAggregateOutputType | null
    _min: RestoreJobMinAggregateOutputType | null
    _max: RestoreJobMaxAggregateOutputType | null
  }

  export type RestoreJobMinAggregateOutputType = {
    id: string | null
    snapshot_id: string | null
    status: $Enums.RestoreStatus | null
    started_at: Date | null
    completed_at: Date | null
    new_volume_id: string | null
  }

  export type RestoreJobMaxAggregateOutputType = {
    id: string | null
    snapshot_id: string | null
    status: $Enums.RestoreStatus | null
    started_at: Date | null
    completed_at: Date | null
    new_volume_id: string | null
  }

  export type RestoreJobCountAggregateOutputType = {
    id: number
    snapshot_id: number
    status: number
    started_at: number
    completed_at: number
    new_volume_id: number
    _all: number
  }


  export type RestoreJobMinAggregateInputType = {
    id?: true
    snapshot_id?: true
    status?: true
    started_at?: true
    completed_at?: true
    new_volume_id?: true
  }

  export type RestoreJobMaxAggregateInputType = {
    id?: true
    snapshot_id?: true
    status?: true
    started_at?: true
    completed_at?: true
    new_volume_id?: true
  }

  export type RestoreJobCountAggregateInputType = {
    id?: true
    snapshot_id?: true
    status?: true
    started_at?: true
    completed_at?: true
    new_volume_id?: true
    _all?: true
  }

  export type RestoreJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestoreJob to aggregate.
     */
    where?: RestoreJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestoreJobs to fetch.
     */
    orderBy?: RestoreJobOrderByWithRelationInput | RestoreJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestoreJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestoreJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestoreJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RestoreJobs
    **/
    _count?: true | RestoreJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestoreJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestoreJobMaxAggregateInputType
  }

  export type GetRestoreJobAggregateType<T extends RestoreJobAggregateArgs> = {
        [P in keyof T & keyof AggregateRestoreJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestoreJob[P]>
      : GetScalarType<T[P], AggregateRestoreJob[P]>
  }




  export type RestoreJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestoreJobWhereInput
    orderBy?: RestoreJobOrderByWithAggregationInput | RestoreJobOrderByWithAggregationInput[]
    by: RestoreJobScalarFieldEnum[] | RestoreJobScalarFieldEnum
    having?: RestoreJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestoreJobCountAggregateInputType | true
    _min?: RestoreJobMinAggregateInputType
    _max?: RestoreJobMaxAggregateInputType
  }

  export type RestoreJobGroupByOutputType = {
    id: string
    snapshot_id: string
    status: $Enums.RestoreStatus
    started_at: Date
    completed_at: Date | null
    new_volume_id: string | null
    _count: RestoreJobCountAggregateOutputType | null
    _min: RestoreJobMinAggregateOutputType | null
    _max: RestoreJobMaxAggregateOutputType | null
  }

  type GetRestoreJobGroupByPayload<T extends RestoreJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestoreJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestoreJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestoreJobGroupByOutputType[P]>
            : GetScalarType<T[P], RestoreJobGroupByOutputType[P]>
        }
      >
    >


  export type RestoreJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshot_id?: boolean
    status?: boolean
    started_at?: boolean
    completed_at?: boolean
    new_volume_id?: boolean
    snapshot?: boolean | SnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restoreJob"]>

  export type RestoreJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshot_id?: boolean
    status?: boolean
    started_at?: boolean
    completed_at?: boolean
    new_volume_id?: boolean
    snapshot?: boolean | SnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restoreJob"]>

  export type RestoreJobSelectScalar = {
    id?: boolean
    snapshot_id?: boolean
    status?: boolean
    started_at?: boolean
    completed_at?: boolean
    new_volume_id?: boolean
  }

  export type RestoreJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | SnapshotDefaultArgs<ExtArgs>
  }
  export type RestoreJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | SnapshotDefaultArgs<ExtArgs>
  }

  export type $RestoreJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RestoreJob"
    objects: {
      snapshot: Prisma.$SnapshotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapshot_id: string
      status: $Enums.RestoreStatus
      started_at: Date
      completed_at: Date | null
      new_volume_id: string | null
    }, ExtArgs["result"]["restoreJob"]>
    composites: {}
  }

  type RestoreJobGetPayload<S extends boolean | null | undefined | RestoreJobDefaultArgs> = $Result.GetResult<Prisma.$RestoreJobPayload, S>

  type RestoreJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RestoreJobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RestoreJobCountAggregateInputType | true
    }

  export interface RestoreJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RestoreJob'], meta: { name: 'RestoreJob' } }
    /**
     * Find zero or one RestoreJob that matches the filter.
     * @param {RestoreJobFindUniqueArgs} args - Arguments to find a RestoreJob
     * @example
     * // Get one RestoreJob
     * const restoreJob = await prisma.restoreJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestoreJobFindUniqueArgs>(args: SelectSubset<T, RestoreJobFindUniqueArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RestoreJob that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RestoreJobFindUniqueOrThrowArgs} args - Arguments to find a RestoreJob
     * @example
     * // Get one RestoreJob
     * const restoreJob = await prisma.restoreJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestoreJobFindUniqueOrThrowArgs>(args: SelectSubset<T, RestoreJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RestoreJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobFindFirstArgs} args - Arguments to find a RestoreJob
     * @example
     * // Get one RestoreJob
     * const restoreJob = await prisma.restoreJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestoreJobFindFirstArgs>(args?: SelectSubset<T, RestoreJobFindFirstArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RestoreJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobFindFirstOrThrowArgs} args - Arguments to find a RestoreJob
     * @example
     * // Get one RestoreJob
     * const restoreJob = await prisma.restoreJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestoreJobFindFirstOrThrowArgs>(args?: SelectSubset<T, RestoreJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RestoreJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RestoreJobs
     * const restoreJobs = await prisma.restoreJob.findMany()
     * 
     * // Get first 10 RestoreJobs
     * const restoreJobs = await prisma.restoreJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restoreJobWithIdOnly = await prisma.restoreJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestoreJobFindManyArgs>(args?: SelectSubset<T, RestoreJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RestoreJob.
     * @param {RestoreJobCreateArgs} args - Arguments to create a RestoreJob.
     * @example
     * // Create one RestoreJob
     * const RestoreJob = await prisma.restoreJob.create({
     *   data: {
     *     // ... data to create a RestoreJob
     *   }
     * })
     * 
     */
    create<T extends RestoreJobCreateArgs>(args: SelectSubset<T, RestoreJobCreateArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RestoreJobs.
     * @param {RestoreJobCreateManyArgs} args - Arguments to create many RestoreJobs.
     * @example
     * // Create many RestoreJobs
     * const restoreJob = await prisma.restoreJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestoreJobCreateManyArgs>(args?: SelectSubset<T, RestoreJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RestoreJobs and returns the data saved in the database.
     * @param {RestoreJobCreateManyAndReturnArgs} args - Arguments to create many RestoreJobs.
     * @example
     * // Create many RestoreJobs
     * const restoreJob = await prisma.restoreJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RestoreJobs and only return the `id`
     * const restoreJobWithIdOnly = await prisma.restoreJob.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestoreJobCreateManyAndReturnArgs>(args?: SelectSubset<T, RestoreJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RestoreJob.
     * @param {RestoreJobDeleteArgs} args - Arguments to delete one RestoreJob.
     * @example
     * // Delete one RestoreJob
     * const RestoreJob = await prisma.restoreJob.delete({
     *   where: {
     *     // ... filter to delete one RestoreJob
     *   }
     * })
     * 
     */
    delete<T extends RestoreJobDeleteArgs>(args: SelectSubset<T, RestoreJobDeleteArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RestoreJob.
     * @param {RestoreJobUpdateArgs} args - Arguments to update one RestoreJob.
     * @example
     * // Update one RestoreJob
     * const restoreJob = await prisma.restoreJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestoreJobUpdateArgs>(args: SelectSubset<T, RestoreJobUpdateArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RestoreJobs.
     * @param {RestoreJobDeleteManyArgs} args - Arguments to filter RestoreJobs to delete.
     * @example
     * // Delete a few RestoreJobs
     * const { count } = await prisma.restoreJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestoreJobDeleteManyArgs>(args?: SelectSubset<T, RestoreJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestoreJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RestoreJobs
     * const restoreJob = await prisma.restoreJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestoreJobUpdateManyArgs>(args: SelectSubset<T, RestoreJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RestoreJob.
     * @param {RestoreJobUpsertArgs} args - Arguments to update or create a RestoreJob.
     * @example
     * // Update or create a RestoreJob
     * const restoreJob = await prisma.restoreJob.upsert({
     *   create: {
     *     // ... data to create a RestoreJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RestoreJob we want to update
     *   }
     * })
     */
    upsert<T extends RestoreJobUpsertArgs>(args: SelectSubset<T, RestoreJobUpsertArgs<ExtArgs>>): Prisma__RestoreJobClient<$Result.GetResult<Prisma.$RestoreJobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RestoreJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobCountArgs} args - Arguments to filter RestoreJobs to count.
     * @example
     * // Count the number of RestoreJobs
     * const count = await prisma.restoreJob.count({
     *   where: {
     *     // ... the filter for the RestoreJobs we want to count
     *   }
     * })
    **/
    count<T extends RestoreJobCountArgs>(
      args?: Subset<T, RestoreJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestoreJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RestoreJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RestoreJobAggregateArgs>(args: Subset<T, RestoreJobAggregateArgs>): Prisma.PrismaPromise<GetRestoreJobAggregateType<T>>

    /**
     * Group by RestoreJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestoreJobGroupByArgs} args - Group by arguments.
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
      T extends RestoreJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestoreJobGroupByArgs['orderBy'] }
        : { orderBy?: RestoreJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RestoreJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestoreJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RestoreJob model
   */
  readonly fields: RestoreJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RestoreJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestoreJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    snapshot<T extends SnapshotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SnapshotDefaultArgs<ExtArgs>>): Prisma__SnapshotClient<$Result.GetResult<Prisma.$SnapshotPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the RestoreJob model
   */ 
  interface RestoreJobFieldRefs {
    readonly id: FieldRef<"RestoreJob", 'String'>
    readonly snapshot_id: FieldRef<"RestoreJob", 'String'>
    readonly status: FieldRef<"RestoreJob", 'RestoreStatus'>
    readonly started_at: FieldRef<"RestoreJob", 'DateTime'>
    readonly completed_at: FieldRef<"RestoreJob", 'DateTime'>
    readonly new_volume_id: FieldRef<"RestoreJob", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RestoreJob findUnique
   */
  export type RestoreJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter, which RestoreJob to fetch.
     */
    where: RestoreJobWhereUniqueInput
  }

  /**
   * RestoreJob findUniqueOrThrow
   */
  export type RestoreJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter, which RestoreJob to fetch.
     */
    where: RestoreJobWhereUniqueInput
  }

  /**
   * RestoreJob findFirst
   */
  export type RestoreJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter, which RestoreJob to fetch.
     */
    where?: RestoreJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestoreJobs to fetch.
     */
    orderBy?: RestoreJobOrderByWithRelationInput | RestoreJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestoreJobs.
     */
    cursor?: RestoreJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestoreJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestoreJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestoreJobs.
     */
    distinct?: RestoreJobScalarFieldEnum | RestoreJobScalarFieldEnum[]
  }

  /**
   * RestoreJob findFirstOrThrow
   */
  export type RestoreJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter, which RestoreJob to fetch.
     */
    where?: RestoreJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestoreJobs to fetch.
     */
    orderBy?: RestoreJobOrderByWithRelationInput | RestoreJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestoreJobs.
     */
    cursor?: RestoreJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestoreJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestoreJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestoreJobs.
     */
    distinct?: RestoreJobScalarFieldEnum | RestoreJobScalarFieldEnum[]
  }

  /**
   * RestoreJob findMany
   */
  export type RestoreJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter, which RestoreJobs to fetch.
     */
    where?: RestoreJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestoreJobs to fetch.
     */
    orderBy?: RestoreJobOrderByWithRelationInput | RestoreJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RestoreJobs.
     */
    cursor?: RestoreJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestoreJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestoreJobs.
     */
    skip?: number
    distinct?: RestoreJobScalarFieldEnum | RestoreJobScalarFieldEnum[]
  }

  /**
   * RestoreJob create
   */
  export type RestoreJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * The data needed to create a RestoreJob.
     */
    data: XOR<RestoreJobCreateInput, RestoreJobUncheckedCreateInput>
  }

  /**
   * RestoreJob createMany
   */
  export type RestoreJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RestoreJobs.
     */
    data: RestoreJobCreateManyInput | RestoreJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestoreJob createManyAndReturn
   */
  export type RestoreJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RestoreJobs.
     */
    data: RestoreJobCreateManyInput | RestoreJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RestoreJob update
   */
  export type RestoreJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * The data needed to update a RestoreJob.
     */
    data: XOR<RestoreJobUpdateInput, RestoreJobUncheckedUpdateInput>
    /**
     * Choose, which RestoreJob to update.
     */
    where: RestoreJobWhereUniqueInput
  }

  /**
   * RestoreJob updateMany
   */
  export type RestoreJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RestoreJobs.
     */
    data: XOR<RestoreJobUpdateManyMutationInput, RestoreJobUncheckedUpdateManyInput>
    /**
     * Filter which RestoreJobs to update
     */
    where?: RestoreJobWhereInput
  }

  /**
   * RestoreJob upsert
   */
  export type RestoreJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * The filter to search for the RestoreJob to update in case it exists.
     */
    where: RestoreJobWhereUniqueInput
    /**
     * In case the RestoreJob found by the `where` argument doesn't exist, create a new RestoreJob with this data.
     */
    create: XOR<RestoreJobCreateInput, RestoreJobUncheckedCreateInput>
    /**
     * In case the RestoreJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestoreJobUpdateInput, RestoreJobUncheckedUpdateInput>
  }

  /**
   * RestoreJob delete
   */
  export type RestoreJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
    /**
     * Filter which RestoreJob to delete.
     */
    where: RestoreJobWhereUniqueInput
  }

  /**
   * RestoreJob deleteMany
   */
  export type RestoreJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestoreJobs to delete
     */
    where?: RestoreJobWhereInput
  }

  /**
   * RestoreJob without action
   */
  export type RestoreJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestoreJob
     */
    select?: RestoreJobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestoreJobInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: string | null
    message: string | null
    status: $Enums.NotificationStatus | null
    created_at: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    type: string | null
    message: string | null
    status: $Enums.NotificationStatus | null
    created_at: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    user_id: number
    type: number
    message: number
    status: number
    created_at: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    message?: true
    status?: true
    created_at?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    message?: true
    status?: true
    created_at?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    message?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    user_id: string
    type: string
    message: string
    status: $Enums.NotificationStatus
    created_at: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    message?: boolean
    status?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    message?: boolean
    status?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    user_id?: boolean
    type?: boolean
    message?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      type: string
      message: string
      status: $Enums.NotificationStatus
      created_at: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly user_id: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'NotificationStatus'>
    readonly created_at: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actor: string | null
    action: string | null
    entity_type: string | null
    entity_id: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actor: string | null
    action: string | null
    entity_type: string | null
    entity_id: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actor: number
    action: number
    entity_type: number
    entity_id: number
    details: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    entity_type?: true
    entity_id?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    entity_type?: true
    entity_id?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    entity_type?: true
    entity_id?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actor: string
    action: string
    entity_type: string
    entity_id: string | null
    details: JsonValue
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actor?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actor?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actor?: boolean
    action?: boolean
    entity_type?: boolean
    entity_id?: boolean
    details?: boolean
    created_at?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actor: string
      action: string
      entity_type: string
      entity_id: string | null
      details: Prisma.JsonValue
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actor: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity_type: FieldRef<"AuditLog", 'String'>
    readonly entity_id: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BackupTargetScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    instance_id: 'instance_id',
    volume_id: 'volume_id',
    region: 'region',
    created_at: 'created_at'
  };

  export type BackupTargetScalarFieldEnum = (typeof BackupTargetScalarFieldEnum)[keyof typeof BackupTargetScalarFieldEnum]


  export const BackupPolicyScalarFieldEnum: {
    id: 'id',
    target_id: 'target_id',
    name: 'name',
    frequency: 'frequency',
    retention_days: 'retention_days',
    email_alerts: 'email_alerts',
    status: 'status',
    eventbridge_schedule_name: 'eventbridge_schedule_name',
    created_at: 'created_at'
  };

  export type BackupPolicyScalarFieldEnum = (typeof BackupPolicyScalarFieldEnum)[keyof typeof BackupPolicyScalarFieldEnum]


  export const BackupJobScalarFieldEnum: {
    id: 'id',
    policy_id: 'policy_id',
    started_at: 'started_at',
    completed_at: 'completed_at',
    status: 'status',
    error_message: 'error_message'
  };

  export type BackupJobScalarFieldEnum = (typeof BackupJobScalarFieldEnum)[keyof typeof BackupJobScalarFieldEnum]


  export const SnapshotScalarFieldEnum: {
    snapshot_id: 'snapshot_id',
    job_id: 'job_id',
    size: 'size',
    state: 'state',
    created_at: 'created_at'
  };

  export type SnapshotScalarFieldEnum = (typeof SnapshotScalarFieldEnum)[keyof typeof SnapshotScalarFieldEnum]


  export const RestoreJobScalarFieldEnum: {
    id: 'id',
    snapshot_id: 'snapshot_id',
    status: 'status',
    started_at: 'started_at',
    completed_at: 'completed_at',
    new_volume_id: 'new_volume_id'
  };

  export type RestoreJobScalarFieldEnum = (typeof RestoreJobScalarFieldEnum)[keyof typeof RestoreJobScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    type: 'type',
    message: 'message',
    status: 'status',
    created_at: 'created_at'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actor: 'actor',
    action: 'action',
    entity_type: 'entity_type',
    entity_id: 'entity_id',
    details: 'details',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PolicyStatus'
   */
  export type EnumPolicyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyStatus'>
    


  /**
   * Reference to a field of type 'PolicyStatus[]'
   */
  export type ListEnumPolicyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyStatus[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'RestoreStatus'
   */
  export type EnumRestoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RestoreStatus'>
    


  /**
   * Reference to a field of type 'RestoreStatus[]'
   */
  export type ListEnumRestoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RestoreStatus[]'>
    


  /**
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    created_at?: DateTimeFilter<"User"> | Date | string
    targets?: BackupTargetListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    targets?: BackupTargetOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    created_at?: DateTimeFilter<"User"> | Date | string
    targets?: BackupTargetListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BackupTargetWhereInput = {
    AND?: BackupTargetWhereInput | BackupTargetWhereInput[]
    OR?: BackupTargetWhereInput[]
    NOT?: BackupTargetWhereInput | BackupTargetWhereInput[]
    id?: UuidFilter<"BackupTarget"> | string
    user_id?: UuidFilter<"BackupTarget"> | string
    name?: StringFilter<"BackupTarget"> | string
    instance_id?: StringFilter<"BackupTarget"> | string
    volume_id?: StringFilter<"BackupTarget"> | string
    region?: StringFilter<"BackupTarget"> | string
    created_at?: DateTimeFilter<"BackupTarget"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    policies?: BackupPolicyListRelationFilter
  }

  export type BackupTargetOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    instance_id?: SortOrder
    volume_id?: SortOrder
    region?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    policies?: BackupPolicyOrderByRelationAggregateInput
  }

  export type BackupTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackupTargetWhereInput | BackupTargetWhereInput[]
    OR?: BackupTargetWhereInput[]
    NOT?: BackupTargetWhereInput | BackupTargetWhereInput[]
    user_id?: UuidFilter<"BackupTarget"> | string
    name?: StringFilter<"BackupTarget"> | string
    instance_id?: StringFilter<"BackupTarget"> | string
    volume_id?: StringFilter<"BackupTarget"> | string
    region?: StringFilter<"BackupTarget"> | string
    created_at?: DateTimeFilter<"BackupTarget"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    policies?: BackupPolicyListRelationFilter
  }, "id">

  export type BackupTargetOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    instance_id?: SortOrder
    volume_id?: SortOrder
    region?: SortOrder
    created_at?: SortOrder
    _count?: BackupTargetCountOrderByAggregateInput
    _max?: BackupTargetMaxOrderByAggregateInput
    _min?: BackupTargetMinOrderByAggregateInput
  }

  export type BackupTargetScalarWhereWithAggregatesInput = {
    AND?: BackupTargetScalarWhereWithAggregatesInput | BackupTargetScalarWhereWithAggregatesInput[]
    OR?: BackupTargetScalarWhereWithAggregatesInput[]
    NOT?: BackupTargetScalarWhereWithAggregatesInput | BackupTargetScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BackupTarget"> | string
    user_id?: UuidWithAggregatesFilter<"BackupTarget"> | string
    name?: StringWithAggregatesFilter<"BackupTarget"> | string
    instance_id?: StringWithAggregatesFilter<"BackupTarget"> | string
    volume_id?: StringWithAggregatesFilter<"BackupTarget"> | string
    region?: StringWithAggregatesFilter<"BackupTarget"> | string
    created_at?: DateTimeWithAggregatesFilter<"BackupTarget"> | Date | string
  }

  export type BackupPolicyWhereInput = {
    AND?: BackupPolicyWhereInput | BackupPolicyWhereInput[]
    OR?: BackupPolicyWhereInput[]
    NOT?: BackupPolicyWhereInput | BackupPolicyWhereInput[]
    id?: UuidFilter<"BackupPolicy"> | string
    target_id?: UuidFilter<"BackupPolicy"> | string
    name?: StringFilter<"BackupPolicy"> | string
    frequency?: StringFilter<"BackupPolicy"> | string
    retention_days?: IntFilter<"BackupPolicy"> | number
    email_alerts?: BoolFilter<"BackupPolicy"> | boolean
    status?: EnumPolicyStatusFilter<"BackupPolicy"> | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFilter<"BackupPolicy"> | string
    created_at?: DateTimeFilter<"BackupPolicy"> | Date | string
    target?: XOR<BackupTargetRelationFilter, BackupTargetWhereInput>
    jobs?: BackupJobListRelationFilter
  }

  export type BackupPolicyOrderByWithRelationInput = {
    id?: SortOrder
    target_id?: SortOrder
    name?: SortOrder
    frequency?: SortOrder
    retention_days?: SortOrder
    email_alerts?: SortOrder
    status?: SortOrder
    eventbridge_schedule_name?: SortOrder
    created_at?: SortOrder
    target?: BackupTargetOrderByWithRelationInput
    jobs?: BackupJobOrderByRelationAggregateInput
  }

  export type BackupPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackupPolicyWhereInput | BackupPolicyWhereInput[]
    OR?: BackupPolicyWhereInput[]
    NOT?: BackupPolicyWhereInput | BackupPolicyWhereInput[]
    target_id?: UuidFilter<"BackupPolicy"> | string
    name?: StringFilter<"BackupPolicy"> | string
    frequency?: StringFilter<"BackupPolicy"> | string
    retention_days?: IntFilter<"BackupPolicy"> | number
    email_alerts?: BoolFilter<"BackupPolicy"> | boolean
    status?: EnumPolicyStatusFilter<"BackupPolicy"> | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFilter<"BackupPolicy"> | string
    created_at?: DateTimeFilter<"BackupPolicy"> | Date | string
    target?: XOR<BackupTargetRelationFilter, BackupTargetWhereInput>
    jobs?: BackupJobListRelationFilter
  }, "id">

  export type BackupPolicyOrderByWithAggregationInput = {
    id?: SortOrder
    target_id?: SortOrder
    name?: SortOrder
    frequency?: SortOrder
    retention_days?: SortOrder
    email_alerts?: SortOrder
    status?: SortOrder
    eventbridge_schedule_name?: SortOrder
    created_at?: SortOrder
    _count?: BackupPolicyCountOrderByAggregateInput
    _avg?: BackupPolicyAvgOrderByAggregateInput
    _max?: BackupPolicyMaxOrderByAggregateInput
    _min?: BackupPolicyMinOrderByAggregateInput
    _sum?: BackupPolicySumOrderByAggregateInput
  }

  export type BackupPolicyScalarWhereWithAggregatesInput = {
    AND?: BackupPolicyScalarWhereWithAggregatesInput | BackupPolicyScalarWhereWithAggregatesInput[]
    OR?: BackupPolicyScalarWhereWithAggregatesInput[]
    NOT?: BackupPolicyScalarWhereWithAggregatesInput | BackupPolicyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BackupPolicy"> | string
    target_id?: UuidWithAggregatesFilter<"BackupPolicy"> | string
    name?: StringWithAggregatesFilter<"BackupPolicy"> | string
    frequency?: StringWithAggregatesFilter<"BackupPolicy"> | string
    retention_days?: IntWithAggregatesFilter<"BackupPolicy"> | number
    email_alerts?: BoolWithAggregatesFilter<"BackupPolicy"> | boolean
    status?: EnumPolicyStatusWithAggregatesFilter<"BackupPolicy"> | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringWithAggregatesFilter<"BackupPolicy"> | string
    created_at?: DateTimeWithAggregatesFilter<"BackupPolicy"> | Date | string
  }

  export type BackupJobWhereInput = {
    AND?: BackupJobWhereInput | BackupJobWhereInput[]
    OR?: BackupJobWhereInput[]
    NOT?: BackupJobWhereInput | BackupJobWhereInput[]
    id?: UuidFilter<"BackupJob"> | string
    policy_id?: UuidFilter<"BackupJob"> | string
    started_at?: DateTimeFilter<"BackupJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"BackupJob"> | Date | string | null
    status?: EnumJobStatusFilter<"BackupJob"> | $Enums.JobStatus
    error_message?: StringNullableFilter<"BackupJob"> | string | null
    policy?: XOR<BackupPolicyRelationFilter, BackupPolicyWhereInput>
    snapshots?: SnapshotListRelationFilter
  }

  export type BackupJobOrderByWithRelationInput = {
    id?: SortOrder
    policy_id?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    status?: SortOrder
    error_message?: SortOrderInput | SortOrder
    policy?: BackupPolicyOrderByWithRelationInput
    snapshots?: SnapshotOrderByRelationAggregateInput
  }

  export type BackupJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackupJobWhereInput | BackupJobWhereInput[]
    OR?: BackupJobWhereInput[]
    NOT?: BackupJobWhereInput | BackupJobWhereInput[]
    policy_id?: UuidFilter<"BackupJob"> | string
    started_at?: DateTimeFilter<"BackupJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"BackupJob"> | Date | string | null
    status?: EnumJobStatusFilter<"BackupJob"> | $Enums.JobStatus
    error_message?: StringNullableFilter<"BackupJob"> | string | null
    policy?: XOR<BackupPolicyRelationFilter, BackupPolicyWhereInput>
    snapshots?: SnapshotListRelationFilter
  }, "id">

  export type BackupJobOrderByWithAggregationInput = {
    id?: SortOrder
    policy_id?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    status?: SortOrder
    error_message?: SortOrderInput | SortOrder
    _count?: BackupJobCountOrderByAggregateInput
    _max?: BackupJobMaxOrderByAggregateInput
    _min?: BackupJobMinOrderByAggregateInput
  }

  export type BackupJobScalarWhereWithAggregatesInput = {
    AND?: BackupJobScalarWhereWithAggregatesInput | BackupJobScalarWhereWithAggregatesInput[]
    OR?: BackupJobScalarWhereWithAggregatesInput[]
    NOT?: BackupJobScalarWhereWithAggregatesInput | BackupJobScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BackupJob"> | string
    policy_id?: UuidWithAggregatesFilter<"BackupJob"> | string
    started_at?: DateTimeWithAggregatesFilter<"BackupJob"> | Date | string
    completed_at?: DateTimeNullableWithAggregatesFilter<"BackupJob"> | Date | string | null
    status?: EnumJobStatusWithAggregatesFilter<"BackupJob"> | $Enums.JobStatus
    error_message?: StringNullableWithAggregatesFilter<"BackupJob"> | string | null
  }

  export type SnapshotWhereInput = {
    AND?: SnapshotWhereInput | SnapshotWhereInput[]
    OR?: SnapshotWhereInput[]
    NOT?: SnapshotWhereInput | SnapshotWhereInput[]
    snapshot_id?: StringFilter<"Snapshot"> | string
    job_id?: UuidFilter<"Snapshot"> | string
    size?: IntFilter<"Snapshot"> | number
    state?: StringFilter<"Snapshot"> | string
    created_at?: DateTimeFilter<"Snapshot"> | Date | string
    job?: XOR<BackupJobRelationFilter, BackupJobWhereInput>
    restores?: RestoreJobListRelationFilter
  }

  export type SnapshotOrderByWithRelationInput = {
    snapshot_id?: SortOrder
    job_id?: SortOrder
    size?: SortOrder
    state?: SortOrder
    created_at?: SortOrder
    job?: BackupJobOrderByWithRelationInput
    restores?: RestoreJobOrderByRelationAggregateInput
  }

  export type SnapshotWhereUniqueInput = Prisma.AtLeast<{
    snapshot_id?: string
    AND?: SnapshotWhereInput | SnapshotWhereInput[]
    OR?: SnapshotWhereInput[]
    NOT?: SnapshotWhereInput | SnapshotWhereInput[]
    job_id?: UuidFilter<"Snapshot"> | string
    size?: IntFilter<"Snapshot"> | number
    state?: StringFilter<"Snapshot"> | string
    created_at?: DateTimeFilter<"Snapshot"> | Date | string
    job?: XOR<BackupJobRelationFilter, BackupJobWhereInput>
    restores?: RestoreJobListRelationFilter
  }, "snapshot_id">

  export type SnapshotOrderByWithAggregationInput = {
    snapshot_id?: SortOrder
    job_id?: SortOrder
    size?: SortOrder
    state?: SortOrder
    created_at?: SortOrder
    _count?: SnapshotCountOrderByAggregateInput
    _avg?: SnapshotAvgOrderByAggregateInput
    _max?: SnapshotMaxOrderByAggregateInput
    _min?: SnapshotMinOrderByAggregateInput
    _sum?: SnapshotSumOrderByAggregateInput
  }

  export type SnapshotScalarWhereWithAggregatesInput = {
    AND?: SnapshotScalarWhereWithAggregatesInput | SnapshotScalarWhereWithAggregatesInput[]
    OR?: SnapshotScalarWhereWithAggregatesInput[]
    NOT?: SnapshotScalarWhereWithAggregatesInput | SnapshotScalarWhereWithAggregatesInput[]
    snapshot_id?: StringWithAggregatesFilter<"Snapshot"> | string
    job_id?: UuidWithAggregatesFilter<"Snapshot"> | string
    size?: IntWithAggregatesFilter<"Snapshot"> | number
    state?: StringWithAggregatesFilter<"Snapshot"> | string
    created_at?: DateTimeWithAggregatesFilter<"Snapshot"> | Date | string
  }

  export type RestoreJobWhereInput = {
    AND?: RestoreJobWhereInput | RestoreJobWhereInput[]
    OR?: RestoreJobWhereInput[]
    NOT?: RestoreJobWhereInput | RestoreJobWhereInput[]
    id?: UuidFilter<"RestoreJob"> | string
    snapshot_id?: StringFilter<"RestoreJob"> | string
    status?: EnumRestoreStatusFilter<"RestoreJob"> | $Enums.RestoreStatus
    started_at?: DateTimeFilter<"RestoreJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"RestoreJob"> | Date | string | null
    new_volume_id?: StringNullableFilter<"RestoreJob"> | string | null
    snapshot?: XOR<SnapshotRelationFilter, SnapshotWhereInput>
  }

  export type RestoreJobOrderByWithRelationInput = {
    id?: SortOrder
    snapshot_id?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    new_volume_id?: SortOrderInput | SortOrder
    snapshot?: SnapshotOrderByWithRelationInput
  }

  export type RestoreJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RestoreJobWhereInput | RestoreJobWhereInput[]
    OR?: RestoreJobWhereInput[]
    NOT?: RestoreJobWhereInput | RestoreJobWhereInput[]
    snapshot_id?: StringFilter<"RestoreJob"> | string
    status?: EnumRestoreStatusFilter<"RestoreJob"> | $Enums.RestoreStatus
    started_at?: DateTimeFilter<"RestoreJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"RestoreJob"> | Date | string | null
    new_volume_id?: StringNullableFilter<"RestoreJob"> | string | null
    snapshot?: XOR<SnapshotRelationFilter, SnapshotWhereInput>
  }, "id">

  export type RestoreJobOrderByWithAggregationInput = {
    id?: SortOrder
    snapshot_id?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    new_volume_id?: SortOrderInput | SortOrder
    _count?: RestoreJobCountOrderByAggregateInput
    _max?: RestoreJobMaxOrderByAggregateInput
    _min?: RestoreJobMinOrderByAggregateInput
  }

  export type RestoreJobScalarWhereWithAggregatesInput = {
    AND?: RestoreJobScalarWhereWithAggregatesInput | RestoreJobScalarWhereWithAggregatesInput[]
    OR?: RestoreJobScalarWhereWithAggregatesInput[]
    NOT?: RestoreJobScalarWhereWithAggregatesInput | RestoreJobScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RestoreJob"> | string
    snapshot_id?: StringWithAggregatesFilter<"RestoreJob"> | string
    status?: EnumRestoreStatusWithAggregatesFilter<"RestoreJob"> | $Enums.RestoreStatus
    started_at?: DateTimeWithAggregatesFilter<"RestoreJob"> | Date | string
    completed_at?: DateTimeNullableWithAggregatesFilter<"RestoreJob"> | Date | string | null
    new_volume_id?: StringNullableWithAggregatesFilter<"RestoreJob"> | string | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: UuidFilter<"Notification"> | string
    user_id?: UuidFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    created_at?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    user_id?: UuidFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    created_at?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Notification"> | string
    user_id?: UuidWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    status?: EnumNotificationStatusWithAggregatesFilter<"Notification"> | $Enums.NotificationStatus
    created_at?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: UuidFilter<"AuditLog"> | string
    actor?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringNullableFilter<"AuditLog"> | string | null
    details?: JsonFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrderInput | SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actor?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity_type?: StringFilter<"AuditLog"> | string
    entity_id?: StringNullableFilter<"AuditLog"> | string | null
    details?: JsonFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrderInput | SortOrder
    details?: SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AuditLog"> | string
    actor?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_type?: StringWithAggregatesFilter<"AuditLog"> | string
    entity_id?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: JsonWithAggregatesFilter<"AuditLog">
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    targets?: BackupTargetCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    targets?: BackupTargetUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: BackupTargetUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: BackupTargetUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupTargetCreateInput = {
    id?: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutTargetsInput
    policies?: BackupPolicyCreateNestedManyWithoutTargetInput
  }

  export type BackupTargetUncheckedCreateInput = {
    id?: string
    user_id: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
    policies?: BackupPolicyUncheckedCreateNestedManyWithoutTargetInput
  }

  export type BackupTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTargetsNestedInput
    policies?: BackupPolicyUpdateManyWithoutTargetNestedInput
  }

  export type BackupTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: BackupPolicyUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type BackupTargetCreateManyInput = {
    id?: string
    user_id: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
  }

  export type BackupTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupPolicyCreateInput = {
    id?: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
    target: BackupTargetCreateNestedOneWithoutPoliciesInput
    jobs?: BackupJobCreateNestedManyWithoutPolicyInput
  }

  export type BackupPolicyUncheckedCreateInput = {
    id?: string
    target_id: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
    jobs?: BackupJobUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type BackupPolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: BackupTargetUpdateOneRequiredWithoutPoliciesNestedInput
    jobs?: BackupJobUpdateManyWithoutPolicyNestedInput
  }

  export type BackupPolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: BackupJobUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type BackupPolicyCreateManyInput = {
    id?: string
    target_id: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
  }

  export type BackupPolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupPolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupJobCreateInput = {
    id?: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
    policy: BackupPolicyCreateNestedOneWithoutJobsInput
    snapshots?: SnapshotCreateNestedManyWithoutJobInput
  }

  export type BackupJobUncheckedCreateInput = {
    id?: string
    policy_id: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
    snapshots?: SnapshotUncheckedCreateNestedManyWithoutJobInput
  }

  export type BackupJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    policy?: BackupPolicyUpdateOneRequiredWithoutJobsNestedInput
    snapshots?: SnapshotUpdateManyWithoutJobNestedInput
  }

  export type BackupJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    policy_id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    snapshots?: SnapshotUncheckedUpdateManyWithoutJobNestedInput
  }

  export type BackupJobCreateManyInput = {
    id?: string
    policy_id: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
  }

  export type BackupJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BackupJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    policy_id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SnapshotCreateInput = {
    snapshot_id: string
    size: number
    state: string
    created_at?: Date | string
    job: BackupJobCreateNestedOneWithoutSnapshotsInput
    restores?: RestoreJobCreateNestedManyWithoutSnapshotInput
  }

  export type SnapshotUncheckedCreateInput = {
    snapshot_id: string
    job_id: string
    size: number
    state: string
    created_at?: Date | string
    restores?: RestoreJobUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type SnapshotUpdateInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: BackupJobUpdateOneRequiredWithoutSnapshotsNestedInput
    restores?: RestoreJobUpdateManyWithoutSnapshotNestedInput
  }

  export type SnapshotUncheckedUpdateInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    restores?: RestoreJobUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type SnapshotCreateManyInput = {
    snapshot_id: string
    job_id: string
    size: number
    state: string
    created_at?: Date | string
  }

  export type SnapshotUpdateManyMutationInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SnapshotUncheckedUpdateManyInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestoreJobCreateInput = {
    id?: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
    snapshot: SnapshotCreateNestedOneWithoutRestoresInput
  }

  export type RestoreJobUncheckedCreateInput = {
    id?: string
    snapshot_id: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
  }

  export type RestoreJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
    snapshot?: SnapshotUpdateOneRequiredWithoutRestoresNestedInput
  }

  export type RestoreJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RestoreJobCreateManyInput = {
    id?: string
    snapshot_id: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
  }

  export type RestoreJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RestoreJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationCreateInput = {
    id?: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    user_id: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    user_id: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    actor: string
    action: string
    entity_type: string
    entity_id?: string | null
    details: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actor: string
    action: string
    entity_type: string
    entity_id?: string | null
    details: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actor: string
    action: string
    entity_type: string
    entity_id?: string | null
    details: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity_type?: StringFieldUpdateOperationsInput | string
    entity_id?: NullableStringFieldUpdateOperationsInput | string | null
    details?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type BackupTargetListRelationFilter = {
    every?: BackupTargetWhereInput
    some?: BackupTargetWhereInput
    none?: BackupTargetWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type BackupTargetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type BackupPolicyListRelationFilter = {
    every?: BackupPolicyWhereInput
    some?: BackupPolicyWhereInput
    none?: BackupPolicyWhereInput
  }

  export type BackupPolicyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackupTargetCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    instance_id?: SortOrder
    volume_id?: SortOrder
    region?: SortOrder
    created_at?: SortOrder
  }

  export type BackupTargetMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    instance_id?: SortOrder
    volume_id?: SortOrder
    region?: SortOrder
    created_at?: SortOrder
  }

  export type BackupTargetMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    instance_id?: SortOrder
    volume_id?: SortOrder
    region?: SortOrder
    created_at?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumPolicyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusFilter<$PrismaModel> | $Enums.PolicyStatus
  }

  export type BackupTargetRelationFilter = {
    is?: BackupTargetWhereInput
    isNot?: BackupTargetWhereInput
  }

  export type BackupJobListRelationFilter = {
    every?: BackupJobWhereInput
    some?: BackupJobWhereInput
    none?: BackupJobWhereInput
  }

  export type BackupJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackupPolicyCountOrderByAggregateInput = {
    id?: SortOrder
    target_id?: SortOrder
    name?: SortOrder
    frequency?: SortOrder
    retention_days?: SortOrder
    email_alerts?: SortOrder
    status?: SortOrder
    eventbridge_schedule_name?: SortOrder
    created_at?: SortOrder
  }

  export type BackupPolicyAvgOrderByAggregateInput = {
    retention_days?: SortOrder
  }

  export type BackupPolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    target_id?: SortOrder
    name?: SortOrder
    frequency?: SortOrder
    retention_days?: SortOrder
    email_alerts?: SortOrder
    status?: SortOrder
    eventbridge_schedule_name?: SortOrder
    created_at?: SortOrder
  }

  export type BackupPolicyMinOrderByAggregateInput = {
    id?: SortOrder
    target_id?: SortOrder
    name?: SortOrder
    frequency?: SortOrder
    retention_days?: SortOrder
    email_alerts?: SortOrder
    status?: SortOrder
    eventbridge_schedule_name?: SortOrder
    created_at?: SortOrder
  }

  export type BackupPolicySumOrderByAggregateInput = {
    retention_days?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPolicyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel> | $Enums.PolicyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPolicyStatusFilter<$PrismaModel>
    _max?: NestedEnumPolicyStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
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

  export type BackupPolicyRelationFilter = {
    is?: BackupPolicyWhereInput
    isNot?: BackupPolicyWhereInput
  }

  export type SnapshotListRelationFilter = {
    every?: SnapshotWhereInput
    some?: SnapshotWhereInput
    none?: SnapshotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackupJobCountOrderByAggregateInput = {
    id?: SortOrder
    policy_id?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
  }

  export type BackupJobMaxOrderByAggregateInput = {
    id?: SortOrder
    policy_id?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
  }

  export type BackupJobMinOrderByAggregateInput = {
    id?: SortOrder
    policy_id?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    status?: SortOrder
    error_message?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
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

  export type BackupJobRelationFilter = {
    is?: BackupJobWhereInput
    isNot?: BackupJobWhereInput
  }

  export type RestoreJobListRelationFilter = {
    every?: RestoreJobWhereInput
    some?: RestoreJobWhereInput
    none?: RestoreJobWhereInput
  }

  export type RestoreJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SnapshotCountOrderByAggregateInput = {
    snapshot_id?: SortOrder
    job_id?: SortOrder
    size?: SortOrder
    state?: SortOrder
    created_at?: SortOrder
  }

  export type SnapshotAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type SnapshotMaxOrderByAggregateInput = {
    snapshot_id?: SortOrder
    job_id?: SortOrder
    size?: SortOrder
    state?: SortOrder
    created_at?: SortOrder
  }

  export type SnapshotMinOrderByAggregateInput = {
    snapshot_id?: SortOrder
    job_id?: SortOrder
    size?: SortOrder
    state?: SortOrder
    created_at?: SortOrder
  }

  export type SnapshotSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type EnumRestoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RestoreStatus | EnumRestoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRestoreStatusFilter<$PrismaModel> | $Enums.RestoreStatus
  }

  export type SnapshotRelationFilter = {
    is?: SnapshotWhereInput
    isNot?: SnapshotWhereInput
  }

  export type RestoreJobCountOrderByAggregateInput = {
    id?: SortOrder
    snapshot_id?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    new_volume_id?: SortOrder
  }

  export type RestoreJobMaxOrderByAggregateInput = {
    id?: SortOrder
    snapshot_id?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    new_volume_id?: SortOrder
  }

  export type RestoreJobMinOrderByAggregateInput = {
    id?: SortOrder
    snapshot_id?: SortOrder
    status?: SortOrder
    started_at?: SortOrder
    completed_at?: SortOrder
    new_volume_id?: SortOrder
  }

  export type EnumRestoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RestoreStatus | EnumRestoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRestoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.RestoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRestoreStatusFilter<$PrismaModel>
    _max?: NestedEnumRestoreStatusFilter<$PrismaModel>
  }

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    entity_type?: SortOrder
    entity_id?: SortOrder
    created_at?: SortOrder
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BackupTargetCreateNestedManyWithoutUserInput = {
    create?: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput> | BackupTargetCreateWithoutUserInput[] | BackupTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BackupTargetCreateOrConnectWithoutUserInput | BackupTargetCreateOrConnectWithoutUserInput[]
    createMany?: BackupTargetCreateManyUserInputEnvelope
    connect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type BackupTargetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput> | BackupTargetCreateWithoutUserInput[] | BackupTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BackupTargetCreateOrConnectWithoutUserInput | BackupTargetCreateOrConnectWithoutUserInput[]
    createMany?: BackupTargetCreateManyUserInputEnvelope
    connect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BackupTargetUpdateManyWithoutUserNestedInput = {
    create?: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput> | BackupTargetCreateWithoutUserInput[] | BackupTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BackupTargetCreateOrConnectWithoutUserInput | BackupTargetCreateOrConnectWithoutUserInput[]
    upsert?: BackupTargetUpsertWithWhereUniqueWithoutUserInput | BackupTargetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BackupTargetCreateManyUserInputEnvelope
    set?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    disconnect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    delete?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    connect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    update?: BackupTargetUpdateWithWhereUniqueWithoutUserInput | BackupTargetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BackupTargetUpdateManyWithWhereWithoutUserInput | BackupTargetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BackupTargetScalarWhereInput | BackupTargetScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type BackupTargetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput> | BackupTargetCreateWithoutUserInput[] | BackupTargetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BackupTargetCreateOrConnectWithoutUserInput | BackupTargetCreateOrConnectWithoutUserInput[]
    upsert?: BackupTargetUpsertWithWhereUniqueWithoutUserInput | BackupTargetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BackupTargetCreateManyUserInputEnvelope
    set?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    disconnect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    delete?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    connect?: BackupTargetWhereUniqueInput | BackupTargetWhereUniqueInput[]
    update?: BackupTargetUpdateWithWhereUniqueWithoutUserInput | BackupTargetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BackupTargetUpdateManyWithWhereWithoutUserInput | BackupTargetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BackupTargetScalarWhereInput | BackupTargetScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTargetsInput = {
    create?: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetsInput
    connect?: UserWhereUniqueInput
  }

  export type BackupPolicyCreateNestedManyWithoutTargetInput = {
    create?: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput> | BackupPolicyCreateWithoutTargetInput[] | BackupPolicyUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutTargetInput | BackupPolicyCreateOrConnectWithoutTargetInput[]
    createMany?: BackupPolicyCreateManyTargetInputEnvelope
    connect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
  }

  export type BackupPolicyUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput> | BackupPolicyCreateWithoutTargetInput[] | BackupPolicyUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutTargetInput | BackupPolicyCreateOrConnectWithoutTargetInput[]
    createMany?: BackupPolicyCreateManyTargetInputEnvelope
    connect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTargetsInput
    upsert?: UserUpsertWithoutTargetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTargetsInput, UserUpdateWithoutTargetsInput>, UserUncheckedUpdateWithoutTargetsInput>
  }

  export type BackupPolicyUpdateManyWithoutTargetNestedInput = {
    create?: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput> | BackupPolicyCreateWithoutTargetInput[] | BackupPolicyUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutTargetInput | BackupPolicyCreateOrConnectWithoutTargetInput[]
    upsert?: BackupPolicyUpsertWithWhereUniqueWithoutTargetInput | BackupPolicyUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: BackupPolicyCreateManyTargetInputEnvelope
    set?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    disconnect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    delete?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    connect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    update?: BackupPolicyUpdateWithWhereUniqueWithoutTargetInput | BackupPolicyUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: BackupPolicyUpdateManyWithWhereWithoutTargetInput | BackupPolicyUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: BackupPolicyScalarWhereInput | BackupPolicyScalarWhereInput[]
  }

  export type BackupPolicyUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput> | BackupPolicyCreateWithoutTargetInput[] | BackupPolicyUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutTargetInput | BackupPolicyCreateOrConnectWithoutTargetInput[]
    upsert?: BackupPolicyUpsertWithWhereUniqueWithoutTargetInput | BackupPolicyUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: BackupPolicyCreateManyTargetInputEnvelope
    set?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    disconnect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    delete?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    connect?: BackupPolicyWhereUniqueInput | BackupPolicyWhereUniqueInput[]
    update?: BackupPolicyUpdateWithWhereUniqueWithoutTargetInput | BackupPolicyUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: BackupPolicyUpdateManyWithWhereWithoutTargetInput | BackupPolicyUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: BackupPolicyScalarWhereInput | BackupPolicyScalarWhereInput[]
  }

  export type BackupTargetCreateNestedOneWithoutPoliciesInput = {
    create?: XOR<BackupTargetCreateWithoutPoliciesInput, BackupTargetUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: BackupTargetCreateOrConnectWithoutPoliciesInput
    connect?: BackupTargetWhereUniqueInput
  }

  export type BackupJobCreateNestedManyWithoutPolicyInput = {
    create?: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput> | BackupJobCreateWithoutPolicyInput[] | BackupJobUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: BackupJobCreateOrConnectWithoutPolicyInput | BackupJobCreateOrConnectWithoutPolicyInput[]
    createMany?: BackupJobCreateManyPolicyInputEnvelope
    connect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
  }

  export type BackupJobUncheckedCreateNestedManyWithoutPolicyInput = {
    create?: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput> | BackupJobCreateWithoutPolicyInput[] | BackupJobUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: BackupJobCreateOrConnectWithoutPolicyInput | BackupJobCreateOrConnectWithoutPolicyInput[]
    createMany?: BackupJobCreateManyPolicyInputEnvelope
    connect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumPolicyStatusFieldUpdateOperationsInput = {
    set?: $Enums.PolicyStatus
  }

  export type BackupTargetUpdateOneRequiredWithoutPoliciesNestedInput = {
    create?: XOR<BackupTargetCreateWithoutPoliciesInput, BackupTargetUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: BackupTargetCreateOrConnectWithoutPoliciesInput
    upsert?: BackupTargetUpsertWithoutPoliciesInput
    connect?: BackupTargetWhereUniqueInput
    update?: XOR<XOR<BackupTargetUpdateToOneWithWhereWithoutPoliciesInput, BackupTargetUpdateWithoutPoliciesInput>, BackupTargetUncheckedUpdateWithoutPoliciesInput>
  }

  export type BackupJobUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput> | BackupJobCreateWithoutPolicyInput[] | BackupJobUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: BackupJobCreateOrConnectWithoutPolicyInput | BackupJobCreateOrConnectWithoutPolicyInput[]
    upsert?: BackupJobUpsertWithWhereUniqueWithoutPolicyInput | BackupJobUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: BackupJobCreateManyPolicyInputEnvelope
    set?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    disconnect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    delete?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    connect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    update?: BackupJobUpdateWithWhereUniqueWithoutPolicyInput | BackupJobUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: BackupJobUpdateManyWithWhereWithoutPolicyInput | BackupJobUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: BackupJobScalarWhereInput | BackupJobScalarWhereInput[]
  }

  export type BackupJobUncheckedUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput> | BackupJobCreateWithoutPolicyInput[] | BackupJobUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: BackupJobCreateOrConnectWithoutPolicyInput | BackupJobCreateOrConnectWithoutPolicyInput[]
    upsert?: BackupJobUpsertWithWhereUniqueWithoutPolicyInput | BackupJobUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: BackupJobCreateManyPolicyInputEnvelope
    set?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    disconnect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    delete?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    connect?: BackupJobWhereUniqueInput | BackupJobWhereUniqueInput[]
    update?: BackupJobUpdateWithWhereUniqueWithoutPolicyInput | BackupJobUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: BackupJobUpdateManyWithWhereWithoutPolicyInput | BackupJobUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: BackupJobScalarWhereInput | BackupJobScalarWhereInput[]
  }

  export type BackupPolicyCreateNestedOneWithoutJobsInput = {
    create?: XOR<BackupPolicyCreateWithoutJobsInput, BackupPolicyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutJobsInput
    connect?: BackupPolicyWhereUniqueInput
  }

  export type SnapshotCreateNestedManyWithoutJobInput = {
    create?: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput> | SnapshotCreateWithoutJobInput[] | SnapshotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: SnapshotCreateOrConnectWithoutJobInput | SnapshotCreateOrConnectWithoutJobInput[]
    createMany?: SnapshotCreateManyJobInputEnvelope
    connect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
  }

  export type SnapshotUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput> | SnapshotCreateWithoutJobInput[] | SnapshotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: SnapshotCreateOrConnectWithoutJobInput | SnapshotCreateOrConnectWithoutJobInput[]
    createMany?: SnapshotCreateManyJobInputEnvelope
    connect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BackupPolicyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<BackupPolicyCreateWithoutJobsInput, BackupPolicyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: BackupPolicyCreateOrConnectWithoutJobsInput
    upsert?: BackupPolicyUpsertWithoutJobsInput
    connect?: BackupPolicyWhereUniqueInput
    update?: XOR<XOR<BackupPolicyUpdateToOneWithWhereWithoutJobsInput, BackupPolicyUpdateWithoutJobsInput>, BackupPolicyUncheckedUpdateWithoutJobsInput>
  }

  export type SnapshotUpdateManyWithoutJobNestedInput = {
    create?: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput> | SnapshotCreateWithoutJobInput[] | SnapshotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: SnapshotCreateOrConnectWithoutJobInput | SnapshotCreateOrConnectWithoutJobInput[]
    upsert?: SnapshotUpsertWithWhereUniqueWithoutJobInput | SnapshotUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: SnapshotCreateManyJobInputEnvelope
    set?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    disconnect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    delete?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    connect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    update?: SnapshotUpdateWithWhereUniqueWithoutJobInput | SnapshotUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: SnapshotUpdateManyWithWhereWithoutJobInput | SnapshotUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: SnapshotScalarWhereInput | SnapshotScalarWhereInput[]
  }

  export type SnapshotUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput> | SnapshotCreateWithoutJobInput[] | SnapshotUncheckedCreateWithoutJobInput[]
    connectOrCreate?: SnapshotCreateOrConnectWithoutJobInput | SnapshotCreateOrConnectWithoutJobInput[]
    upsert?: SnapshotUpsertWithWhereUniqueWithoutJobInput | SnapshotUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: SnapshotCreateManyJobInputEnvelope
    set?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    disconnect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    delete?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    connect?: SnapshotWhereUniqueInput | SnapshotWhereUniqueInput[]
    update?: SnapshotUpdateWithWhereUniqueWithoutJobInput | SnapshotUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: SnapshotUpdateManyWithWhereWithoutJobInput | SnapshotUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: SnapshotScalarWhereInput | SnapshotScalarWhereInput[]
  }

  export type BackupJobCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<BackupJobCreateWithoutSnapshotsInput, BackupJobUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: BackupJobCreateOrConnectWithoutSnapshotsInput
    connect?: BackupJobWhereUniqueInput
  }

  export type RestoreJobCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput> | RestoreJobCreateWithoutSnapshotInput[] | RestoreJobUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: RestoreJobCreateOrConnectWithoutSnapshotInput | RestoreJobCreateOrConnectWithoutSnapshotInput[]
    createMany?: RestoreJobCreateManySnapshotInputEnvelope
    connect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
  }

  export type RestoreJobUncheckedCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput> | RestoreJobCreateWithoutSnapshotInput[] | RestoreJobUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: RestoreJobCreateOrConnectWithoutSnapshotInput | RestoreJobCreateOrConnectWithoutSnapshotInput[]
    createMany?: RestoreJobCreateManySnapshotInputEnvelope
    connect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
  }

  export type BackupJobUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<BackupJobCreateWithoutSnapshotsInput, BackupJobUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: BackupJobCreateOrConnectWithoutSnapshotsInput
    upsert?: BackupJobUpsertWithoutSnapshotsInput
    connect?: BackupJobWhereUniqueInput
    update?: XOR<XOR<BackupJobUpdateToOneWithWhereWithoutSnapshotsInput, BackupJobUpdateWithoutSnapshotsInput>, BackupJobUncheckedUpdateWithoutSnapshotsInput>
  }

  export type RestoreJobUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput> | RestoreJobCreateWithoutSnapshotInput[] | RestoreJobUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: RestoreJobCreateOrConnectWithoutSnapshotInput | RestoreJobCreateOrConnectWithoutSnapshotInput[]
    upsert?: RestoreJobUpsertWithWhereUniqueWithoutSnapshotInput | RestoreJobUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: RestoreJobCreateManySnapshotInputEnvelope
    set?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    disconnect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    delete?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    connect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    update?: RestoreJobUpdateWithWhereUniqueWithoutSnapshotInput | RestoreJobUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: RestoreJobUpdateManyWithWhereWithoutSnapshotInput | RestoreJobUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: RestoreJobScalarWhereInput | RestoreJobScalarWhereInput[]
  }

  export type RestoreJobUncheckedUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput> | RestoreJobCreateWithoutSnapshotInput[] | RestoreJobUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: RestoreJobCreateOrConnectWithoutSnapshotInput | RestoreJobCreateOrConnectWithoutSnapshotInput[]
    upsert?: RestoreJobUpsertWithWhereUniqueWithoutSnapshotInput | RestoreJobUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: RestoreJobCreateManySnapshotInputEnvelope
    set?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    disconnect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    delete?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    connect?: RestoreJobWhereUniqueInput | RestoreJobWhereUniqueInput[]
    update?: RestoreJobUpdateWithWhereUniqueWithoutSnapshotInput | RestoreJobUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: RestoreJobUpdateManyWithWhereWithoutSnapshotInput | RestoreJobUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: RestoreJobScalarWhereInput | RestoreJobScalarWhereInput[]
  }

  export type SnapshotCreateNestedOneWithoutRestoresInput = {
    create?: XOR<SnapshotCreateWithoutRestoresInput, SnapshotUncheckedCreateWithoutRestoresInput>
    connectOrCreate?: SnapshotCreateOrConnectWithoutRestoresInput
    connect?: SnapshotWhereUniqueInput
  }

  export type EnumRestoreStatusFieldUpdateOperationsInput = {
    set?: $Enums.RestoreStatus
  }

  export type SnapshotUpdateOneRequiredWithoutRestoresNestedInput = {
    create?: XOR<SnapshotCreateWithoutRestoresInput, SnapshotUncheckedCreateWithoutRestoresInput>
    connectOrCreate?: SnapshotCreateOrConnectWithoutRestoresInput
    upsert?: SnapshotUpsertWithoutRestoresInput
    connect?: SnapshotWhereUniqueInput
    update?: XOR<XOR<SnapshotUpdateToOneWithWhereWithoutRestoresInput, SnapshotUpdateWithoutRestoresInput>, SnapshotUncheckedUpdateWithoutRestoresInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumPolicyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusFilter<$PrismaModel> | $Enums.PolicyStatus
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel> | $Enums.PolicyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPolicyStatusFilter<$PrismaModel>
    _max?: NestedEnumPolicyStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
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

  export type NestedEnumRestoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RestoreStatus | EnumRestoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRestoreStatusFilter<$PrismaModel> | $Enums.RestoreStatus
  }

  export type NestedEnumRestoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RestoreStatus | EnumRestoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RestoreStatus[] | ListEnumRestoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRestoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.RestoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRestoreStatusFilter<$PrismaModel>
    _max?: NestedEnumRestoreStatusFilter<$PrismaModel>
  }

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BackupTargetCreateWithoutUserInput = {
    id?: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
    policies?: BackupPolicyCreateNestedManyWithoutTargetInput
  }

  export type BackupTargetUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
    policies?: BackupPolicyUncheckedCreateNestedManyWithoutTargetInput
  }

  export type BackupTargetCreateOrConnectWithoutUserInput = {
    where: BackupTargetWhereUniqueInput
    create: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput>
  }

  export type BackupTargetCreateManyUserInputEnvelope = {
    data: BackupTargetCreateManyUserInput | BackupTargetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BackupTargetUpsertWithWhereUniqueWithoutUserInput = {
    where: BackupTargetWhereUniqueInput
    update: XOR<BackupTargetUpdateWithoutUserInput, BackupTargetUncheckedUpdateWithoutUserInput>
    create: XOR<BackupTargetCreateWithoutUserInput, BackupTargetUncheckedCreateWithoutUserInput>
  }

  export type BackupTargetUpdateWithWhereUniqueWithoutUserInput = {
    where: BackupTargetWhereUniqueInput
    data: XOR<BackupTargetUpdateWithoutUserInput, BackupTargetUncheckedUpdateWithoutUserInput>
  }

  export type BackupTargetUpdateManyWithWhereWithoutUserInput = {
    where: BackupTargetScalarWhereInput
    data: XOR<BackupTargetUpdateManyMutationInput, BackupTargetUncheckedUpdateManyWithoutUserInput>
  }

  export type BackupTargetScalarWhereInput = {
    AND?: BackupTargetScalarWhereInput | BackupTargetScalarWhereInput[]
    OR?: BackupTargetScalarWhereInput[]
    NOT?: BackupTargetScalarWhereInput | BackupTargetScalarWhereInput[]
    id?: UuidFilter<"BackupTarget"> | string
    user_id?: UuidFilter<"BackupTarget"> | string
    name?: StringFilter<"BackupTarget"> | string
    instance_id?: StringFilter<"BackupTarget"> | string
    volume_id?: StringFilter<"BackupTarget"> | string
    region?: StringFilter<"BackupTarget"> | string
    created_at?: DateTimeFilter<"BackupTarget"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: UuidFilter<"Notification"> | string
    user_id?: UuidFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    created_at?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutTargetsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTargetsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTargetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
  }

  export type BackupPolicyCreateWithoutTargetInput = {
    id?: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
    jobs?: BackupJobCreateNestedManyWithoutPolicyInput
  }

  export type BackupPolicyUncheckedCreateWithoutTargetInput = {
    id?: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
    jobs?: BackupJobUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type BackupPolicyCreateOrConnectWithoutTargetInput = {
    where: BackupPolicyWhereUniqueInput
    create: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput>
  }

  export type BackupPolicyCreateManyTargetInputEnvelope = {
    data: BackupPolicyCreateManyTargetInput | BackupPolicyCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTargetsInput = {
    update: XOR<UserUpdateWithoutTargetsInput, UserUncheckedUpdateWithoutTargetsInput>
    create: XOR<UserCreateWithoutTargetsInput, UserUncheckedCreateWithoutTargetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTargetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTargetsInput, UserUncheckedUpdateWithoutTargetsInput>
  }

  export type UserUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BackupPolicyUpsertWithWhereUniqueWithoutTargetInput = {
    where: BackupPolicyWhereUniqueInput
    update: XOR<BackupPolicyUpdateWithoutTargetInput, BackupPolicyUncheckedUpdateWithoutTargetInput>
    create: XOR<BackupPolicyCreateWithoutTargetInput, BackupPolicyUncheckedCreateWithoutTargetInput>
  }

  export type BackupPolicyUpdateWithWhereUniqueWithoutTargetInput = {
    where: BackupPolicyWhereUniqueInput
    data: XOR<BackupPolicyUpdateWithoutTargetInput, BackupPolicyUncheckedUpdateWithoutTargetInput>
  }

  export type BackupPolicyUpdateManyWithWhereWithoutTargetInput = {
    where: BackupPolicyScalarWhereInput
    data: XOR<BackupPolicyUpdateManyMutationInput, BackupPolicyUncheckedUpdateManyWithoutTargetInput>
  }

  export type BackupPolicyScalarWhereInput = {
    AND?: BackupPolicyScalarWhereInput | BackupPolicyScalarWhereInput[]
    OR?: BackupPolicyScalarWhereInput[]
    NOT?: BackupPolicyScalarWhereInput | BackupPolicyScalarWhereInput[]
    id?: UuidFilter<"BackupPolicy"> | string
    target_id?: UuidFilter<"BackupPolicy"> | string
    name?: StringFilter<"BackupPolicy"> | string
    frequency?: StringFilter<"BackupPolicy"> | string
    retention_days?: IntFilter<"BackupPolicy"> | number
    email_alerts?: BoolFilter<"BackupPolicy"> | boolean
    status?: EnumPolicyStatusFilter<"BackupPolicy"> | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFilter<"BackupPolicy"> | string
    created_at?: DateTimeFilter<"BackupPolicy"> | Date | string
  }

  export type BackupTargetCreateWithoutPoliciesInput = {
    id?: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutTargetsInput
  }

  export type BackupTargetUncheckedCreateWithoutPoliciesInput = {
    id?: string
    user_id: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
  }

  export type BackupTargetCreateOrConnectWithoutPoliciesInput = {
    where: BackupTargetWhereUniqueInput
    create: XOR<BackupTargetCreateWithoutPoliciesInput, BackupTargetUncheckedCreateWithoutPoliciesInput>
  }

  export type BackupJobCreateWithoutPolicyInput = {
    id?: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
    snapshots?: SnapshotCreateNestedManyWithoutJobInput
  }

  export type BackupJobUncheckedCreateWithoutPolicyInput = {
    id?: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
    snapshots?: SnapshotUncheckedCreateNestedManyWithoutJobInput
  }

  export type BackupJobCreateOrConnectWithoutPolicyInput = {
    where: BackupJobWhereUniqueInput
    create: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput>
  }

  export type BackupJobCreateManyPolicyInputEnvelope = {
    data: BackupJobCreateManyPolicyInput | BackupJobCreateManyPolicyInput[]
    skipDuplicates?: boolean
  }

  export type BackupTargetUpsertWithoutPoliciesInput = {
    update: XOR<BackupTargetUpdateWithoutPoliciesInput, BackupTargetUncheckedUpdateWithoutPoliciesInput>
    create: XOR<BackupTargetCreateWithoutPoliciesInput, BackupTargetUncheckedCreateWithoutPoliciesInput>
    where?: BackupTargetWhereInput
  }

  export type BackupTargetUpdateToOneWithWhereWithoutPoliciesInput = {
    where?: BackupTargetWhereInput
    data: XOR<BackupTargetUpdateWithoutPoliciesInput, BackupTargetUncheckedUpdateWithoutPoliciesInput>
  }

  export type BackupTargetUpdateWithoutPoliciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type BackupTargetUncheckedUpdateWithoutPoliciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupJobUpsertWithWhereUniqueWithoutPolicyInput = {
    where: BackupJobWhereUniqueInput
    update: XOR<BackupJobUpdateWithoutPolicyInput, BackupJobUncheckedUpdateWithoutPolicyInput>
    create: XOR<BackupJobCreateWithoutPolicyInput, BackupJobUncheckedCreateWithoutPolicyInput>
  }

  export type BackupJobUpdateWithWhereUniqueWithoutPolicyInput = {
    where: BackupJobWhereUniqueInput
    data: XOR<BackupJobUpdateWithoutPolicyInput, BackupJobUncheckedUpdateWithoutPolicyInput>
  }

  export type BackupJobUpdateManyWithWhereWithoutPolicyInput = {
    where: BackupJobScalarWhereInput
    data: XOR<BackupJobUpdateManyMutationInput, BackupJobUncheckedUpdateManyWithoutPolicyInput>
  }

  export type BackupJobScalarWhereInput = {
    AND?: BackupJobScalarWhereInput | BackupJobScalarWhereInput[]
    OR?: BackupJobScalarWhereInput[]
    NOT?: BackupJobScalarWhereInput | BackupJobScalarWhereInput[]
    id?: UuidFilter<"BackupJob"> | string
    policy_id?: UuidFilter<"BackupJob"> | string
    started_at?: DateTimeFilter<"BackupJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"BackupJob"> | Date | string | null
    status?: EnumJobStatusFilter<"BackupJob"> | $Enums.JobStatus
    error_message?: StringNullableFilter<"BackupJob"> | string | null
  }

  export type BackupPolicyCreateWithoutJobsInput = {
    id?: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
    target: BackupTargetCreateNestedOneWithoutPoliciesInput
  }

  export type BackupPolicyUncheckedCreateWithoutJobsInput = {
    id?: string
    target_id: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
  }

  export type BackupPolicyCreateOrConnectWithoutJobsInput = {
    where: BackupPolicyWhereUniqueInput
    create: XOR<BackupPolicyCreateWithoutJobsInput, BackupPolicyUncheckedCreateWithoutJobsInput>
  }

  export type SnapshotCreateWithoutJobInput = {
    snapshot_id: string
    size: number
    state: string
    created_at?: Date | string
    restores?: RestoreJobCreateNestedManyWithoutSnapshotInput
  }

  export type SnapshotUncheckedCreateWithoutJobInput = {
    snapshot_id: string
    size: number
    state: string
    created_at?: Date | string
    restores?: RestoreJobUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type SnapshotCreateOrConnectWithoutJobInput = {
    where: SnapshotWhereUniqueInput
    create: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput>
  }

  export type SnapshotCreateManyJobInputEnvelope = {
    data: SnapshotCreateManyJobInput | SnapshotCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type BackupPolicyUpsertWithoutJobsInput = {
    update: XOR<BackupPolicyUpdateWithoutJobsInput, BackupPolicyUncheckedUpdateWithoutJobsInput>
    create: XOR<BackupPolicyCreateWithoutJobsInput, BackupPolicyUncheckedCreateWithoutJobsInput>
    where?: BackupPolicyWhereInput
  }

  export type BackupPolicyUpdateToOneWithWhereWithoutJobsInput = {
    where?: BackupPolicyWhereInput
    data: XOR<BackupPolicyUpdateWithoutJobsInput, BackupPolicyUncheckedUpdateWithoutJobsInput>
  }

  export type BackupPolicyUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: BackupTargetUpdateOneRequiredWithoutPoliciesNestedInput
  }

  export type BackupPolicyUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    target_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SnapshotUpsertWithWhereUniqueWithoutJobInput = {
    where: SnapshotWhereUniqueInput
    update: XOR<SnapshotUpdateWithoutJobInput, SnapshotUncheckedUpdateWithoutJobInput>
    create: XOR<SnapshotCreateWithoutJobInput, SnapshotUncheckedCreateWithoutJobInput>
  }

  export type SnapshotUpdateWithWhereUniqueWithoutJobInput = {
    where: SnapshotWhereUniqueInput
    data: XOR<SnapshotUpdateWithoutJobInput, SnapshotUncheckedUpdateWithoutJobInput>
  }

  export type SnapshotUpdateManyWithWhereWithoutJobInput = {
    where: SnapshotScalarWhereInput
    data: XOR<SnapshotUpdateManyMutationInput, SnapshotUncheckedUpdateManyWithoutJobInput>
  }

  export type SnapshotScalarWhereInput = {
    AND?: SnapshotScalarWhereInput | SnapshotScalarWhereInput[]
    OR?: SnapshotScalarWhereInput[]
    NOT?: SnapshotScalarWhereInput | SnapshotScalarWhereInput[]
    snapshot_id?: StringFilter<"Snapshot"> | string
    job_id?: UuidFilter<"Snapshot"> | string
    size?: IntFilter<"Snapshot"> | number
    state?: StringFilter<"Snapshot"> | string
    created_at?: DateTimeFilter<"Snapshot"> | Date | string
  }

  export type BackupJobCreateWithoutSnapshotsInput = {
    id?: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
    policy: BackupPolicyCreateNestedOneWithoutJobsInput
  }

  export type BackupJobUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    policy_id: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
  }

  export type BackupJobCreateOrConnectWithoutSnapshotsInput = {
    where: BackupJobWhereUniqueInput
    create: XOR<BackupJobCreateWithoutSnapshotsInput, BackupJobUncheckedCreateWithoutSnapshotsInput>
  }

  export type RestoreJobCreateWithoutSnapshotInput = {
    id?: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
  }

  export type RestoreJobUncheckedCreateWithoutSnapshotInput = {
    id?: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
  }

  export type RestoreJobCreateOrConnectWithoutSnapshotInput = {
    where: RestoreJobWhereUniqueInput
    create: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput>
  }

  export type RestoreJobCreateManySnapshotInputEnvelope = {
    data: RestoreJobCreateManySnapshotInput | RestoreJobCreateManySnapshotInput[]
    skipDuplicates?: boolean
  }

  export type BackupJobUpsertWithoutSnapshotsInput = {
    update: XOR<BackupJobUpdateWithoutSnapshotsInput, BackupJobUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<BackupJobCreateWithoutSnapshotsInput, BackupJobUncheckedCreateWithoutSnapshotsInput>
    where?: BackupJobWhereInput
  }

  export type BackupJobUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: BackupJobWhereInput
    data: XOR<BackupJobUpdateWithoutSnapshotsInput, BackupJobUncheckedUpdateWithoutSnapshotsInput>
  }

  export type BackupJobUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    policy?: BackupPolicyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type BackupJobUncheckedUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    policy_id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RestoreJobUpsertWithWhereUniqueWithoutSnapshotInput = {
    where: RestoreJobWhereUniqueInput
    update: XOR<RestoreJobUpdateWithoutSnapshotInput, RestoreJobUncheckedUpdateWithoutSnapshotInput>
    create: XOR<RestoreJobCreateWithoutSnapshotInput, RestoreJobUncheckedCreateWithoutSnapshotInput>
  }

  export type RestoreJobUpdateWithWhereUniqueWithoutSnapshotInput = {
    where: RestoreJobWhereUniqueInput
    data: XOR<RestoreJobUpdateWithoutSnapshotInput, RestoreJobUncheckedUpdateWithoutSnapshotInput>
  }

  export type RestoreJobUpdateManyWithWhereWithoutSnapshotInput = {
    where: RestoreJobScalarWhereInput
    data: XOR<RestoreJobUpdateManyMutationInput, RestoreJobUncheckedUpdateManyWithoutSnapshotInput>
  }

  export type RestoreJobScalarWhereInput = {
    AND?: RestoreJobScalarWhereInput | RestoreJobScalarWhereInput[]
    OR?: RestoreJobScalarWhereInput[]
    NOT?: RestoreJobScalarWhereInput | RestoreJobScalarWhereInput[]
    id?: UuidFilter<"RestoreJob"> | string
    snapshot_id?: StringFilter<"RestoreJob"> | string
    status?: EnumRestoreStatusFilter<"RestoreJob"> | $Enums.RestoreStatus
    started_at?: DateTimeFilter<"RestoreJob"> | Date | string
    completed_at?: DateTimeNullableFilter<"RestoreJob"> | Date | string | null
    new_volume_id?: StringNullableFilter<"RestoreJob"> | string | null
  }

  export type SnapshotCreateWithoutRestoresInput = {
    snapshot_id: string
    size: number
    state: string
    created_at?: Date | string
    job: BackupJobCreateNestedOneWithoutSnapshotsInput
  }

  export type SnapshotUncheckedCreateWithoutRestoresInput = {
    snapshot_id: string
    job_id: string
    size: number
    state: string
    created_at?: Date | string
  }

  export type SnapshotCreateOrConnectWithoutRestoresInput = {
    where: SnapshotWhereUniqueInput
    create: XOR<SnapshotCreateWithoutRestoresInput, SnapshotUncheckedCreateWithoutRestoresInput>
  }

  export type SnapshotUpsertWithoutRestoresInput = {
    update: XOR<SnapshotUpdateWithoutRestoresInput, SnapshotUncheckedUpdateWithoutRestoresInput>
    create: XOR<SnapshotCreateWithoutRestoresInput, SnapshotUncheckedCreateWithoutRestoresInput>
    where?: SnapshotWhereInput
  }

  export type SnapshotUpdateToOneWithWhereWithoutRestoresInput = {
    where?: SnapshotWhereInput
    data: XOR<SnapshotUpdateWithoutRestoresInput, SnapshotUncheckedUpdateWithoutRestoresInput>
  }

  export type SnapshotUpdateWithoutRestoresInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: BackupJobUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type SnapshotUncheckedUpdateWithoutRestoresInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutNotificationsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    targets?: BackupTargetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id: string
    email: string
    name: string
    role?: $Enums.Role
    created_at?: Date | string
    targets?: BackupTargetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: BackupTargetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: BackupTargetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BackupTargetCreateManyUserInput = {
    id?: string
    name: string
    instance_id: string
    volume_id: string
    region: string
    created_at?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: string
    message: string
    status?: $Enums.NotificationStatus
    created_at?: Date | string
  }

  export type BackupTargetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: BackupPolicyUpdateManyWithoutTargetNestedInput
  }

  export type BackupTargetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: BackupPolicyUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type BackupTargetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    instance_id?: StringFieldUpdateOperationsInput | string
    volume_id?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupPolicyCreateManyTargetInput = {
    id?: string
    name: string
    frequency: string
    retention_days: number
    email_alerts?: boolean
    status?: $Enums.PolicyStatus
    eventbridge_schedule_name: string
    created_at?: Date | string
  }

  export type BackupPolicyUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: BackupJobUpdateManyWithoutPolicyNestedInput
  }

  export type BackupPolicyUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: BackupJobUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type BackupPolicyUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    frequency?: StringFieldUpdateOperationsInput | string
    retention_days?: IntFieldUpdateOperationsInput | number
    email_alerts?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    eventbridge_schedule_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackupJobCreateManyPolicyInput = {
    id?: string
    started_at?: Date | string
    completed_at?: Date | string | null
    status?: $Enums.JobStatus
    error_message?: string | null
  }

  export type BackupJobUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    snapshots?: SnapshotUpdateManyWithoutJobNestedInput
  }

  export type BackupJobUncheckedUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    snapshots?: SnapshotUncheckedUpdateManyWithoutJobNestedInput
  }

  export type BackupJobUncheckedUpdateManyWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SnapshotCreateManyJobInput = {
    snapshot_id: string
    size: number
    state: string
    created_at?: Date | string
  }

  export type SnapshotUpdateWithoutJobInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    restores?: RestoreJobUpdateManyWithoutSnapshotNestedInput
  }

  export type SnapshotUncheckedUpdateWithoutJobInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    restores?: RestoreJobUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type SnapshotUncheckedUpdateManyWithoutJobInput = {
    snapshot_id?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    state?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestoreJobCreateManySnapshotInput = {
    id?: string
    status?: $Enums.RestoreStatus
    started_at?: Date | string
    completed_at?: Date | string | null
    new_volume_id?: string | null
  }

  export type RestoreJobUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RestoreJobUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RestoreJobUncheckedUpdateManyWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRestoreStatusFieldUpdateOperationsInput | $Enums.RestoreStatus
    started_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    new_volume_id?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupTargetCountOutputTypeDefaultArgs instead
     */
    export type BackupTargetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupTargetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupPolicyCountOutputTypeDefaultArgs instead
     */
    export type BackupPolicyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupPolicyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupJobCountOutputTypeDefaultArgs instead
     */
    export type BackupJobCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupJobCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SnapshotCountOutputTypeDefaultArgs instead
     */
    export type SnapshotCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SnapshotCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupTargetDefaultArgs instead
     */
    export type BackupTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupTargetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupPolicyDefaultArgs instead
     */
    export type BackupPolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupPolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BackupJobDefaultArgs instead
     */
    export type BackupJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BackupJobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SnapshotDefaultArgs instead
     */
    export type SnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RestoreJobDefaultArgs instead
     */
    export type RestoreJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RestoreJobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

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