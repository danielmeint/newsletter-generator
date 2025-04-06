// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const markdownEditor = document.getElementById('markdown-editor');
    const htmlPreview = document.getElementById('html-preview');
    const toggleViewBtn = document.getElementById('toggle-view-btn');
    const copyHtmlBtn = document.getElementById('copy-html-btn');
    const exportHtmlBtn = document.getElementById('export-html-btn');

    // Placeholder Markdown content
    const initialMarkdown = `
# Welcome to the Newsletter Generator!

This is a **live preview** of your Markdown newsletter content.

*   Type Markdown in the editor on the left.
*   See the HTML preview update in real-time.
*   Use the buttons above to toggle mobile view, copy HTML, or export.

## Features

1.  **Real-time Preview:** Uses the [Marked.js](https://marked.js.org/) library.
2.  **Responsive Preview:** Toggle between desktop and mobile views.
3.  **Export:** Get a standalone HTML file.

\`\`\`javascript
// Example code block
function greet() {
    console.log('Hello, world!');
}
\`\`\`

> Happy newsletter writing!
`;

    // Set initial Markdown content and render preview
    markdownEditor.value = initialMarkdown;
    renderPreview(initialMarkdown);

    // Function to render Markdown to HTML
    function renderPreview(markdown) {
        if (window.marked) {
            // Basic check if marked is loaded
            try {
                // Sanitize the HTML output for security (basic example)
                // For production, consider a more robust sanitization library like DOMPurify
                const dirtyHtml = marked.parse(markdown);
                // It's crucial to sanitize HTML coming from external libraries or user input
                // to prevent XSS attacks. This is a placeholder for where sanitization should occur.
                htmlPreview.innerHTML = dirtyHtml; // WARNING: Directly setting innerHTML from parsed markdown can be unsafe without proper sanitization.
            } catch (error) {
                console.error('Error parsing Markdown:', error);
                htmlPreview.innerHTML = '<p style="color: red;">Error rendering preview.</p>';
            }
        } else {
            console.error('Marked.js library not loaded.');
            htmlPreview.innerHTML = '<p style="color: red;">Error: Marked.js not loaded.</p>';
        }
    }

    // Event listener for Markdown input
    markdownEditor.addEventListener('input', (event) => {
        renderPreview(event.target.value);
    });

    // Event listener for toggling preview view
    toggleViewBtn.addEventListener('click', () => {
        htmlPreview.classList.toggle('preview-mobile');
        // Update button text based on the current view mode
        toggleViewBtn.textContent = htmlPreview.classList.contains('preview-mobile')
            ? 'Toggle Desktop View'
            : 'Toggle Mobile View';
    });

    // Event listener for copying HTML
    copyHtmlBtn.addEventListener('click', () => {
        const htmlToCopy = generateStandaloneHTML(htmlPreview.innerHTML);
        navigator.clipboard.writeText(htmlToCopy).then(() => {
            alert('HTML copied to clipboard!'); // User feedback
        }).catch(err => {
            console.error('Failed to copy HTML: ', err);
            alert('Failed to copy HTML. See console for details.');
            // Fallback for older browsers or if clipboard API fails
            fallbackCopyTextToClipboard(htmlToCopy);
        });
    });

    // Fallback function for copying text if navigator.clipboard is not supported
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('HTML copied to clipboard (using fallback)!');
            } else {
                 alert('Fallback copy failed.');
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            alert('Fallback copy failed. See console.');
        }
        document.body.removeChild(textArea);
    }

    // Event listener for exporting HTML
    exportHtmlBtn.addEventListener('click', () => {
        const fullHtml = generateStandaloneHTML(htmlPreview.innerHTML);
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'newsletter.html');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up the object URL
    });

    // Function to generate standalone HTML including basic styles
    function generateStandaloneHTML(content) {
        // Basic inline styles for email client compatibility
        // These are very basic; real newsletters often require extensive inline styling or a CSS inliner tool.
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa; /* Match main page background */
        }
        .newsletter-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 30px; /* More padding */
            border: 1px solid #dee2e6; /* Match main page border */
            border-radius: 4px; /* Rounded corners */
            box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* Subtle shadow */
        }
        img {
            max-width: 100%;
            height: auto;
            display: block; /* Prevents bottom space */
            margin-bottom: 1em;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        h1, h2, h3, h4, h5, h6 {
             color: #495057; /* Consistent heading color */
             margin-top: 1.5em;
             margin-bottom: 0.5em;
        }
        p {
             margin-bottom: 1em;
        }
        ul, ol {
             margin-bottom: 1em;
             padding-left: 25px;
        }
        li {
             margin-bottom: 0.5em;
        }
         pre {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 0.9em;
        }
        code {
            font-family: 'Courier New', Courier, monospace;
            background-color: #e9ecef;
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 0.9em;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: inherit; /* Inherit size from pre */
        }
        blockquote {
            border-left: 5px solid #ced4da;
            padding-left: 20px;
            margin-left: 0;
            margin-right: 0;
            color: #6c757d;
            font-style: italic;
        }
        /* Add more robust inline styles or use a CSS-inliner tool for production email clients */
    </style>
</head>
<body>
    <div class="newsletter-container">
        ${content} <!-- Embed the rendered Markdown content -->
    </div>
</body>
</html>
`;
    }
}); 