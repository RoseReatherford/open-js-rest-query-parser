import {AbstractSearchOperator} from "../../AbstractSearchOperator";
import {SearchOperation} from "../../../SearchOperation";

/**
 * The basic SQL operator for "=".
 */
export class BasicSqlLessThanSearchOperator extends AbstractSearchOperator<string> {
    constructor() {
        super(SearchOperation.LESS_THAN, "<");
    }

    public createQuery(key: string, value: string): string {
        return `${key} < ${value}`;
    }
}