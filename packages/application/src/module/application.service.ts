import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
  Injector,
  StaticProvider
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  protected readonly _resolver = inject(ComponentFactoryResolver);
  protected readonly _appRef = inject(ApplicationRef);
  protected readonly _document = inject(DOCUMENT);
  protected readonly _injector = inject(Injector);

  public createComponentRef<TComponent, TInjector extends Injector>(component: ComponentType<TComponent>, injector?: TInjector): ComponentRef<TComponent> {
    const factory = this._resolver.resolveComponentFactory(component);
    const componentRef = factory.create(
      this.createInjector([], injector)
    );

    this.attachHostView(componentRef);

    return componentRef;
  }

  public attachHostView<TComponent>(componentRef: ComponentRef<TComponent>): void {
    this._appRef.attachView(componentRef.hostView);
  }

  public detachHostView<TComponent>(componentRef: ComponentRef<TComponent>): void {
    this._appRef.detachView(componentRef.hostView);
  }

  public appendTo<TChild extends HTMLElement = HTMLElement, TParent extends HTMLElement = HTMLElement>(element: TChild, parent?: TParent): void {
    if (!parent) {
      this._document.body.appendChild(element);
      return;
    }

    parent.appendChild(element);
  }

  public removeFrom<TChild extends HTMLElement = HTMLElement, TParent extends HTMLElement = HTMLElement>(element: TChild, parent?: TParent): void {
    if (!parent) {
      this._document.body.removeChild(element);
      return;
    }

    parent.removeChild(element);
  }

  public getHostViewFirstElement<TReturn extends HTMLElement = HTMLElement, TRef = unknown>(
    hostView: ComponentRef<TRef>['hostView']
  ): TReturn {
    const embeddedViewRef = hostView as EmbeddedViewRef<TReturn>;

    return embeddedViewRef.rootNodes[0];
  }

  public createInjector(providers: StaticProvider[], parentInjector?: Injector): Injector {
    return Injector.create({ parent: parentInjector || this._injector, providers });
  }
}
