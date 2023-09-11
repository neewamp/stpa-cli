from UCA import *
import pandas as pd
import openpyxl as xl
from openpyxl.utils.dataframe import dataframe_to_rows
import json 

def df_to_excel(df, ws, header=True, index=True, startrow=0, startcol=0):
    """Write DataFrame df to openpyxl worksheet ws"""

    rows = dataframe_to_rows(df, header=header, index=index)

    for r_idx, row in enumerate(rows, startrow + 1):
        for c_idx, value in enumerate(row, startcol + 1):
            try: 
                ws.cell(row=r_idx, column=c_idx).value = value
            except:
                pass
#rule_json: str = '{"name":"RL2","control_action":"ABORT_Signal_Weapon_Controller","type":"provided","system":"Weapon_Abort_Controller","contexts":[{"name":"UCA5","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","True"]},{"name":"UCA6","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","False"]},{"name":"UCA7","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","Unknown"]},{"name":"UCA8","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","True"]},{"name":"UCA9","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","False"]},{"name":"UCA10","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","Unknown"]},{"name":"UCA11","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","True"]},{"name":"UCA12","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","False"]},{"name":"UCA13","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","Unknown"]},{"name":"UCA14","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","True"]},{"name":"UCA15","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","False"]},{"name":"UCA16","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","Unknown"]},{"name":"UCA17","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","True"]},{"name":"UCA18","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","False"]},{"name":"UCA19","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","Unknown"]},{"name":"UCA20","hazard_list":["H1","H4"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","True"]},{"name":"UCA21","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","False"]},{"name":"UCA22","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","Unknown"]},{"name":"UCA23","hazard_list":["H1","H4"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["True","False","False"]},{"name":"UCA24","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["True","False","Unknown"]}]}'
try: 
    rule_json: str = input()
    rule: Rule = Rule.from_json(rule_json)
    # Just testing pandas and excel 

    """ print(df.to_string()) """
    print("Succesfully parsed rule named: ", rule.name)
except:
    print("Failed to parse rule")


df = rule_to_df(rule)
""" df.drop('contexts', axis=1, inplace=True) """
print(df.to_string())
context_df = contexts_to_df(rule.contexts)
with pd.ExcelWriter("output_excel/out" + rule.name + ".xlsx") as writer:  
    df.to_excel(writer, index=False)
    context_df.to_excel(writer, sheet_name='Context-Table', index=False)

""" wb = xl.Workbook() """
""" df_to_excel(df, wb.active) """

""" ws1 = wb.create_sheet("Context-Table")  """
""" df_to_excel(context_df, ws1) """
""" print(context_df.to_string()) """

""" wb.save("output_excel/out" + rule.name + ".xlsx") """
