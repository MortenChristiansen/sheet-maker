import { containerless, IDialogService } from "aurelia";
import { container } from "../main";
import { Spell } from "../types";
import { deepCopy } from "../utils";

@containerless
export class SpellDetailsDialog {
    model: Spell;

    activate (model: Spell) {
        this.model = model;
    }

    static open(model: Spell, onSuccess?: () => void) {
        let dialogService = container.get(IDialogService);
        let modelCopy = deepCopy(model);
        dialogService.open({
            component: () => SpellDetailsDialog,
            overlayDismiss: true,
            model: modelCopy
        }).whenClosed(_ => {
            model.focus = modelCopy.focus;
            model.ritual = modelCopy.ritual;
            model.attunement = modelCopy.attunement;
            model.attunementBonus = modelCopy.attunementBonus;
            model.masteries = modelCopy.masteries;
            model.xp = modelCopy.xp;
            if (onSuccess) {
                onSuccess();
            }
        });
    }
}