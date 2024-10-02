import {AbstractSearchOperator} from "./AbstractSearchOperator";
import {SearchOperation} from "../SearchOperation";
import {QueryTree} from "../QueryTree";

/**
 * This class allows you to add and remove operators to allow more flexible grouping.
 */
export abstract class AbstractSqlOperatorGroup<T> {
    private operators: Map<SearchOperation, AbstractSearchOperator<T>>;
    private operatorMapping: Map<string, SearchOperation>;
    constructor() {
        this.operators = new Map<SearchOperation, AbstractSearchOperator<T>>();
        this.operatorMapping = new Map<string, SearchOperation>();
        this.initiateOperators();
    }

    /**
     * Gets the search operation by the given string.
     * @param operator The operator to use to find the search operation.
     */
    public getSearchOperator(operator: string): AbstractSearchOperator<T> | null {
        const searchOperation: SearchOperation | undefined = this.operatorMapping.get(operator);
        if (searchOperation === undefined || !this.operators.has(searchOperation)) {
            return null;
        }

        // @ts-ignore This is just an incorrect warning.
        return this.operators.get(searchOperation);
    }

    /**
     * Adds an operator to the mappings.
     * @param operator The operator to add.
     * @protected
     */
    protected addOperator(operator: AbstractSearchOperator<T>): void {
        this.operatorMapping.set(operator.getOperationString(), operator.getOperation());
        this.operators.set(operator.getOperation(), operator);
    }

    /**
     * Initiates the operators map.
     * @protected
     */
    protected abstract initiateOperators(): void;

    /**
     * Creates the query using the current node.
     * @param currentNode The current node to use.
     */
    public formulateQuery(currentNode: QueryTree<T, this> | null): T | null {
        if (currentNode === null) {
            return null;
        }

        // Now see what the expression should be.
        const nextNode: QueryTree<T, this> | null = currentNode.getNextNode();
        const currentExpression: T | null = currentNode.getQuery();
        const nextExpression: T | null = this.formulateQuery(nextNode);
        if (nextExpression === null) {
            return currentExpression;
        }
        if (currentExpression === null) {
            return nextExpression;
        }
        return this.concatenateOperations(currentExpression, nextExpression)
    }

    /**
     * Puts the two queries together in whatever way you want.
     * @param currentQuery
     * @param nextQuery
     * @protected
     */
    protected abstract concatenateOperations(currentQuery: T, nextQuery: T): T | null;
}