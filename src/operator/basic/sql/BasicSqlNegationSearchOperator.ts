import {AbstractSearchOperator} from "../../AbstractSearchOperator";
import {SearchOperation} from "../../../SearchOperation";

/**
 * The basic SQL operator for "=".
 */
export class BasicSqlNegationSearchOperator extends AbstractSearchOperator<string> {
    constructor() {
        super(SearchOperation.NEGATION, "!");
    }

    public createQuery(key: string, value: string): string {
        return `${key} <> ${value}`;
    }
}