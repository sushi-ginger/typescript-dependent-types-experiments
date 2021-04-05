// Making an exercise from https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

type Action =
    | {
    type: "INIT"
}
    | {
    type: "SYNC"
}
    | {
    type: "LOG_IN"
    emailAddress: string
}
    | {
    type: "LOG_IN_SUCCESS"
    accessToken: string
}

type ActionType = Action['type']

type ExtractSimpleAction<A> = A extends any
    ? {} extends ExcludeTypeField<A>
        ? A
        : never
    : never
type SimpleActionType = ExtractSimpleAction<Action>['type']

type ExcludeTypeField<A> = { [K in Exclude<keyof A, 'type'>]: A[K] }

type ExtractActionParameters<A, T> = ExcludeTypeField<Extract<A, { type: T }>>

type DispatchArgs<A> = {} extends A
    ? never
    : { [K in Exclude<keyof A, 'type'>]: A[K] }


declare function dispatch(type: SimpleActionType): void;
declare function dispatch<T extends ActionType>(
    type: T,
    args: DispatchArgs<ExtractActionParameters<Action, T>>
): void


dispatch('LOG_IN', { emailAddress: '2'})
dispatch('SYNC')
