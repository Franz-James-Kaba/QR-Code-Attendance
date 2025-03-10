import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponentRef: ComponentRef<any> | null = null;
  private overlayElement: HTMLElement | null = null;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly injector: EnvironmentInjector
  ) {}

       open<T>(component: Type<T>, inputs: Partial<T> = {}): ComponentRef<T> {
      console.log('DialogService: Opening component', component.name);
      this.close(); // Close any existing dialog

      // Create the overlay
      this.createOverlay();
      console.log('DialogService: Overlay created');

      // Create the component
      const componentRef = createComponent(component, {
        environmentInjector: this.injector
      });
      console.log('DialogService: Component created');

      // Set inputs
      Object.keys(inputs).forEach(key => {
        componentRef.setInput(key as string, inputs[key as keyof T]);
        console.log(`DialogService: Set input ${key}`);
      });

      // Make sure visible and isModal are set
      if ('visible' in (componentRef.instance as any)) {
        (componentRef.instance as any).visible = true;
        console.log('DialogService: Set visible = true');
      }
      if ('isModal' in (componentRef.instance as any)) {
        (componentRef.instance as any).isModal = true;
        console.log('DialogService: Set isModal = true');
      }

      // Append to body with proper positioning
      const element = componentRef.location.nativeElement;
      element.style.position = 'fixed';
      element.style.zIndex = '1000';
      document.body.appendChild(element);
      console.log('DialogService: Element appended to body');

      // Attach to application
      this.appRef.attachView(componentRef.hostView);
      console.log('DialogService: View attached to app');

      // Store reference
      this.dialogComponentRef = componentRef;

      return componentRef;
    }

  close(): void {
    if (this.dialogComponentRef) {
      // Detach from application
      this.appRef.detachView(this.dialogComponentRef.hostView);

      // Remove from DOM
      const element = this.dialogComponentRef.location.nativeElement;
      element.parentNode?.removeChild(element);

      // Destroy component
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }

    // Remove overlay
    if (this.overlayElement) {
      document.body.removeChild(this.overlayElement);
      this.overlayElement = null;
    }
  }

  private createOverlay(): void {
    this.overlayElement = document.createElement('div');
    this.overlayElement.style.position = 'fixed';
    this.overlayElement.style.top = '0';
    this.overlayElement.style.left = '0';
    this.overlayElement.style.width = '100%';
    this.overlayElement.style.height = '100%';
    this.overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.overlayElement.style.zIndex = '999';

    document.body.appendChild(this.overlayElement);
  }
}
