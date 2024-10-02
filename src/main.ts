import {ParseQuery} from "./ParseQuery";
import {BasicSqlOperatorGroup} from "./operator/basic/sql/BasicSqlOperatorGroup";

const query: ParseQuery<string> = new ParseQuery<string>("age>25;name:john;age<35", new BasicSqlOperatorGroup());
console.log(query.parse());