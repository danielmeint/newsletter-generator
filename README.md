# Newsletter Generator

[View Live Demo](https://danielmeint.de/newsletter-generator/)

A simple web-based tool to write newsletters using Markdown and instantly preview the HTML output, styled for readability. Includes options to toggle between desktop and mobile preview sizes, copy the generated HTML, and export it as a standalone `.html` file.

This application is built purely with client-side technologies (HTML, CSS, JavaScript) and can be easily hosted on static site platforms like GitHub Pages.

## Features

*   **Live Markdown Preview:** Write Markdown in the left pane and see the rendered HTML update instantly on the right.
*   **Responsive Preview:** Toggle the preview pane between a standard desktop width (`600px`) and a common mobile width (`375px`) using the "Toggle Mobile View" button.
*   **Marked.js Integration:** Uses the [Marked.js](https://marked.js.org/) library for efficient Markdown parsing.
*   **Copy HTML:** Easily copy the full standalone HTML source code (including basic embedded styles) to your clipboard.
*   **Export HTML:** Download the generated newsletter as a complete `newsletter.html` file.
*   **Minimalist Design:** Clean and simple interface for a focused writing experience.
*   **Client-Side Only:** No backend required, runs entirely in the browser.

## How to Use

1.  **Clone or Download:** Get the project files (`index.html`, `style.css`, `main.js`).
2.  **Open in Browser:** Simply open the `index.html` file in your web browser.
3.  **Write & Preview:** Start typing Markdown in the editor.
4.  **Use Controls:** Utilize the buttons in the header to toggle the view, copy the HTML, or export the file.

### Hosting on GitHub Pages

Since this is a static application:

1.  Create a new repository on GitHub.
2.  Push the `index.html`, `style.css`, and `main.js` files to the repository.
3.  Go to your repository's Settings > Pages.
4.  Under "Build and deployment", select "Deploy from a branch" as the Source.
5.  Choose the branch you pushed your code to (e.g., `main`) and select `/ (root)` as the folder.
6.  Click Save. GitHub Pages will build and deploy your site, providing you with a public URL.

## Technology Stack

*   HTML5
*   CSS3
*   Vanilla JavaScript (ES6+)
*   [Marked.js](https://marked.js.org/) (via CDN) for Markdown parsing

## Future Enhancements (Ideas)

*   Implement robust HTML sanitization (e.g., using DOMPurify).
*   Add an option for automatic CSS inlining for better email client compatibility.
*   Introduce themes or customizable preview styles.
*   Save and load Markdown content using local storage.
*   Integrate more advanced Markdown features or extensions. 