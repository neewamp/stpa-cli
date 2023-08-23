// Niave duplication of solver-aided-stpa's control.py data structures 
// Mainly doing this to get a little more familiar with typescript 

import { Err } from "pratica";

// Debating class vs type
// Class allows for the definition of member function but seems to do weird stuff with member function definitions
// [Object object] when trying to use a toString function???
// TODO class seems like a nice option. But type seems more robust without overloading though. 
type Ident = {
    qualifier: Ident | null; // The question mark is the same as `Ident | undefined` in other words is optional
    name: string;
}

function IdentToString(i: Ident): string {
    if(i.qualifier) {
        return IdentToString(i.qualifier) + '.' + i.name;
    }
    else {
        return i.name;
    }
}
function IdentOfList(l: string[]): Ident {
    if(l?.length) {
        if(l?.length == 1) {
            return {qualifier: null, name: l[0]};
        }
        else {
            return {
                qualifier: IdentOfList(l.slice(0, -1)),
                name: l[-1]
            }
        }
    }
    else {
        throw new Error("IdentOfList: empty list")
    }

}

function IdentOfString(s : string): Ident {
    return IdentOfList(s.split('.'));
}

type VarDecl = {
    name: string;
}

type Test = VarDecl | Ident 

function VarDeclToString(v : VarDecl): string {
    return v.name;
}

let v : VarDecl = {name: "hi"};

// Experimenting with how to get this to Alex's python app
// console.log(JSON.stringify(v))

type Type = "int" | "bool" | Ident

let t_ex: Type = "int";

interface TypePattern<T> {
    Bool: (s: "bool") => T;
    Int: (b: "int") => T;
    Ident: (n: Ident) => T;
  }

// Not a problem for me wanting to print a string 
// Representation of this language 
// But I really don't think I like the combination
// of structural typing with unions...
function TypeToString(t : Type): string {
    if((t as Ident).name !== undefined){
        return IdentToString(t as Ident);
    }
    else if(t == "bool") {
        return "bool";
    }
    else {
        return "int";
    }
    
}
/* function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
  }
 */
let t_lit_ex: Type = 
 {qualifier: {qualifier: null, name: "hmm"}, name: "hi"};

console.log(TypeToString(t_lit_ex));

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

let ex_binop: Expr = {
    op: "MULT",
    e1: {i: 10 as int},
    e2: {i: 1 as int}
}


type Action = {
    name: string
    allowed: Expr[]
    required: Expr[]
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

let ucs_ex : UCA = {
    action: {qualifier: null, name: "Action1"},
    type: "issued",
    context: ex_binop
}

// Testing the representation of javascripts automatic generation of json from objects to see if it will be 
// compatable with the python version in solver-aided-stpa
console.log(JSON.stringify(ucs_ex))

