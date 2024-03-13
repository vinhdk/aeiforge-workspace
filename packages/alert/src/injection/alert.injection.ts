import { inject, Injectable, InjectionToken, InjectOptions } from '@angular/core';
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

export const { injectAlertService } = (() => {
  @Injectable({ providedIn: 'root' })
  class AlertService {
    readonly applicationService = inject(ApplicationService);
    readonly overlay = inject(Overlay);
    readonly document = inject(DOCUMENT);
    readonly component = AlertComponent;

    public success<TContent, TFooter, TData>(
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      return this.open(AlertStates.SUCCESS, content, config);
    }

    public warning<TContent, TFooter, TData>(
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      return this.open(AlertStates.WARNING, content, config);
    }

    public error<TContent, TFooter, TData>(
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      return this.open(AlertStates.ERROR, content, config);
    }

    public neutral<TContent, TFooter, TData>(
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      return this.open(AlertStates.NEUTRAL, content, config);
    }

    public info<TContent, TFooter, TData>(
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      return this.open(AlertStates.INFO, content, config);
    }

    public open<TContent, TFooter, TData>(
      state: AlertStates,
      content?: AlertContent<TContent>,
      config?: Partial<
        Omit<IAlertConfig<TContent, TFooter, TData, true>, 'content' | 'state'>
      >
    ): IAlertRef {
      const { config: defaultConfig, provider } = provideAlertDefaultConfig(
        state,
        content,
        config
      );
      const { options } = defaultConfig;
      const container = this._getContainer(options);

      const injector = this.applicationService.createInjector([provider]);

      const componentRef = this.applicationService.createComponentRef(
        this.component,
        injector
      );

      this.applicationService.attachHostView(componentRef);

      const element = this.applicationService.getHostViewFirstElement(
        componentRef.hostView
      );

      this.applicationService.appendTo(element, container);

      componentRef.changeDetectorRef.detectChanges();

      const instance = componentRef.instance;

      instance.afterClosed
        .pipe(
          take(1),
          tap(() => {
            this.applicationService.detachHostView(componentRef);
            this.applicationService.removeFrom(element, container);
            componentRef.destroy();
          })
        )
        .subscribe();

      return {
        afterClosed: instance.afterClosed.asObservable(),
        afterOpened: instance.afterOpened.asObservable(),
        closeClicked: instance.closeClick.asObservable(),
        close: () => {
          instance.close();
        },
      };
    }

    _getContainer(options: IAlertOption): HTMLElement {
      const containerId = this._getContainerId(
        options.horizontalPosition,
        options.verticalPosition
      );
      const existedContainer = this.document.getElementById(containerId);

      if (existedContainer) {
        return existedContainer;
      }

      const overlayRef = this._getOverlayRef(options);

      const containerPortal = new ComponentPortal(AlertHostComponent);

      const containerRef = overlayRef.attach(containerPortal);

      const instance = containerRef.instance;

      instance.id.set(containerId);

      return this.applicationService.getHostViewFirstElement(
        containerRef.hostView
      );
    }

    _getContainerId(
      horizontalPosition: AlertHorizontalPositions,
      verticalPosition: AlertVerticalPositions
    ): string {
      return `alert-container-${horizontalPosition}-${verticalPosition}`;
    }

    _getOverlayRef({
                     horizontalPosition,
                     verticalPosition,
                     verticalOffset,
                     horizontalOffset,
                   }: IAlertOption): OverlayRef {
      const overlayConfig = new OverlayConfig();

      const positionStrategy = this.overlay.position().global();

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

      return this.overlay.create(overlayConfig);
    }
  }

  const ALERT_SERVICE_TOKEN = new InjectionToken<AlertService>('ALERT_SERVICE_TOKEN');

  const injectAlertService = (option: InjectOptions = {}) => {
    const token = inject(ALERT_SERVICE_TOKEN, option);
    if (!token) throw 'Please provide the provideAlertToken';
    return token;
  };

  return { injectAlertService };
})();
