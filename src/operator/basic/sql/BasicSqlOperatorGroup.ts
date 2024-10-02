import {AbstractSqlOperatorGroup} from "../../AbstractSqlOperatorGroup";
import {BasicSqlEquationSearchOperator} from "./BasicSqlEquationSearchOperator";
import {BasicSqlNegationSearchOperator} from "./BasicSqlNegationSearchOperator";
import {BasicSqlLikeSearchOperator} from "./BasicSqlLikeSearchOperator";
import {BasicSqlLessThanSearchOperator} from "./BasicSqlLessThanSearchOperator";
import {BasicSqlGreaterThanSearchOperator} from "./BasicSqlGreaterThanSearchOperator";

export class BasicSqlOperatorGroup extends AbstractSqlOperatorGroup<string> {
    protected initiateOperators(): void {
        this.addOperator(new BasicSqlEquationSearchOperator());
        this.addOperator(new BasicSqlNegationSearchOperator());
        this.addOperator(new BasicSqlLikeSearchOperator());
        this.addOperator(new BasicSqlLessThanSearchOperator());
        this.addOperator(new BasicSqlGreaterThanSearchOperator());
    }

    protected concatenateOperations(currentQuery: string, nextQuery: string): string | null {
        return `${currentQuery} AND ${nextQuery}`;
    }
}