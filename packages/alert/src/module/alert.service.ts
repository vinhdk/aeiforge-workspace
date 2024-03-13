import { inject, Injectable } from '@angular/core';
import { ApplicationService } from '@aeiforge-workspace/application';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { IAlertRef } from '../interfaces/alert-ref.interface';
import { AlertContent } from '../types/alert-content.type';
import { IAlertConfig } from '../interfaces/alert-config.interface';
import { AlertStates } from '../enums/alert-state.enum';
import { AlertHorizontalPositions, AlertVerticalPositions } from '../enums/alert-position.enum';
import { AlertComponent } from '../alert.component';
import { DOCUMENT } from '@angular/common';
import { provideAlertDefaultConfig } from '../providers/alert-default-config.provider';
import { IAlertOption } from '../interfaces/alert-option.interface';
import { ComponentPortal } from '@angular/cdk/portal';
import { AlertHostComponent } from '../alert-host.component';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  protected readonly _applicationService = inject(ApplicationService);
  protected readonly _overlay = inject(Overlay);
  protected readonly _document = inject(DOCUMENT);
  protected readonly _component = AlertComponent;

  public success<TContent, TFooter, TData>(
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    return this.open(AlertStates.SUCCESS, content, config);
  }

  public warning<TContent, TFooter, TData>(
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    return this.open(AlertStates.WARNING, content, config);
  }

  public error<TContent, TFooter, TData>(
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    return this.open(AlertStates.ERROR, content, config);
  }

  public neutral<TContent, TFooter, TData>(
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    return this.open(AlertStates.NEUTRAL, content, config);
  }

  public info<TContent, TFooter, TData>(
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    return this.open(AlertStates.INFO, content, config);
  }

  public open<TContent, TFooter, TData>(
    state: AlertStates,
    content?: AlertContent<TContent>,
    config?: Partial<Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>>
  ): IAlertRef {
    const { config: defaultConfig, provider } = provideAlertDefaultConfig(state, content, config);
    const { options } = defaultConfig;
    const container = this._getContainer(options);

    const injector = this._applicationService.createInjector([provider]);

    const componentRef = this._applicationService.createComponentRef(
      this._component,
      injector
    );

    this._applicationService.attachHostView(componentRef);

    const element = this._applicationService.getHostViewFirstElement(componentRef.hostView);

    this._applicationService.appendTo(element, container);

    componentRef.changeDetectorRef.detectChanges();

    const instance = componentRef.instance;

    instance.afterClosed
      .pipe(
        take(1),
        tap(() => {
          this._applicationService.detachHostView(componentRef);
          this._applicationService.removeFrom(element, container);
          componentRef.destroy();
        })
      ).subscribe();

    return {
      afterClosed: instance.afterClosed.asObservable(),
      afterOpened: instance.afterOpened.asObservable(),
      closeClicked: instance.closeClick.asObservable(),
      close: () => {
        instance.close();
      }
    };
  }

  protected _getContainer(options: IAlertOption): HTMLElement {
    const containerId = this._getContainerId(options.horizontalPosition, options.verticalPosition);
    const existedContainer = this._document.getElementById(containerId);

    if (existedContainer) {
      return existedContainer;
    }

    const overlayRef = this._getOverlayRef(options);

    const containerPortal = new ComponentPortal(AlertHostComponent);

    const containerRef = overlayRef.attach(containerPortal);

    const instance = containerRef.instance;

    instance.id.set(containerId);

    return this._applicationService.getHostViewFirstElement(containerRef.hostView);
  }

  protected _getContainerId(horizontalPosition: AlertHorizontalPositions, verticalPosition: AlertVerticalPositions): string {
    return `alert-container-${horizontalPosition}-${verticalPosition}`;
  }

  protected _getOverlayRef(
    {
      horizontalPosition,
      verticalPosition,
      verticalOffset,
      horizontalOffset
    }: IAlertOption
  ): OverlayRef {
    const overlayConfig = new OverlayConfig();

    const positionStrategy = this._overlay.position().global();

    switch (horizontalPosition) {
      case AlertHorizontalPositions.LEFT:
        positionStrategy.left(horizontalOffset || '0');
        break;
      case AlertHorizontalPositions.CENTER:
        positionStrategy.centerHorizontally(horizontalOffset || '0');
        break;
      case AlertHorizontalPositions.RIGHT:
        positionStrategy.right(horizontalOffset || '0');
        break;
      default:
        break;
    }

    switch (verticalPosition) {
      case AlertVerticalPositions.TOP:
        positionStrategy.top(verticalOffset || '0');
        break;
      case AlertVerticalPositions.MIDDLE:
        positionStrategy.centerVertically(verticalOffset || '0');
        break;
      case AlertVerticalPositions.BOTTOM:
        positionStrategy.bottom(verticalOffset || '0');
        break;
      default:
        break;
    }

    overlayConfig.positionStrategy = positionStrategy;

    return this._overlay.create(overlayConfig);
  }
}
