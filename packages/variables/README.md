# Variables

This library utilizes [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), adopting a naming convention influeced by Google's [Material design system tokens](https://m3.material.io/foundations/design-tokens/how-to-read-tokens#98e82e98-5ecd-4c5d-a03a-7d4cc5d55c20). The variables are divided into a 3-tier structure: Reference, System, and Component.

## Reference variables

Reference variables are used to hold direct property values, the value you would give to a CSS property when not using variables.

```css
  --nyc-ref-color-blue-500: hsla(208, 100%, 30%, 1);
```

## System variables

System variables introduce a semantic layer where we can provide useful names to our Reference variables, such as a `primary` color or a `base` font.

```css
  --nyc-sys-color-primary: var(--nyc-ref-color-blue-500);
```

## Component variables

Component variables are the variables that will be referenced in our component CSS properties and these reference System variables.

```css
  --nyc-cmp-card-background-hover: var(--nyc-sys-color-primary-light, transparent);
```
