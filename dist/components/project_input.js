var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base_component.js";
import { projectState } from "../state/project_state.js";
import { validate } from "../utils/validation.js";
import { AutoBind } from "../decorators/autobind.js";
export class ProjectInput extends Component {
    titleInputElement;
    descriptionInputElement;
    peopleInputElement;
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement);
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        const titleValidationConfig = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidationConfig = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidationConfig = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidationConfig) ||
            !validate(descriptionValidationConfig) ||
            !validate(peopleValidationConfig)) {
            alert("please input all categories");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project_input.js.map