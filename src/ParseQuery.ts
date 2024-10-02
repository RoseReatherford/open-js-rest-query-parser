import {RegexOperations} from "./RegexOperations";
import {QueryTree} from "./QueryTree";
import {AbstractSqlOperatorGroup} from "./operator/AbstractSqlOperatorGroup";

export class ParseQuery<U> {
    private readonly originalQuery: string | null;
    private tree?: QueryTree<U, AbstractSqlOperatorGroup<U>>;
    private operator: AbstractSqlOperatorGroup<U>;

    /**
     * Creates a new parser for the given query.
     * @param query The query to parse.
     * @param operatorGroup The operator to use for this.
     * @constructor ParseQuery
     */
    constructor(query: string, operatorGroup: AbstractSqlOperatorGroup<U>) {
        this.originalQuery = query;
        this.operator = operatorGroup;
        const expressions: string[][] = [];
        const regex = RegexOperations.getSearchOperationSplitter();
        let testExpression: RegExpExecArray | null;

        while((testExpression = regex.exec(this.originalQuery)) !== null) {
            const expression: string[] = [];
            let value: string;
            // We ignore the first two expressions as they concatenate the results.
            for (let i = 2; i < testExpression.length; i++) {
                value = testExpression[i];
                expression.push(value);
            }
            expressions.push(expression);
        }

        this.tree = new QueryTree<U, AbstractSqlOperatorGroup<U>>(expressions, true, operatorGroup);
    }

    /**
     * Parses the expression
     */
    public parse(): U | null {
        if (this.tree === undefined || this.tree === null) {
            return null;
        }
        return this.operator.formulateQuery(this.tree);
    }

}