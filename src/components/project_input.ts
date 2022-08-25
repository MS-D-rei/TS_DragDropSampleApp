/* /// <reference path="base_component.ts"/> */
/* /// <reference path="../utils/validation.ts" /> */
/* /// <reference path="../decorators/autobind.ts" /> */
/* /// <reference path="../state/project_state.ts" /> */

import Component from "./base_component.js";
import { projectState } from "../state/project_state.js";
import * as Validation from "../utils/validation.js";
import { AutoBind } from "../decorators/autobind.js";

// namespace App {
// Class Project Input
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    // Contain all reaction when the submit button is pressed.
    this.configure();
    // Component class has this method
    // Attach the frame of the input form on the starting point (app afterbegin)
    // this.attach();
  }

  // Now the base class, Component has this method
  // private attach() {
  //   this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  // }

  configure() {
    this.element.addEventListener("submit", this.submitHandler); // if submitHandler is executed without autobind, 'this' of this function will be used.
  }

  renderContent(): void {}

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

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidationConfig: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidationConfig: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidationConfig: Validation.Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !Validation.validate(titleValidationConfig) ||
      !Validation.validate(descriptionValidationConfig) ||
      !Validation.validate(peopleValidationConfig)
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
}
// }
