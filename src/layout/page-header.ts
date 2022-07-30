import { connectTo, StateHistory } from "@aurelia/store-v1";
import { State } from "../types";

@connectTo()
export class PageHeader {
    public state: StateHistory<State>;
}