/*
 * KIELER - Kiel Integrated Environment for Layout Eclipse RichClient
 *
 * http://rtsys.informatik.uni-kiel.de/kieler
 *
 * Copyright 2021 by
 * + Kiel University
 *   + Department of Computer Science
 *     + Real-Time and Embedded Systems Group
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 */

grammar Stpa

entry Model:
    ('Losses' losses+=Loss*)?
    ('Hazards' hazards+=Hazard*)?
    ('SystemConstraints' systemLevelConstraints+=SystemConstraint*)?
    ('ControlStructure' controlStructure=Graph)?
    ('Responsibilities' responsibilities+=Resps*)?
    (('UCAs' allUCAs+=ActionUCAs*) | ('Context-Table' rules+=Rule*))?
    ('ControllerConstraints' controllerConstraints+=ContConstraint*)?
    ('LossScenarios' scenarios+=LossScenario*)?
    ('SafetyRequirements' safetyCons+=SafetyConstraint*)?;

Rule:
    name=ID '{'
        'controlAction:' system=ID '.' action=ID
        'type:' type=('not-provided' | 'provided' | 'too-late' | 'too-early' | 'wrong-time' | 'applied-too-long' | 'stopped-too-soon')
        'contexts:' '{'
            contexts+=Context*
        '}'
    '}';

Context:
    name=ID '['vars+=ID '=' values+=QualifiedName (',' vars+=ID '=' values+=QualifiedName)*']' 
    list=HazardList;

Loss:
    name=ID description=STRING;

Hazard:
    name=SubID description=STRING 
    ('['refs+=ID (',' refs+=ID)*']')?
    ('{' (header=STRING? subComps+=Hazard+)*'}')?;

SystemConstraint:
    name=SubID description=STRING 
    '[' 
    refs+=[Hazard:SubID] (',' refs+=[Hazard:SubID])*
    ']'
    ('{' (header=STRING? subComps+=SystemConstraint+)*'}')?;

Graph:
    name=ID '{'(nodes+=Node /* | edges+=Edge */)*'}';

Node:
    name=ID '{'
        ('hierarchyLevel' level = INT)?
        ('label' label=STRING)?
        ('processModel' '{'variables+=Variable*'}')?
        ('input' '[' inputs+=Command (',' inputs+=Command)* ']')?
        ('output' '[' outputs+=Command (',' outputs+=Command)* ']')?
        ('controlActions' '{'actions+=VE*'}')?
        ('feedback' '{'feedbacks+=VE*'}')?
    '}';

/* Edge:
    name=ID '{'
        source=[Node] '->' target=[Node]
        ('label' label=STRING)?
    '}'; */

Variable:
    name=ID':' '['values+=VariableValue (',' values+=VariableValue)*']';

VariableValue:
    name=QualifiedName (operator=('!='|'=') '[' firstValue=(QualifiedName | INT | 'MIN' | 'true' | 'false') (',' secondValue=(QualifiedName | INT | 'MAX'))? ']')?;

VE:
    '[' comms+=Command (',' comms+=Command)* ']' '->' target=ID;

Command:
    name=ID label=STRING;

Resps:
    system=ID '{'responsiblitiesForOneSystem+=Responsibility*'}';

Responsibility:
    name=ID description=STRING '[' 
    refs+=[SystemConstraint:SubID] (',' refs+=[SystemConstraint:SubID])*
    ']';

ActionUCAs:
    system=ID'.'
    action=ID '{'
        'notProviding' '{'ucas+=UCA*'}'
        'providing' '{'ucas+=UCA*'}'
        'tooEarly/Late' '{'ucas+=UCA*'}'
        'stoppedTooSoon' '{'ucas+=UCA*'}'
    '}';

UCA:
    name=ID description=STRING list=HazardList;

ContConstraint:
    name=ID description=STRING '['refs+=ID (',' refs+=ID)*']';

LossScenario:
    (name=ID description=STRING list=HazardList) |
    (name=ID 'for' uca=ID description=STRING (list=HazardList)?);

HazardList:
    '[' refs+=SubID (',' refs+=SubID)*']';

SafetyConstraint:
    name=ID description=STRING '['refs+=ID (',' refs+=ID)*']';

SubID returns string:
    ID('.'INT)*;

QualifiedName returns string:
    ID('-'ID)*;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;