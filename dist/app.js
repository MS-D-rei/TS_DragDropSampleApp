"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length != 0;
    }
    if (validatableInput.minLength != undefined &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid &&
                validatableInput.value.toString().trim().length >=
                    validatableInput.minLength;
    }
    if (validatableInput.maxLength != undefined &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid &&
                validatableInput.value.toString().trim().length <=
                    validatableInput.maxLength;
    }
    if (validatableInput.min != undefined &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != undefined &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
class ProjectInput {
    templateElement;
    hostElement;
    element;
    titleInputElement;
    descriptionInputElement;
    peopleInputElement;
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedContent = document.importNode(this.templateElement.content, true);
        this.element = importedContent.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
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
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement);
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
