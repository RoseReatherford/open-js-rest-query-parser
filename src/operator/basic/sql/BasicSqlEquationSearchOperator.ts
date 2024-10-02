import {AbstractSearchOperator} from "../../AbstractSearchOperator";
import {SearchOperation} from "../../../SearchOperation";

/**
 * The basic SQL operator for "=".
 */
export class BasicSqlEquationSearchOperator extends AbstractSearchOperator<string> {
    constructor() {
        super(SearchOperation.EQUALITY, ":");
    }

    public createQuery(key: string, value: string): string {
        return `${key} = ${value}`;
    }
}