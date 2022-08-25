/* /// <reference path="base_component.ts"/> */
/* /// <reference path="../models/drag_drop.ts" /> */
/* /// <reference path="../models/project.ts" /> */
/* /// <reference path="../decorators/autobind.ts" /> */
/* /// <reference path="../state/project_state.ts" /> */

import Component from "./base_component.js";
import { ProjectItem } from "./project_item.js";
import { projectState } from "../state/project_state.js";
import { DragTarget } from "../models/drag_drop.js";
import { Project, ProjectStatus } from "../models/project.js";
import { AutoBind } from "../decorators/autobind.js";

// namespace App {
// Class Project List
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    // this.attach(); /* now this move to the base class, Component */
    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    // Add stock of function call for when adding new project.
    projectState.addListener((projects: Project[]) => {
      // Select which project list
      const relevantProjects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      // Render all projects in the selected list
      this.renderProjects();
    });
  }

  // Add id to ul and render title of the project list
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }
  @AutoBind
  dropHandler(event: DragEvent): void {
    console.log(event);
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @AutoBind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  // Before this Fn is called, renderContent() will be called, so can use this.type-project id.
  private renderProjects() {
    // Identify which project's Unorder List to render
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    // To avoid duplication, clean all rendered contents before rendering all projects.
    listEl.innerHTML = "";
    // Add all projects with 'li' element to 'ul'
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }

  // Now base class contains this method
  // private attach() {
  //   this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
  // }
}
// }
