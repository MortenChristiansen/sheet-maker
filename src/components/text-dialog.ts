import { containerless, IDialogService } from "aurelia";
import { container } from "../main";
import { deepCopy } from "../utils";

export interface TextDialogModel {
    value: string;
    title: string;
}

@containerless
export class TextDialog {
    model: TextDialogModel;

    activate (model: TextDialogModel) {
        this.model = model;
    }

    static open(model: TextDialogModel, onSuccess: () => void) {
        let dialogService = container.get(IDialogService);
        let modelCopy = deepCopy(model);
        dialogService.open({
            component: () => TextDialog,
            overlayDismiss: true,
            model: modelCopy
        }).whenClosed(_ => {
            model.value = modelCopy.value;
            onSuccess();
        });
    }
}