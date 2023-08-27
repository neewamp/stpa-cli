import {PythonShell} from 'python-shell';
import {System, UCA} from '../compiler/control'
let pyshell = new PythonShell('./solver-aided-stpa/json-interface.py');

// sends a message to the Python script via stdin
/* pyshell.send('hello'); */

/* shell.send({ command: "do_stuff", args: [1, 2, 3] }); */
/* let uca_json_ex1: any = '{"action":{"qualifier":null,"name":"Action1"},"type":"issued","context":{"op":"MULT","e1":{"i":10},"e2":{"i":1}}}'
let uca_json_ex2: any = '{"action":{"qualifier":null,"name":"Action2"},"type":"issued","context":{"op":"MULT","e1":{"i":10},"e2":{"i":1}}}'
pyshell.send(uca_json_ex1) */
let ex_system_json_1 = 
 '{"name": "sys", "types": [{"name": "DryOrWet", "elements": ["dry", "wet"]}], "vars": [], "invariants": [{"op": "WHEN", "e1": {"op": "AND", "e1": {"op": "AND", "e1": "true", "e2": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "aircraft"}, "name": "landing"}}, "e2": {"op": "EQ", "e1": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "environment"}, "name": "runway_status"}, "e2": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "dry"}}}, "e2": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "wheels"}, "name": "weight_on_wheels"}}], "actions": [], "components": [{"name": "aircraft", "types": [], "vars": [{"name": "landing", "ty": "bool"}], "invariants": [], "actions": [{"name": "hit_brakes", "allowed": [{"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "aircraft"}, "name": "landing"}], "required": []}], "components": []}, {"name": "environment", "types": [], "vars": [{"name": "runway_status", "ty": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "DryOrWet"}}], "invariants": ["true"], "actions": [], "components": []}, {"name": "wheels", "types": [], "vars": [{"name": "weight_on_wheels", "ty": "bool"}], "invariants": [], "actions": [], "components": []}]}'

let ex_system_1: System = JSON.parse(ex_system_json_1)

let ex_uca_json_1 = 
  '{"action": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "aircraft"}, "name": "hit_brakes"}, "type": "issued", "context": {"op": "NOT", "e": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "wheels"}, "name": "weight_on_wheels"}}}'
let ex_uca_1: UCA = JSON.parse(ex_uca_json_1)

let ex_uca_json_2 = 
  '{"action": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "aircraft"}, "name": "hit_brakes"}, "type": "not issued", "context": {"qualifier": {"qualifier": {"qualifier": null, "name": "sys"}, "name": "aircraft"}, "name": "landing"}}'
let ex_uca_2: UCA = JSON.parse(ex_uca_json_2)

pyshell.send(JSON.stringify(ex_system_1))
pyshell.send(JSON.stringify(ex_uca_1))
pyshell.send(JSON.stringify(ex_uca_2))
pyshell.send("LAST_UCA")
// TODO collect error message recent message in case of error
let errors 
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