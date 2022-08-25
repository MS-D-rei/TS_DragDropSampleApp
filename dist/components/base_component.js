export class Component {
    templateElement;
    hostElement;
    element;
    constructor(templateId, hostElementId, isInsertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedContent = document.importNode(this.templateElement.content, true);
        this.element = importedContent.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(isInsertAtStart);
    }
    attach(isInsertAtStart) {
        this.hostElement.insertAdjacentElement(isInsertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base_component.js.map