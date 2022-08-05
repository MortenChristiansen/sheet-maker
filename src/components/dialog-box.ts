import { bindable, inject } from "aurelia";

@inject(Element)
export class DialogBox {
    @bindable title: string;
    @bindable size: "s" | "m" = "m";

    constructor(private host: Element) {
    }

    attaching() {
        const animation = this.host.animate(
          [{ transform: 'scale(0.8)', opacity: '0' }, { transform: 'scale(1)', opacity: '1' }],
          { duration: 200 },
        );
        return animation.finished;
      }
    
      detaching() {
        const animation = this.host.animate(
          [{ transform: 'scale(1)', opacity: '1' }, { transform: 'scale(0.8)', opacity: '0' }],
          { duration: 200 },
        );
        return animation.finished;
      }
}