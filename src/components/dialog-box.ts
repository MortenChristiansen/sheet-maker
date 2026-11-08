import { bindable, INode, resolve } from "aurelia";

export class DialogBox {
    @bindable title: string;
    @bindable size: "s" | "m" = "m";
    @bindable showFooter: boolean = true;

    private host = resolve(INode) as HTMLElement;

    attaching() {
      document.body.classList.add("disable-scrolling");
        const animation = this.host.animate(
          [{ transform: 'scale(0.8)', opacity: '0' }, { transform: 'scale(1)', opacity: '1' }],
          { duration: 200 },
        );
        return animation.finished;
      }
    
      detaching() {
        document.body.classList.remove("disable-scrolling");
        const animation = this.host.animate(
          [{ transform: 'scale(1)', opacity: '1' }, { transform: 'scale(0.8)', opacity: '0' }],
          { duration: 200 },
        );
        return animation.finished;
      }
}