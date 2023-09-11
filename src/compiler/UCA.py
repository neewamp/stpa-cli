from __future__ import annotations
from dataclasses import dataclass
# MyPy isn't picking up that this adds methods to the classes like from_json
from dataclasses_json import dataclass_json
from functools import reduce
from typing import List, Literal
import pandas as pd

def get_column_names(context: Context) -> List[str]:
    return ['uca'] + context.vars + ["Hazards"]

def flatten(l):
    return [item for sublist in l for item in sublist]

def context_to_df_row(context: Context) -> List[str]:
    return flatten([[context.name], context.values, [' '.join(context.hazard_list)]])

def contexts_to_df(contexts: List[Context]):
    if len(contexts) > 0:
        data = [context_to_df_row(context) for context in contexts]
        columns = get_column_names(contexts[0])
        df = pd.DataFrame(data, columns=columns)
        return df    
    else:
        return pd.DataFrame()

# Data structures for UCAS to match the pasta dsl ast enabling the sending of json and automatic deserialization without handwritten code
@dataclass_json
@dataclass(frozen=True)
class Context:
    hazard_list: List[str]
    name: str
    values: List[Literal["True", "False", "Unknown"]]
    vars: List[str]


def rule_to_df(rule: Rule):
    data = [[rule.name, rule.system + '.' + rule.control_action, rule.type]]
    columns=['Name ', 'Control Action', 'type']
    print(columns)
    print(data)
    df = pd.DataFrame(data, columns=['Name ', 'Control Action', 'type'])
    return df    



@dataclass_json
@dataclass(frozen=True)
class Rule: 
    control_action: str
    contexts: List[Context]    
    name: str
    system: str
    type: Literal['applied-to-long', 'not-provided', 'provided', 'stopped-too-soon', 'too-early', 'too-late', 'wrong-time']


