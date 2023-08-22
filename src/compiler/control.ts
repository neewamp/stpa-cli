// Niave duplication of solver-aided-stpa's control.py data structures 
// Mainly doing this to get a little more familiar with typescript 

// Debating class vs type
// Class allows for the definition of member function but seems to do weird stuff with member function definitions
// [Object object] when trying to use a toString function???
// TODO class seems like a nice option. But type seems more robust without overloading though. 
type Ident = {
    qualifier?: Ident; // The question mark is the same as `Ident | undefined` in other words is optional
    name: string;
}

function IdentToString(i: Ident): string {
    if(i.qualifier) {
        return i.qualifier.toString() + '.' + i.name;
    }
    else {
        return i.name;
    }
}

type VarDecl = {
    name: string;
}

function VarDeclToString(v : VarDecl): string {
    return v.name;
}

let v : VarDecl = {name: "hi"};

type Type = "int" | "bool" | Ident

type FinTypeDecl = {
    name: string;
    elements: string[];
}
// From: https://stackoverflow.com/questions/12897742/how-do-you-specify-that-a-class-property-is-an-integer
// Helper for generating Opaque types.
type Opaque<T, K> = T & { __opaque__: K };

// 2 opaque types created with the helper
type int = Opaque<number, 'int'>;

type IntLiteral = {
    i: int;
}

// Using the above the typechecker will require 
// Explicit casts to the type 
// Isn't type safe but at least you have to be deliberate about what is happing 
// This is due to typescript not having a separate integer type
let t : IntLiteral = {i: 10 as int};

type LiteralExp = IntLiteral | "true" | "false"

type UnaryExpr = {
    op: "NOT";
    e: Expr;
}

type BinaryExpr = {
    op: 'AND' | 'OR' | 'LT' | 'LE' | 'GT' | 'GE' | 'EQ' |
    'PLUS' | 'MINUS' | 'MULT' | 'DIV' | 'WHEN'

    e1: Expr
    e2: Expr
}

type Expr = Ident | LiteralExp | UnaryExpr | BinaryExpr

type Action = {
    name: string
    contraints: Expr[]
}

type System = {
    name: string
    types: FinTypeDecl[]
    vars: VarDecl[]
    invariants: Expr[]
    actions: Action[]
    components: System[]
}

type UCAType = "issued" | "not issued"

type UCA = {
    action: Ident
    type: UCAType 
    context: Expr
}

