import {PythonShell} from 'python-shell';
import {myRule, myContext} from '../compiler/UCA'
import { promisify } from 'util';

let rule_json = '{"name":"RL2","control_action":"ABORT_Signal_Weapon_Controller","type":"provided","system":"Weapon_Abort_Controller","contexts":[{"name":"UCA5","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","True"]},{"name":"UCA6","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","False"]},{"name":"UCA7","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","True","Unknown"]},{"name":"UCA8","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","True"]},{"name":"UCA9","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","False"]},{"name":"UCA10","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","False","Unknown"]},{"name":"UCA11","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","True"]},{"name":"UCA12","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","False"]},{"name":"UCA13","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["False","Unknown","Unknown"]},{"name":"UCA14","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","True"]},{"name":"UCA15","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","False"]},{"name":"UCA16","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","True","Unknown"]},{"name":"UCA17","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","True"]},{"name":"UCA18","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","False"]},{"name":"UCA19","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","False","Unknown"]},{"name":"UCA20","hazard_list":["H1","H4"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","True"]},{"name":"UCA21","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","False"]},{"name":"UCA22","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["Unknown","Unknown","Unknown"]},{"name":"UCA23","hazard_list":["H1","H4"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["True","False","False"]},{"name":"UCA24","hazard_list":["H1"],"vars":["Safe_Separation","Abort_Command_Recieved","Target_Class_MissMatch"],"values":["True","False","Unknown"]}]}'

// DO something if this fails
let rule: myRule = JSON.parse(rule_json)


export function sendRule(rule: myRule): void {
    let pyshell = new PythonShell('./src/compiler/json-interface.py');
    pyshell.send(JSON.stringify(rule))

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
      });
      
      
      // end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
      });
      
}
export function sendRules(rules: myRule[]): void {
    let pyshell = new PythonShell('./src/compiler/json-interface.py');
    pyshell.send(JSON.stringify(rules))

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        console.log(message);
      });
      
      
      // end the input stream and allow the process to exit
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
      });
      
}


// sendRule(rule)
