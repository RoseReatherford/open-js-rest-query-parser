import {AbstractSearchOperator} from "./operator/AbstractSearchOperator";
import {AbstractSqlOperatorGroup} from "./operator/AbstractSqlOperatorGroup";

export class QueryTree<U, T extends AbstractSqlOperatorGroup<U>> {
    private nextNode?: QueryTree<U, T>;
    private readonly isRoot: boolean;
    private key: string;
    private value: string;
    private operator: AbstractSearchOperator<U> | null;
    private operators: T;


    /**
     * Creates a new query tree using the given expressions.
     * @param expressions A list of expressions to parse into a tree.
     * @param isRoot True if this is the root node, false otherwise.
     * @param operators
     * @constructor QueryTree
     */
    constructor(expressions: string[][], isRoot: boolean, operators: T) {
        this.isRoot = isRoot;
        this.operators = operators;
        const expression: string[] | undefined = expressions.pop();
        if (expressions.length > 0) this.nextNode = new QueryTree(expressions, false, operators);
        this.parseExpression(expression);
    }

    /**
     * Parses the given expression and keeps it on itself.
     * @param expression The expression to parse.
     * @protected
     */
    protected parseExpression(expression?: string[] | undefined): void {
        if (expression === undefined) {
            return;
        }

        this.key = expression[0];
        this.value = expression[2];
        this.operator = this.operators.getSearchOperator(expression[1]);
    }

    /**
     * Gets the query for this node.
     * @public
     */
    public getQuery(): U | null {
        if (this.operator === null || this.operator === undefined) {
            return null;
        }
        return this.operator.createQuery(this.key, this.value);
    }

    /**
     * Gets the next node in the chain, if there is one. Null, otheriwse.
     */
    public getNextNode(): QueryTree<U, T> | null {
        if (this.nextNode === null || this.nextNode === undefined) {
            return null;
        }
        return this.nextNode;
    }
}