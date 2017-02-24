<template>
    <div class="ui-textbox" :class="classes">
        <div class="ui-textbox__icon-wrapper" v-if="icon || $slots.icon">
            <slot name="icon">
                <ui-icon :icon="icon"></ui-icon>
            </slot>
        </div>

        <div class="ui-textbox__content">
            <label class="ui-textbox__label">
                <div
                    class="ui-textbox__label-text"
                    :class="labelClasses"
                    v-if="label || $slots.default"
                >
                    <slot>{{ label }}</slot>
                </div>

                <input
                    class="ui-textbox__input"
                    ref="input"

                    :autocomplete="autocomplete ? autocomplete : null"
                    :disabled="disabled"
                    :max="maxValue"
                    :maxlength="enforceMaxlength ? maxlength : null"
                    :min="minValue"
                    :name="name"
                    :number="type === 'number' ? true : null"
                    :placeholder="hasFloatingLabel ? null : placeholder"
                    :readonly="readonly"
                    :required="required"
                    :step="stepValue"
                    :type="type"
                    :value="value"

                    @blur="onBlur"
                    @change="onChange"
                    @focus="onFocus"
                    @input="updateValue($event.target.value)"
                    @keydown.enter="onKeydownEnter"
                    @keydown="onKeydown"

                    v-autofocus="autofocus"
                    v-if="!multiLine"
                >

                <textarea
                    class="ui-textbox__textarea"
                    ref="textarea"

                    :autocomplete="autocomplete ? autocomplete : null"
                    :disabled="disabled"
                    :maxlength="enforceMaxlength ? maxlength : null"
                    :name="name"
                    :placeholder="hasFloatingLabel ? null : placeholder"
                    :readonly="readonly"
                    :required="required"
                    :rows="rows"
                    :value="value"

                    @blur="onBlur"
                    @change="onChange"
                    @focus="onFocus"
                    @input="updateValue($event.target.value)"
                    @keydown.enter="onKeydownEnter"
                    @keydown="onKeydown"

                    v-autofocus="autofocus"
                    v-else
                >{{ value }}</textarea>
            </label>

            <div class="ui-textbox__feedback" v-if="hasFeedback || maxlength">
                <div class="ui-textbox__feedback-text" v-if="showError">
                    <slot name="error">{{ error }}</slot>
                </div>

                <div class="ui-textbox__feedback-text" v-else-if="showHelp">
                    <slot name="help">{{ help }}</slot>
                </div>

                <div class="ui-textbox__counter" v-if="maxlength">
                    {{ value.length + '/' + maxlength }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import autofocus from 'keen-ui/src/directives/autofocus';
import UiIcon from 'keen-ui/src/UiIcon.vue';

import autosize from 'autosize';

export default {
    name: 'ui-textbox',

    props: {
        name: String,
        placeholder: String,
        value: {
            type: [String, Number],
            required: true
        },
        icon: String,
        iconPosition: {
            type: String,
            default: 'left' // 'left' or 'right'
        },
        label: String,
        floatingLabel: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text' // all the possible HTML5 input types, except those that have a special UI
        },
        dark: {
            type: Boolean,
            default: false
        },
        multiLine: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 2
        },
        autocomplete: String,
        autofocus: {
            type: Boolean,
            default: false
        },
        autosize: {
            type: Boolean,
            default: true
        },
        min: Number,
        max: Number,
        step: {
            type: String,
            default: 'any'
        },
        maxlength: Number,
        enforceMaxlength: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        help: String,
        error: String,
        invalid: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isActive: false,
            isTouched: false,
            initialValue: this.value,
            autosizeInitialized: false
        };
    },

    computed: {
        classes() {
            return [
                `ui-textbox--icon-position-${this.iconPosition}`,
                { 'is-active': this.isActive },
                { 'is-invalid': this.invalid },
                { 'is-touched': this.isTouched },
                { 'is-multi-line': this.multiLine },
                { 'has-counter': this.maxlength },
                { 'is-disabled': this.disabled },
                { 'has-label': this.hasLabel },
                { 'has-floating-label': this.hasFloatingLabel },
                { 'is-dark': this.dark }
            ];
        },

        labelClasses() {
            return {
                'is-inline': this.hasFloatingLabel && this.isLabelInline,
                'is-floating': this.hasFloatingLabel && !this.isLabelInline
            };
        },

        hasLabel() {
            return Boolean(this.label) || Boolean(this.$slots.default);
        },

        hasFloatingLabel() {
            return this.hasLabel && this.floatingLabel;
        },

        isLabelInline() {
            return this.value.length === 0 && !this.isActive;
        },

        minValue() {
            if (this.type === 'number' && this.min !== undefined) {
                return this.min;
            }

            return null;
        },

        maxValue() {
            if (this.type === 'number' && this.max !== undefined) {
                return this.max;
            }

            return null;
        },

        stepValue() {
            return this.type === 'number' ? this.step : null;
        },

        hasFeedback() {
            return Boolean(this.help) || Boolean(this.error);
        },

        showError() {
            return this.invalid && Boolean(this.error);
        },

        showHelp() {
            return !this.showError && Boolean(this.help);
        }
    },

    mounted() {
        if (this.multiLine && this.autosize) {
            autosize(this.$refs.textarea);
            this.autosizeInitialized = true;
        }
    },

    beforeDestroy() {
        if (this.autosizeInitialized) {
            autosize.destroy(this.$refs.textarea);
        }
    },

    methods: {
        updateValue(value) {
            this.$emit('input', value);
        },

        onChange(e) {
            this.$emit('change', this.value, e);
        },

        onFocus(e) {
            this.isActive = true;
            this.$emit('focus', e);
        },

        onBlur(e) {
            this.isActive = false;
            this.$emit('blur', e);

            if (!this.isTouched) {
                this.isTouched = true;
                this.$emit('touch');
            }
        },

        onKeydown(e) {
            this.$emit('keydown', e);
        },

        onKeydownEnter(e) {
            this.$emit('keydown-enter', e);
        },

        reset() {
            // Blur the input if it's focused to prevent required errors
            // when it's value is reset
            if (
                document.activeElement === this.$refs.input ||
                document.activeElement === this.$refs.textarea
            ) {
                document.activeElement.blur();
            }

            this.updateValue(this.initialValue);
            this.resetTouched();
        },

        resetTouched(options = { touched: false }) {
            this.isTouched = options.touched;
        },

        refreshSize() {
            if (this.autosizeInitialized) {
                autosize.update(this.$refs.textarea);
            }
        }
    },

    components: {
        UiIcon
    },

    directives: {
        autofocus
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '../../../../node_modules/keen-ui/src/styles/imports';

.ui-textbox {
    align-items: flex-start;
    display: flex;
    font-family: $font-stack;
    margin-bottom: $ui-input-margin-bottom;

    &:hover:not(.is-disabled) {
        .ui-textbox__label-text {
            color: $ui-input-label-color--hover;
        }

        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--hover;
        }
    }

    &.is-active:not(.is-disabled) {
        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--active;
            border-bottom-width: $ui-input-border-width--active;
        }

        .ui-textbox__label-text,
        .ui-textbox__icon-wrapper .ui-icon {
            color: $ui-input-label-color--active;
        }
    }

    &.has-label {
        .ui-textbox__icon-wrapper {
            padding-top: $ui-input-icon-margin-top--with-label;
        }
    }

    &.has-counter {
        .ui-textbox__feedback-text {
            padding-right: rem-calc(48px);
        }
    }

    &.has-floating-label {
        .ui-textbox__label-text {
            // Behaves like a block, but width is the width of its content.
            // Needed here so label doesn't overflow parent when scaled.
            display: table;

            &.is-inline {
                color: $ui-input-label-color; // So the hover styles don't override it
                cursor: text;
                transform: translateY($ui-input-label-top--inline) scale(1.1);
            }

            &.is-floating {
                transform: translateY(0) scale(1);
            }
        }
    }

    &.is-invalid:not(.is-disabled) {
        .ui-textbox__label-text,
        .ui-textbox__icon-wrapper .ui-icon,
        .ui-textbox__counter {
            color: $ui-input-label-color--invalid;
        }

        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--invalid;
        }

        .ui-textbox__feedback {
            color: $ui-input-feedback-color--invalid;
        }
    }

    &.is-disabled {
        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-style: $ui-input-border-style--disabled;
            border-bottom-width: $ui-input-border-width--active;
            color: $ui-input-text-color--disabled;
        }

        .ui-textbox__icon-wrapper .ui-icon {
            opacity: $ui-input-icon-opacity--disabled;
        }

        .ui-textbox__feedback {
            opacity: $ui-input-feedback-opacity--disabled;
        }
    }
}

.ui-textbox__label {
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
}

.ui-textbox__icon-wrapper {
    flex-shrink: 0;
    margin-right: rem-calc(12px);
    padding-top: $ui-input-icon-margin-top;

    .ui-icon {
        color: $ui-input-icon-color;
    }
}

.ui-textbox__content {
    flex-grow: 1;
}

.ui-textbox__label-text {
    color: $ui-input-label-color;
    font-size: $ui-input-label-font-size;
    line-height: $ui-input-label-line-height;
    margin-bottom: $ui-input-label-margin-bottom;
    transform-origin: left;
    transition: color 0.1s ease, transform 0.2s ease;
}

.ui-textbox__input,
.ui-textbox__textarea {
    background: none;
    border: none;
    border-bottom-color: $ui-input-border-color;
    border-bottom-style: solid;
    border-bottom-width: $ui-input-border-width;
    border-radius: 0;
    color: $ui-input-text-color;
    cursor: auto;
    display: block;
    font-family: $font-stack;
    font-size: $ui-input-text-font-size;
    font-weight: normal;
    margin: 0;
    outline: none;
    padding: 0;
    transition: border 0.1s ease;
    width: 100%;
}

.ui-textbox__input {
    height: $ui-input-height;
}

.ui-textbox__textarea {
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: rem-calc(6px);
    resize: vertical;
}

.ui-textbox__feedback {
    color: $ui-input-feedback-color;
    font-size: $ui-input-feedback-font-size;
    line-height: $ui-input-feedback-line-height;
    margin: 0;
    padding-top: $ui-input-feedback-padding-top;
    position: relative;
}

.ui-textbox__counter {
    position: absolute;
    right: 0;
    top: $ui-input-feedback-padding-top;
}

// ================================================
// Icon position
// ================================================

.ui-textbox--icon-position-right {
    .ui-textbox__icon-wrapper {
        margin-left: rem-calc(8px);
        margin-right: 0;
        order: 1;
    }
}

// ================================================
// Dark Theme
// ================================================

// Brand colors
$brand-primary-color-dark                : $md-light-blue-200 !default;
$brand-accent-color-dark                 : $md-purple-200 !default;

// Primary text color - dark theme
$primary-text-color-dark                 : rgba(white, 1) !default;

// Secondary text color - dark theme
$secondary-text-color-dark               : rgba(white, 0.8) !default;

// Hint text color - dark theme
$hint-text-color-dark                    : rgba(white, 0.54) !default;

// Disabled text color - dark theme
$disabled-text-color-dark                : $hint-text-color-dark !default;

// Divider color - dark theme
$divider-color-dark                      : rgba(white, 0.12) !default;

// Input label - dark theme
$ui-input-label-color-dark               : $secondary-text-color-dark !default;
$ui-input-label-color--hover-dark        : rgba(white, 0.75) !default;
$ui-input-label-color--active-dark       : $brand-primary-color-dark !default;
$ui-input-label-color--invalid-dark      : $md-red !default;

// Input text - dark theme
$ui-input-text-color-dark                : $primary-text-color-dark !default;
$ui-input-text-color--disabled-dark      : $disabled-text-color-dark !default;
$ui-input-text-color--invalid-dark       : $md-red !default;

// Input border - dark theme
$ui-input-border-color-dark              : $divider-color-dark !default;
$ui-input-border-color--hover-dark       : rgba(white, 0.3) !default;
$ui-input-border-color--active-dark      : $brand-primary-color-dark !default;
$ui-input-border-color--invalid-dark     : $md-red !default;

// Input icons - dark theme
$ui-input-icon-color-dark                : $secondary-text-color-dark !default;

// Input buttons (dropdown button icon, clear input button icon) - dark theme
$ui-input-button-color-dark              : $secondary-text-color-dark !default;
$ui-input-button-color--hover-dark       : $primary-text-color-dark !default;

// Input feedback, help and error text - dark theme
$ui-input-feedback-color-dark            : $secondary-text-color-dark !default;
$ui-input-feedback-color--invalid-dark   : $md-red !default;

.ui-textbox.is-dark{
    &:hover:not(.is-disabled) {
        .ui-textbox__label-text {
            color: $ui-input-label-color--hover-dark;
        }

        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--hover-dark;
        }
    }

    &.is-active:not(.is-disabled) {
        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--active-dark;
        }

        .ui-textbox__label-text,
        .ui-textbox__icon-wrapper .ui-icon {
            color: $ui-input-label-color--active-dark;
        }
    }

    &.has-floating-label {
        .ui-textbox__label-text {
            &.is-inline {
                color: $ui-input-label-color-dark; // So the hover styles don't override it
            }
        }
    }

    &.is-invalid:not(.is-disabled) {
        .ui-textbox__label-text,
        .ui-textbox__icon-wrapper .ui-icon,
        .ui-textbox__counter {
            color: $ui-input-label-color--invalid-dark;
        }

        .ui-textbox__input,
        .ui-textbox__textarea {
            border-bottom-color: $ui-input-border-color--invalid-dark;
        }

        .ui-textbox__feedback {
            color: $ui-input-feedback-color--invalid-dark;
        }
    }

    &.is-disabled {
        .ui-textbox__input,
        .ui-textbox__textarea {
            color: $ui-input-text-color--disabled-dark;
        }
    }

    .ui-textbox__icon-wrapper {
        .ui-icon {
            color: $ui-input-icon-color-dark;
        }
    }

    .ui-textbox__label-text {
        color: $ui-input-label-color-dark;
    }

    .ui-textbox__input,
    .ui-textbox__textarea {
        border-bottom-color: $ui-input-border-color-dark;
        color: $ui-input-text-color-dark;
    }

    .ui-textbox__input::-webkit-input-placeholder{
        color: $secondary-text-color-dark;
    }

    .ui-textbox__feedback {
        color: $ui-input-feedback-color-dark;
    }
}
</style>
