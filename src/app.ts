/* /// <reference path="./state/project_state.ts" /> */
/* /// <reference path="./components/base_component.ts" /> */
/* /// <reference path="./components/project_input.ts" /> */
/* /// <reference path="./components/project_item.ts" /> */
/* /// <reference path="./components/project_list.ts"/> */
/* /// <reference path="./utils/validation.ts" /> */
/* /// <reference path="./decorators/autobind.ts" /> */
/* /// <reference path="./models/drag_drop.ts" /> */
/* /// <reference path="./models/project.ts" /> */

import { ProjectInput } from "./components/project_input.js";
import { ProjectList } from "./components/project_list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
