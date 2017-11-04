import * as $ from "jquery";
import { IDragSourceConfig } from "../../ui/draggables/IDragSourceConfig";
import { DragManager } from "../../ui/draggables/dragManager";


export class DragSource {
    private dragManager: DragManager;

    public element: HTMLElement;
    public configuration: IDragSourceConfig;
    public initialOffsetX: number;
    public initialOffsetY: number;

    constructor(element: HTMLElement, config: IDragSourceConfig, dragManager: DragManager) {
        this.element = element;
        this.configuration = config;
        this.dragManager = dragManager;

        this.onPointerDown = this.onPointerDown.bind(this);

        element.addEventListener("pointerdown", this.onPointerDown);
    }

    private onPointerDown(event: PointerEvent): void {
        var targetElement = event.target as HTMLElement;


        if (this.configuration.preventDragging && this.configuration.preventDragging(targetElement)) {
            return;
        }

        if (event.buttons !== 1 || event["handled"]) {
            return;
        }

        if (event.pointerType === "touch") {
            debugger;
        }

        event["handled"] = true;

        this.initialOffsetX = event.offsetX;
        this.initialOffsetY = event.offsetY;

        this.dragManager.onPointerDown(this);
    }
}