import { Project } from "../models/project"
import { ProjectStatus } from "../models/project";

// namespace App {
// Project State Management globally
// Listener and State are used only in this file.
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  // Now has moved to base class, State.
  // addListener(listenerFn: Listener) {
  //   this.listeners.push(listenerFn);
  // }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // Add new project to projects array
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const movedProject = this.projects.find(
      (project) => project.id === projectId
    );
    if (movedProject && movedProject.status != newStatus) {
      movedProject.status = newStatus;
      this.updateListeners();
    }
  }

  // Call function stocks in listeners to react and render all current projects.
  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // slice is for passing copy of Array of current all projects
    }
  }
}
// Make sure only one state (Singleton)
export const projectState = ProjectState.getInstance();
// }
