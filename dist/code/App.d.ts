/**
 * @module Components
 */
import { Attribute, Visibility, States } from "./App.meta.js";
import { Component } from "./Component.js";
/**
 * Event handler signature
 * @hidden
 */
export type Handler = (...args: any[]) => void;
/**
 * A button that can be toggled on and off
 * @category Components
 */
export declare class App extends Component {
    /**
     * The tag name of the component
     * @category Configuration
     */
    static get Tag(): string;
    /**
     * Only attributes defined the Attributes object will be observed in DOM
     * @category Attributes
     * @hidden
     */
    static get Attributes(): typeof Attribute;
    /**
     * Default visibility is `yes`
     * @hidden
     */
    private _visible;
    /**
     * Default state is `enabled`
     * @hidden
     */
    private _state;
    /**
     * @hidden
     */
    constructor();
    /**
     * Optional readonly accessor with HTML Template id to use if template is required
     * @category State
     */
    get template(): string;
    /**
     * Readonly accessor with CSS Style Sheet path when using a Template
     * @category State
     */
    get css(): string;
    /**
     * Get and Sets the visibility of the button
     * @category State
     */
    get visible(): Visibility;
    set visible(visible: Visibility);
    /**
     * Get or Set state of the component
     * @category State
     */
    get state(): States;
    set state(state: States);
    /**
     * Triggered via `.hide()`
     * @event
     * @category Events
     */
    set onhide(handler: Handler);
    /**
     * Triggered via `.show()`
     * @event
     * @category Events
     */
    set onshow(handler: Handler);
    /**
     * Triggered via `.enable()`
     * @event
     * @category Events
     */
    set onenable(handler: Handler);
    /**
     * Triggered via `.disable()`
     * @event
     * @category Events
     */
    set ondisable(handler: Handler);
    /**
     * Handles the click event
     * @hidden
     */
    private _handleClick;
    /**
     * List operations to perform for selected attributes being observed in the DOM.
     */
    protected _attributeHandlers: {
        state: (value: string) => States;
        visible: (value: string) => Visibility;
    };
    /**
     * Called by the connectedCallback prototypical method
     * @hidden
     */
    protected _addEventListeners: () => void;
    /**
     * Called by the disconnectedCallback prototypical method
     * @hidden
     */
    protected _removeEventListeners: () => void;
    update: (version: any) => void;
    /**
     * Change the visibility of the app to `no`
     * @category Operations
     */
    hide: () => "no";
    /**
     * Change the visibility of the app to `yes`
     * @category Operations
     */
    show: () => "yes";
    /**
     * Change the state of the app to `enable`
     * @category Operations
     */
    enable: () => "enabled";
    /**
     * Change the state of the app to `disable`
     * @category Operations
     */
    disable: () => "disabled";
    /**
     * Toggle the state of the app
     * @category Operations
     */
    toggle: () => "disabled" | "enabled";
}
