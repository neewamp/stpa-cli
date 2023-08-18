//import { ValidationAcceptor, ValidationChecks } from 'langium';
// import { StpaAstType} from './generated/ast';
import type { StpaServices } from './stpa-module';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: StpaServices) {
    //const registry = services.validation.ValidationRegistry;
    //const validator = services.validation.StpaValidator;
    //const checks = {};
    /* const checks: ValidationChecks<StpaAstType> = {
        Person: validator.checkPersonStartsWithCapital
    }; */
    //registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class StpaValidator {

    /* checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    } */

}
