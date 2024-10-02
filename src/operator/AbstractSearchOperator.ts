import {SearchOperation} from "../SearchOperation";

export abstract class AbstractSearchOperator<T> {
    protected operation: SearchOperation;
    protected strOperation: string;

    constructor(operation: SearchOperation, strOperation: string) {
        if (operation === null || operation === undefined) {
            throw new Error("Operation must be defined.")
        }

        this.operation = operation;
        this.strOperation = strOperation;
    }

    public getOperation(): SearchOperation {
        return this.operation;
    }

    public getOperationString(): string {
        return this.strOperation;
    }

    /**
     * An abstract class where a query is implemented using the given information.
     */
    public abstract createQuery(key: string, value: string): T;
}