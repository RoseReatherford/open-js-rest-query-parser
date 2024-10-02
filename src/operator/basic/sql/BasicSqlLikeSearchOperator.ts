import {AbstractSearchOperator} from "../../AbstractSearchOperator";
import {SearchOperation} from "../../../SearchOperation";

/**
 * The basic SQL operator for "=".
 */
export class BasicSqlLikeSearchOperator extends AbstractSearchOperator<string> {
    constructor() {
        super(SearchOperation.LIKE, "~");
    }

    public createQuery(key: string, value: string): string {
        return `${key} LIKE %${value}%`;
    }
}