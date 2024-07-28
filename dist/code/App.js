/**
 * @module Components
 */
import { Attribute, Event, Gesture, State, Visible, } from "./App.meta.js";
import { Component } from "./Component.js";
/**
 * A button that can be toggled on and off
 * @category Components
 */
export class App extends Component {
    /**
     * The tag name of the component
     * @category Configuration
     */
    static get Tag() {
        return "pwa-app";
    }
    /**
     * Only attributes defined the Attributes object will be observed in DOM
     * @category Attributes
     * @hidden
     */
    static get Attributes() {
        return Attribute;
    }
    /**
     * Default visibility is `yes`
     * @hidden
     */
    _visible = Visible.YES;
    /**
     * Default state is `enabled`
     * @hidden
     */
    _state = State.DISABLED;
    /**
     * @hidden
     */
    constructor() {
        super();
    }
    /**
     * Optional readonly accessor with HTML Template id to use if template is required
     * @category State
     */
    get template() {
        return App.Tag;
    }
    /**
     * Readonly accessor with CSS Style Sheet path when using a Template
     * @category State
     */
    get css() {
        return "./App.style.css";
    }
    /**
     * Get and Sets the visibility of the button
     * @category State
     */
    get visible() {
        return this.getAttribute(Attribute.VISIBLE) ?? this._visible;
    }
    set visible(visible) {
        visible = visible || Visible.YES;
        if (this.visible !== visible) {
            this._visible = visible;
            visible == Visible.YES && this.removeAttribute(Attribute.VISIBLE);
            visible == Visible.YES &&
                this.dispatchEvent(new CustomEvent(Event.ONSHOW, { detail: visible }));
            visible == Visible.NO && this.setAttribute(Attribute.VISIBLE, visible);
            visible == Visible.NO &&
                this.dispatchEvent(new CustomEvent(Event.ONHIDE, { detail: visible }));
        }
    }
    /**
     * Get or Set state of the component
     * @category State
     */
    get state() {
        return this.getAttribute(Attribute.STATE) ?? this._state;
    }
    set state(state) {
        if (this.state !== state) {
            this._state = state;
            this.setAttribute(Attribute.STATE, state);
            state === State.ENABLED &&
                this.dispatchEvent(new CustomEvent(Event.ONENABLE, { detail: { state } }));
            state === State.DISABLED &&
                this.dispatchEvent(new CustomEvent(Event.ONDISABLE, { detail: { state } }));
        }
    }
    /**
     * Triggered via `.hide()`
     * @event
     * @category Events
     */
    set onhide(handler) {
        this.addEventListener(Event.ONHIDE, handler);
    }
    /**
     * Triggered via `.show()`
     * @event
     * @category Events
     */
    set onshow(handler) {
        this.addEventListener(Event.ONSHOW, handler);
    }
    /**
     * Triggered via `.enable()`
     * @event
     * @category Events
     */
    set onenable(handler) {
        this.addEventListener(Event.ONENABLE, handler);
    }
    /**
     * Triggered via `.disable()`
     * @event
     * @category Events
     */
    set ondisable(handler) {
        this.addEventListener(Event.ONDISABLE, handler);
    }
    /**
     * Handles the click event
     * @hidden
     */
    _handleClick = (event) => this.toggle();
    /**
     * List operations to perform for selected attributes being observed in the DOM.
     */
    _attributeHandlers = {
        [Attribute.STATE]: (value) => (this.state = value),
        [Attribute.VISIBLE]: (value) => (this.visible = value),
    };
    /**
     * TODO: enable the app after all children are loaded
     */
    _initialize = () => {
        //setTimeout(() => {
        //  this.enable();
        //}, 2000);
    };
    /**
     * Called by the connectedCallback prototypical method
     * @hidden
     */
    _addEventListeners = () => this.addEventListener(Gesture.CLICK, this._handleClick);
    /**
     * Called by the disconnectedCallback prototypical method
     * @hidden
     */
    _removeEventListeners = () => this.removeEventListener(Gesture.CLICK, this._handleClick);
    /**
     * Change the visibility of the app to `no`
     * @category Operations
     */
    hide = () => (this.visible = Visible.NO);
    /**
     * Change the visibility of the app to `yes`
     * @category Operations
     */
    show = () => (this.visible = Visible.YES);
    /**
     * Change the state of the app to `enable`
     * @category Operations
     */
    enable = () => (this.state = State.ENABLED);
    /**
     * Change the state of the app to `disable`
     * @category Operations
     */
    disable = () => (this.state = State.DISABLED);
    /**
     * Toggle the state of the app
     * @category Operations
     */
    toggle = () => (this.state =
        this.state === State.ENABLED ? State.DISABLED : State.ENABLED);
}
