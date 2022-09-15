import { IHydratedController } from "@aurelia/runtime-html";

export class BasePage {
    public attaching(initiator: IHydratedController) {
        initiator.host.classList.add("animating");
        setTimeout(() => {
            initiator.host.classList.remove("animating");
        }, 250);
        const animation = initiator.host.animate(
            [{ opacity: '0' }, { opacity: '0' }, { opacity: '1' }],
            { duration: 200 },
        );
    }

    public detaching(initiator: IHydratedController) {
        initiator.host.classList.add("animating");
        setTimeout(() => {
            initiator.host.classList.remove("animating");
        }, 100);
        const animation = initiator.host.animate(
            [{ opacity: '1' }, { opacity: '0' }],
            { duration: 100 },
        );
        return animation.finished;
    }
}