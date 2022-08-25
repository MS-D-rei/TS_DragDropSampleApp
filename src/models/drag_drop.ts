// Drag And Drop Interfaces
// namespace App {
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // permit drop
  dragOverHandler(event: DragEvent): void;
  // handle after drop
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
// }
