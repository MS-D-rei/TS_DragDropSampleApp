// Decorator AutoBind
function AutoBind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // 'this' indicates the class attached
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

// Project Type
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project State Management globally
type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

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
    // Call function stocks in listeners to react and render all current projects.
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // slice is for passing copy of Array of current all projects
    }
  }
}
// Make sure only one state (Singleton)
const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length != 0;
  }
  if (
    validatableInput.minLength != undefined &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid &&
      validatableInput.value.toString().trim().length >=
        validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != undefined &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid &&
      validatableInput.value.toString().trim().length <=
        validatableInput.maxLength;
  }
  if (
    validatableInput.min != undefined &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != undefined &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

// Class Project List
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  sectionElement: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    // Select template to render
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    // Set starting point
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    // copy the content of the template
    const importedContent = document.importNode(
      this.templateElement.content,
      true
    );

    // Add id to the selected section
    this.sectionElement = importedContent.firstElementChild as HTMLElement;
    this.sectionElement.id = `${this.type}-projects`;

    // Add stock of function call for when adding new project.
    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    // Attach the frame of the selected section on the starting point
    this.attach();
    // Add id to ul and title of the project list
    this.renderContent();
  }

  // Before this Fn is called, renderContent() will be called, so can use this.type-project id.
  //
  private renderProjects() {
    // Identify which project's Unorder List to render
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    // Add all projects with 'li' element to 'ul'
    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = projectItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.sectionElement.querySelector("ul")!.id = listId;
    this.sectionElement.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "Projects";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
  }
}

// Class Project Input
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedContent.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    this.titleInputElement = this.formElement.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement;

    // Contain all reaction when the submit button is pressed.
    this.configure();
    // Attach the frame of the input form on the starting point (app afterbegin)
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidationConfig: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidationConfig: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidationConfig: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !validate(titleValidationConfig) ||
      !validate(descriptionValidationConfig) ||
      !validate(peopleValidationConfig)
    ) {
      alert("please input all categories");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind // give this(ProjectInput in this case) to this here
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement); // if not bind, this 'this' will be event (form in this case)
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      // Add this project to the global project state.
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler); // when submitHandler is executed, 'this' of this function will be used.
  }

  //
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const prjInput = new ProjectInput();

const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
