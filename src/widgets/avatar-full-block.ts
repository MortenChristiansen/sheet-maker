import { updateFullAvatar } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { SubWidget } from "./widget";

export class AvatarFullBlock extends SubWidget<CharacterDescription, string> {
    constructor() {
        super(state => state.character?.description, b => b.fullAvatar, (m, s) => m.fullAvatar = s, updateFullAvatar);
    }
}