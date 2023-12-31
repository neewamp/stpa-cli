/******************************************************************************
 * This file was generated by langium-cli 1.2.1.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, Reference, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export type QualifiedName = string;

export function isQualifiedName(item: unknown): item is QualifiedName {
    return typeof item === 'string';
}

export type SubID = string;

export function isSubID(item: unknown): item is SubID {
    return typeof item === 'string';
}

export interface ActionUCAs extends AstNode {
    readonly $container: Model;
    readonly $type: 'ActionUCAs';
    action: string
    system: string
    ucas: Array<UCA>
}

export const ActionUCAs = 'ActionUCAs';

export function isActionUCAs(item: unknown): item is ActionUCAs {
    return reflection.isInstance(item, ActionUCAs);
}

export interface Command extends AstNode {
    readonly $container: Node | VE;
    readonly $type: 'Command';
    label: string
    name: string
}

export const Command = 'Command';

export function isCommand(item: unknown): item is Command {
    return reflection.isInstance(item, Command);
}

export interface ContConstraint extends AstNode {
    readonly $container: Model;
    readonly $type: 'ContConstraint';
    description: string
    name: string
    refs: Array<string>
}

export const ContConstraint = 'ContConstraint';

export function isContConstraint(item: unknown): item is ContConstraint {
    return reflection.isInstance(item, ContConstraint);
}

export interface Context extends AstNode {
    readonly $container: Rule;
    readonly $type: 'Context';
    list: HazardList
    name: string
    values: Array<QualifiedName>
    vars: Array<string>
}

export const Context = 'Context';

export function isContext(item: unknown): item is Context {
    return reflection.isInstance(item, Context);
}

export interface Graph extends AstNode {
    readonly $container: Model;
    readonly $type: 'Graph';
    name: string
    nodes: Array<Node>
}

export const Graph = 'Graph';

export function isGraph(item: unknown): item is Graph {
    return reflection.isInstance(item, Graph);
}

export interface Hazard extends AstNode {
    readonly $container: Hazard | Model;
    readonly $type: 'Hazard';
    description: string
    header?: string
    name: SubID
    refs: Array<string>
    subComps: Array<Hazard>
}

export const Hazard = 'Hazard';

export function isHazard(item: unknown): item is Hazard {
    return reflection.isInstance(item, Hazard);
}

export interface HazardList extends AstNode {
    readonly $container: Context | LossScenario | UCA;
    readonly $type: 'HazardList';
    refs: Array<SubID>
}

export const HazardList = 'HazardList';

export function isHazardList(item: unknown): item is HazardList {
    return reflection.isInstance(item, HazardList);
}

export interface Loss extends AstNode {
    readonly $container: Model;
    readonly $type: 'Loss';
    description: string
    name: string
}

export const Loss = 'Loss';

export function isLoss(item: unknown): item is Loss {
    return reflection.isInstance(item, Loss);
}

export interface LossScenario extends AstNode {
    readonly $container: Model;
    readonly $type: 'LossScenario';
    description: string
    list: HazardList
    name: string
    uca?: string
}

export const LossScenario = 'LossScenario';

export function isLossScenario(item: unknown): item is LossScenario {
    return reflection.isInstance(item, LossScenario);
}

export interface Model extends AstNode {
    readonly $type: 'Model';
    allUCAs: Array<ActionUCAs>
    controllerConstraints: Array<ContConstraint>
    controlStructure?: Graph
    hazards: Array<Hazard>
    losses: Array<Loss>
    responsibilities: Array<Resps>
    rules: Array<Rule>
    safetyCons: Array<SafetyConstraint>
    scenarios: Array<LossScenario>
    systemLevelConstraints: Array<SystemConstraint>
}

export const Model = 'Model';

export function isModel(item: unknown): item is Model {
    return reflection.isInstance(item, Model);
}

export interface Node extends AstNode {
    readonly $container: Graph;
    readonly $type: 'Node';
    actions: Array<VE>
    feedbacks: Array<VE>
    inputs: Array<Command>
    label?: string
    level?: number
    name: string
    outputs: Array<Command>
    variables: Array<Variable>
}

export const Node = 'Node';

export function isNode(item: unknown): item is Node {
    return reflection.isInstance(item, Node);
}

export interface Responsibility extends AstNode {
    readonly $container: Resps;
    readonly $type: 'Responsibility';
    description: string
    name: string
    refs: Array<Reference<SystemConstraint>>
}

export const Responsibility = 'Responsibility';

export function isResponsibility(item: unknown): item is Responsibility {
    return reflection.isInstance(item, Responsibility);
}

export interface Resps extends AstNode {
    readonly $container: Model;
    readonly $type: 'Resps';
    responsiblitiesForOneSystem: Array<Responsibility>
    system: string
}

export const Resps = 'Resps';

export function isResps(item: unknown): item is Resps {
    return reflection.isInstance(item, Resps);
}

export interface Rule extends AstNode {
    readonly $container: Model;
    readonly $type: 'Rule';
    action: string
    contexts: Array<Context>
    name: string
    system: string
    type: 'applied-too-long' | 'not-provided' | 'provided' | 'stopped-too-soon' | 'too-early' | 'too-late' | 'wrong-time'
}

export const Rule = 'Rule';

export function isRule(item: unknown): item is Rule {
    return reflection.isInstance(item, Rule);
}

export interface SafetyConstraint extends AstNode {
    readonly $container: Model;
    readonly $type: 'SafetyConstraint';
    description: string
    name: string
    refs: Array<string>
}

export const SafetyConstraint = 'SafetyConstraint';

export function isSafetyConstraint(item: unknown): item is SafetyConstraint {
    return reflection.isInstance(item, SafetyConstraint);
}

export interface SystemConstraint extends AstNode {
    readonly $container: Model | SystemConstraint;
    readonly $type: 'SystemConstraint';
    description: string
    header?: string
    name: SubID
    refs: Array<Reference<Hazard>>
    subComps: Array<SystemConstraint>
}

export const SystemConstraint = 'SystemConstraint';

export function isSystemConstraint(item: unknown): item is SystemConstraint {
    return reflection.isInstance(item, SystemConstraint);
}

export interface UCA extends AstNode {
    readonly $container: ActionUCAs;
    readonly $type: 'UCA';
    description: string
    list: HazardList
    name: string
}

export const UCA = 'UCA';

export function isUCA(item: unknown): item is UCA {
    return reflection.isInstance(item, UCA);
}

export interface Variable extends AstNode {
    readonly $container: Node;
    readonly $type: 'Variable';
    name: string
    values: Array<VariableValue>
}

export const Variable = 'Variable';

export function isVariable(item: unknown): item is Variable {
    return reflection.isInstance(item, Variable);
}

export interface VariableValue extends AstNode {
    readonly $container: Variable;
    readonly $type: 'VariableValue';
    firstValue?: 'MIN' | 'false' | 'true' | QualifiedName | number
    name: QualifiedName
    operator?: '!=' | '='
    secondValue?: 'MAX' | QualifiedName | number
}

export const VariableValue = 'VariableValue';

export function isVariableValue(item: unknown): item is VariableValue {
    return reflection.isInstance(item, VariableValue);
}

export interface VE extends AstNode {
    readonly $container: Node;
    readonly $type: 'VE';
    comms: Array<Command>
    target: string
}

export const VE = 'VE';

export function isVE(item: unknown): item is VE {
    return reflection.isInstance(item, VE);
}

export type StpaAstType = {
    ActionUCAs: ActionUCAs
    Command: Command
    ContConstraint: ContConstraint
    Context: Context
    Graph: Graph
    Hazard: Hazard
    HazardList: HazardList
    Loss: Loss
    LossScenario: LossScenario
    Model: Model
    Node: Node
    Responsibility: Responsibility
    Resps: Resps
    Rule: Rule
    SafetyConstraint: SafetyConstraint
    SystemConstraint: SystemConstraint
    UCA: UCA
    VE: VE
    Variable: Variable
    VariableValue: VariableValue
}

export class StpaAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['ActionUCAs', 'Command', 'ContConstraint', 'Context', 'Graph', 'Hazard', 'HazardList', 'Loss', 'LossScenario', 'Model', 'Node', 'Responsibility', 'Resps', 'Rule', 'SafetyConstraint', 'SystemConstraint', 'UCA', 'VE', 'Variable', 'VariableValue'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Responsibility:refs': {
                return SystemConstraint;
            }
            case 'SystemConstraint:refs': {
                return Hazard;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'ActionUCAs': {
                return {
                    name: 'ActionUCAs',
                    mandatory: [
                        { name: 'ucas', type: 'array' }
                    ]
                };
            }
            case 'ContConstraint': {
                return {
                    name: 'ContConstraint',
                    mandatory: [
                        { name: 'refs', type: 'array' }
                    ]
                };
            }
            case 'Context': {
                return {
                    name: 'Context',
                    mandatory: [
                        { name: 'values', type: 'array' },
                        { name: 'vars', type: 'array' }
                    ]
                };
            }
            case 'Graph': {
                return {
                    name: 'Graph',
                    mandatory: [
                        { name: 'nodes', type: 'array' }
                    ]
                };
            }
            case 'Hazard': {
                return {
                    name: 'Hazard',
                    mandatory: [
                        { name: 'refs', type: 'array' },
                        { name: 'subComps', type: 'array' }
                    ]
                };
            }
            case 'HazardList': {
                return {
                    name: 'HazardList',
                    mandatory: [
                        { name: 'refs', type: 'array' }
                    ]
                };
            }
            case 'Model': {
                return {
                    name: 'Model',
                    mandatory: [
                        { name: 'allUCAs', type: 'array' },
                        { name: 'controllerConstraints', type: 'array' },
                        { name: 'hazards', type: 'array' },
                        { name: 'losses', type: 'array' },
                        { name: 'responsibilities', type: 'array' },
                        { name: 'rules', type: 'array' },
                        { name: 'safetyCons', type: 'array' },
                        { name: 'scenarios', type: 'array' },
                        { name: 'systemLevelConstraints', type: 'array' }
                    ]
                };
            }
            case 'Node': {
                return {
                    name: 'Node',
                    mandatory: [
                        { name: 'actions', type: 'array' },
                        { name: 'feedbacks', type: 'array' },
                        { name: 'inputs', type: 'array' },
                        { name: 'outputs', type: 'array' },
                        { name: 'variables', type: 'array' }
                    ]
                };
            }
            case 'Responsibility': {
                return {
                    name: 'Responsibility',
                    mandatory: [
                        { name: 'refs', type: 'array' }
                    ]
                };
            }
            case 'Resps': {
                return {
                    name: 'Resps',
                    mandatory: [
                        { name: 'responsiblitiesForOneSystem', type: 'array' }
                    ]
                };
            }
            case 'Rule': {
                return {
                    name: 'Rule',
                    mandatory: [
                        { name: 'contexts', type: 'array' }
                    ]
                };
            }
            case 'SafetyConstraint': {
                return {
                    name: 'SafetyConstraint',
                    mandatory: [
                        { name: 'refs', type: 'array' }
                    ]
                };
            }
            case 'SystemConstraint': {
                return {
                    name: 'SystemConstraint',
                    mandatory: [
                        { name: 'refs', type: 'array' },
                        { name: 'subComps', type: 'array' }
                    ]
                };
            }
            case 'Variable': {
                return {
                    name: 'Variable',
                    mandatory: [
                        { name: 'values', type: 'array' }
                    ]
                };
            }
            case 'VE': {
                return {
                    name: 'VE',
                    mandatory: [
                        { name: 'comms', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new StpaAstReflection();
