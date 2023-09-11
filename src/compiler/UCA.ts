import { Rule } from "../language/generated/ast"

export type myContext = {
    hazard_list: string[]
    name: string
    values: Array<"True" | "False" | "Unknown">
    vars: Array<string>
}
export type myRule = {
    control_action: string
    contexts: Array<myContext>
    name: string
    system: string
    type: 'applied-too-long' | 'not-provided' | 'provided' | 'stopped-too-soon' | 'too-early' | 'too-late' | 'wrong-time'
}


export function rule_to_myRule(rule : Rule): myRule {
    var r: myRule = {} as myRule; 
    r.contexts = [];
    for(var context of rule.contexts){
        var c:myContext = {} as myContext;
        /* console.log(`\tname: ${context.name}`) */
        c.name = context.name;

        /* console.log(`\t\tharzard_list: ${context.list.refs}`)                     */
        c.hazard_list = context.list.refs;

        /* console.log(`\t\tvars: ${context.vars}`)                     */
        c.vars = context.vars;

        /* console.log(`\t\tvalues: ${context.values}`)                     */
        c.values = context.values
                    .map(value => {
                            if(value == "True") { return "True" }
                            else if (value == "False" ) { return "False" }
                            else { return "Unknown" }
                        }   
                        );

        r.contexts.push(c)
    }
    r = {
        name: rule.name, 
        control_action: rule.action,
        type: rule.type,
        system: rule.system,
        contexts: r.contexts
    };
    return r; 
}
