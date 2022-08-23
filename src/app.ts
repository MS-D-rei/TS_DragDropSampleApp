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

// Class ProjectInput
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

    this.configure();
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
      this.clearInputs();
    }
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler); // when submitHandler is executed, 'this' of this function will be used.
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const prjInput = new ProjectInput();
