import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, 
  PlaceholderContent,
  PlaceholderName,
} from '@microsoft/sp-application-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './AppCustomizer.module.scss';

import * as strings from 'EmployeeMenuApplicationCustomizerStrings';

const LOG_SOURCE: string = 'EmployeeMenuApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IEmployeeMenuApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
   Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class EmployeeMenuApplicationCustomizer
  extends BaseApplicationCustomizer<IEmployeeMenuApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }
  private _renderPlaceHolders(): void {
    console.log("EmployeeInfo._renderPlaceHolders()");
    console.log(
        "Available placeholders: ",
        this.context.placeholderProvider.placeholderNames
            .map(name => PlaceholderName[name])
            .join(", ")
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
        this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Top,
            { onDispose: this._onDispose }
        );

        // The extension should not assume that the expected placeholder is available.
        if (!this._topPlaceholder) {
            console.error("The expected placeholder (Top) was not found.");
            return;
        }

        if (this.properties) {
            let topString: string = this.properties.Top;
            if (!topString) {
                topString = "(Top property was not defined.)";
            }

            if (this._topPlaceholder.domElement) {
                this._topPlaceholder.domElement.innerHTML = `
                <div class="${styles.app}">
                    <div class="${styles.top}">
                        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                            topString
                        )}
                    </div>
                </div>`;
            }
        }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
        this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Bottom,
            { onDispose: this._onDispose }
        );

        // The extension should not assume that the expected placeholder is available.
        if (!this._bottomPlaceholder) {
            console.error("The expected placeholder (Bottom) was not found.");
            return;
        }

        if (this.properties) {
            let bottomString: string = this.properties.Bottom;
            if (!bottomString) {
                bottomString = "(Bottom property was not defined.)";
            }

            if (this._bottomPlaceholder.domElement) {
                this._bottomPlaceholder.domElement.innerHTML = `
                <div class="${styles.app}">
                    <div class="${styles.bottom}">
                        <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                            bottomString
                        )}
                    </div>
                </div>`;
            }
        }
    }
}
private _onDispose(): void {
  console.log('[EmployeeInfo._onDispose] Disposed custom top and bottom placeholders.');
}
}
