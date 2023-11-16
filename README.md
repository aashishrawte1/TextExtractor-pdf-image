## Assumption made for approaching the task
    > Invoice Structure Assumption:
        The structure of the invoice (PDF or image) is assumed to have specific sections like "Invoice Number," "Total," and "Billed from."
        The structure of the invoice is assumed to be consistent across different documents.

    > PDF Handling:
        PDFs are assumed to be converted to images for text extraction using pdfjs-dist.
        Each page of the PDF is considered a separate image for Tesseract.js text extraction.

    > Tesseract.js Text Extraction:
        Tesseract.js is assumed to be capable of extracting text accurately from images with clear and well-formatted content.
        The extraction logic for invoice number, invoice amount, and supplier name relies on simple regular expressions that may need adjustment based on the actual content and variations in invoices.

    > User Interface:
        The user interface assumes a simple setup with a file input for selecting PDF or image files.
        The extracted data is displayed in a table format.

    > Dependencies:
        It is assumed that the necessary dependencies (@react-pdf-viewer/core, @react-pdf-viewer/pdfjs-dist, and tesseract.js) are available and can be installed using Yarn.

    > Image and PDF Source:
        The source of the image or PDF is assumed to be from the user's local device through a file input.

    > Extraction Logic:
        The extraction logic for invoice number, invoice amount, and supplier name is based on the provided sample text. Adjustments may be needed for variations in the actual documents.

    > Regular Expressions:
        The regular expressions used for text extraction assume a certain format in the provided sample text and may need modification for other variations.

## List any flows you would cater if you developing this
    > File Input Validation:
        Check that the user uploads a valid file (PDF or image) using appropriate file type validation.
        Handle cases where the uploaded file is corrupted or not in a supported format.

    > PDF Handling:
        Ensure that the PDF rendering and conversion to images cover various PDF formats and potential issues.
        Handle multi-page PDFs and coordinate the extraction logic across all pages.

    > Tesseract.js Accuracy:
        Account for potential inaccuracies in text extraction using Tesseract.js. Implement error handling and logging to identify and address any issues.

    > Dynamic Extraction Logic:
        Make the extraction logic flexible and dynamic to accommodate variations in the structure and content of invoices. Allow for customization or configuration of extraction rules.

    > User Interface Feedback:
        Provide clear feedback to the user during file upload, conversion, and text extraction processes.
        Display loading spinners or progress indicators to indicate ongoing operations.

    > Error Handling:
        Implement error handling mechanisms for various stages, such as file loading errors, Tesseract.js errors, or PDF rendering issues.
        Display informative error messages to guide users in case of failures.

    > User Experience:
        Design a user-friendly interface with clear instructions and intuitive controls.
        Consider accessibility features to ensure the application is usable by individuals with disabilities.

    > Testing:
        Perform thorough testing with a variety of sample PDFs and images, including documents with different layouts, fonts, and structures.
        Conduct usability testing to identify and address any potential user experience issues.

    > Security:
        Implement security measures to ensure the confidentiality and integrity of uploaded documents.
        Avoid executing untrusted code or handling sensitive information inappropriately.

    > Performance Optimization:
        Optimize the performance of the application, especially when handling large PDFs or images.
        Consider implementing features like lazy loading for PDF pages or images to improve efficiency.

    > Configurability:
        Allow users or administrators to configure extraction parameters, such as language settings for Tesseract.js or custom extraction rules.