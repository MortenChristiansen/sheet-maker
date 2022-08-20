import { updateSmallAvatar } from "../actions/sheetActions";
import { CharacterDescription } from "../types";
import { SubWidget } from "./widget";

export class AvatarSmallBlock extends SubWidget<CharacterDescription, string> {
    constructor() {
        super(state => state.character?.description, b => b.smallAvatar, (m, s) => m.smallAvatar = s, updateSmallAvatar);
    }
}