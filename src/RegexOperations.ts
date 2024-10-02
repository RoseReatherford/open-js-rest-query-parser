export class RegexOperations {
    public static getSearchOperationSplitter(): RegExp {
        return /((\w+)([><:!~])(\w+))/g;
    }
}