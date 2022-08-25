/* /// <reference path="base_component.ts"/> */
/* /// <reference path="../models/drag_drop.ts"/> */
/* /// <reference path="../models/project.ts" /> */
/* /// <reference path="../decorators/autobind.ts" /> */
/* /// <reference path="../state/project_state.ts" /> */

import Component from "./base_component.js";
import { Draggable } from "../models/drag_drop.js";
import { Project } from "../models/project.js";
import { AutoBind } from "../decorators/autobind.js";

// namespace App {
// Class Project Item
// Single project block and render it
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @AutoBind
  dragEndHandler(event: DragEvent): void {
    console.log("dragend");
  }
}
// }
