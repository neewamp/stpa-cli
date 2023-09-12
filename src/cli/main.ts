import chalk from 'chalk';
import { Command } from 'commander';
import { Model, Rule, isModel } from '../language/generated/ast';
import { StpaLanguageMetaData } from '../language/generated/module';
import { createStpaServices } from '../language/stpa-module';
import { extractAstNode } from './cli-util';
import { extractDocument } from './cli-util';
import { generateJavaScript } from './generator';
import { NodeFileSystem } from 'langium/node';
import { AstNode } from 'langium';
import { myContext, myRule, rule_to_myRule } from '../compiler/UCA';
import { sendRule, sendRules } from './uca-table-interface';
import { PythonShellError } from 'python-shell';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createStpaServices(NodeFileSystem).Stpa;
    const model = await extractAstNode<Model>(fileName, services);
    const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};



/**
 * Parse and validate a program written in our language.
 * Verifies that no lexer or parser errors occur.
 * Implicitly also checks for validation errors while extracting the document
 *
 * @param fileName Program to validate
 */
export const parseAndValidate = async (fileName: string): Promise<void> => {
    // retrieve the services for our language
    const services = createStpaServices(NodeFileSystem).Stpa;
    // extract a document for our program
    const document = await extractDocument(fileName, services);
    // extract the parse result details
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 && 
        parseResult.parserErrors.length === 0
    ) {
        console.log(chalk.green(`Parsed and validated ${fileName} successfully!`));
    } else {
        console.log(chalk.red(`Failed to parse and validate ${fileName}!`));
        process.exit(-1);
    }
    const ast: AstNode = parseResult.value;

    if(isModel(ast)){
       let myRules: myRule[] = ast.rules.map(rule_to_myRule)
       sendRules(myRules)
/*     for(var rule of ast.rules) {
            try { 
                sendRule(rule_to_myRule(rule))
            }
            catch(error: any) {
                console.log(`Problem running send rule with rule named: ${rule.name}`)
                console.log(error.message)
            } 
        } 
*/
        console.log('sdf')
    } 
    else {
        process.exit(1);
    }
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = StpaLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);


    program
        .command('parseAndValidate')
        .argument('<file>', 'Source file to parse & validate (ending in ${fileExtensions})')
        .description('Indicates where a program parses & validates successfully, but produces no output code')
        .action(parseAndValidate) // we'll need to implement this function        
        
    program.parse(process.argv);
}
