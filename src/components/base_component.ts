// namespace App {
// Base Class, Component
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    isInsertAtStart: boolean,
    newElementId?: string
  ) {
    // Select template to render
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    // Set starting point
    this.hostElement = document.getElementById(hostElementId)! as T;

    // copy the content of the template
    const importedContent = document.importNode(
      this.templateElement.content,
      true
    );
    // Add id to the selected section
    this.element = importedContent.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(isInsertAtStart);
  }

  // Attach the frame of the selected section on the starting point
  private attach(isInsertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      isInsertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
// }
