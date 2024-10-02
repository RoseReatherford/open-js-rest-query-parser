import {AbstractSearchOperator} from "../../AbstractSearchOperator";
import {SearchOperation} from "../../../SearchOperation";

/**
 * The basic SQL operator for "=".
 */
export class BasicSqlGreaterThanSearchOperator extends AbstractSearchOperator<string> {
    constructor() {
        super(SearchOperation.GREATER_THAN, ">");
    }

    public createQuery(key: string, value: string): string {
        return `${key} > ${value}`;
    }
}