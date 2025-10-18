# Project Overview: Accessible Communication Portal

This project is a Next.js application designed as an "Accessible Communication Portal." Its primary goal is to demonstrate and provide various accessibility features for both hearing and visually impaired users, adhering to Web Content Accessibility Guidelines (WCAG) standards.

## Key Technologies Used

*   **Next.js:** A React framework for building performant web applications.
*   **React:** The core JavaScript library for constructing user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling (inferred from configuration).
*   **Framer Motion:** A library for declarative animations in React.
*   **React Hook Form:** A library for efficient and flexible form validation.
*   **SweetAlert2:** A beautiful, responsive, customizable, and accessible replacement for JavaScript's popup boxes.
*   **clsx:** A tiny utility for constructing `className` strings conditionally.
*   **Lucide React:** A collection of beautiful and customizable open-source icons.

## Application Structure

The application follows a standard Next.js structure:

*   **`src/app/layout.tsx`**: Defines the root HTML structure, including global components like `Header`, `Footer`, and `SkipLink`. Crucially, it wraps the entire application with `AccessibilityProvider` and `AccessibilityClientWrapper` to ensure accessibility features are available globally.
*   **`src/app/page.tsx`**: The main landing page of the application, showcasing the core communication and accessibility features.
*   **`src/app/globals.css`**: Contains global CSS styles.
*   **`src/app/components/`**: Houses various reusable UI components.

## Core Accessibility Features

The project's accessibility features are centralized and managed through a dedicated system:

### `src/app/components/accessibility/AccessibilityContext.tsx`

This file establishes a React Context (`AccessibilityContext`) that serves as the central hub for managing all accessibility settings.

*   **`AccessibilitySettings` Type**: Defines a comprehensive set of accessibility options, including:
    *   `highContrast`: Toggles high contrast mode.
    *   `largeText`: Enables larger text sizes.
    *   `reducedMotion`: Respects user preferences for reduced motion.
    *   `focusVisible`: Enhances focus indicators for keyboard navigation.
    *   `colorBlindMode`: Offers various color blindness simulations (e.g., Protanopia, Deuteranopia).
    *   `speakSelection`: Enables text-to-speech for selected text.
    *   `announceErrors`: Provides auditory announcements for form errors or other important messages.
*   **Persistence**: Settings are saved to and loaded from `localStorage`, ensuring user preferences persist across sessions.
*   **Dynamic Styling**: Based on the active settings, CSS classes (e.g., `a11y-high-contrast`, `a11y-large-text`, `a11y-hide-focus`) and `data-color-blind` attributes are dynamically applied to the `document.documentElement` (the `<html>` tag). This allows for global style adjustments via CSS.
*   **Keyboard Shortcuts**:
    *   `Ctrl + Alt + S`: Toggles the "speak selection" feature.
    *   `Ctrl + Alt + A`: Triggers an event to open the accessibility settings panel.
*   **Announcer Function (`announce`)**: Provides a mechanism to send messages to an ARIA live region (`id="a11y-live"`), ensuring important updates and announcements are conveyed to screen reader users.

### `src/app/components/accessibility/AccessibilityClientWrapper.tsx`

This component is responsible for dynamically loading the `AccessibilitySettings` UI component only on the client-side (`ssr: false`). This prevents server-side rendering issues with client-specific functionalities and places the accessibility panel in a fixed position on the screen for easy access.

### Other Accessibility Components (Inferred)

*   **`SelectionSpeaker.tsx`**: Likely handles the logic for speaking selected text, integrating with the `speakSelection` setting from the context.
*   **`AnnouncerButton.tsx`**: Probably a UI component that triggers announcements using the `announce` function from the context.
*   **`AccessibilitySettings.tsx`**: (Dynamically loaded) This component provides the user interface for adjusting all the accessibility settings defined in `AccessibilityContext`.

## Core Application Functionality

The main page (`src/app/page.tsx`) highlights three key communication features, each designed with accessibility in mind:

1.  **Speech to Text (for Deaf Users)**: Implemented in `SpeechToText.tsx`, this feature likely converts spoken audio into text, providing a communication bridge for users with hearing impairments.
2.  **Text to Speech (for Blind Users)**: Implemented in `TextToSpeech.tsx`, this feature converts written text into spoken audio, assisting visually impaired users in consuming content.
3.  **Accessible Feedback Form**: Implemented in `AccessibleForm.tsx`, this form is built with WCAG compliance in mind, ensuring it is usable and understandable by all users, including those relying on assistive technologies.

## How It All Works Together

The "Accessible Communication Portal" functions as a comprehensive demonstration of an accessible web application. The `AccessibilityProvider` at the root of the application ensures that all components have access to and can react to global accessibility settings. These settings are managed through a user-friendly panel (loaded via `AccessibilityClientWrapper`) and persist across sessions.

The application dynamically adjusts its presentation (e.g., colors, text size, motion) based on user preferences, and provides specialized communication tools (Speech-to-Text, Text-to-Speech) and an accessible feedback form. The use of ARIA live regions and keyboard shortcuts further enhances usability for users with diverse needs, making the application a robust example of inclusive design.
