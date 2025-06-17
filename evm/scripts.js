// Global variable to store file content
let uploadedFileContent = null;
let uploadedFileName = null;
let uploadedFileType = null;

const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const fileContentDisplay = document.getElementById('fileContentDisplay');

// Event listener for when a file is selected
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
        fileNameDisplay.textContent = `Selected file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        uploadedFileName = file.name;
        uploadedFileType = file.type;

        const reader = new FileReader();

        reader.onload = function(e) {
            // Store the file content in the global variable
            uploadedFileContent = e.target.result;

            // Display confirmation or a snippet of the content
            if (uploadedFileContent.length > 500) {
                fileContentDisplay.textContent = `File "${uploadedFileName}" loaded successfully. Size: ${(file.size / 1024).toFixed(2)} KB.\n\nContent (first 500 chars):\n${uploadedFileContent.substring(0, 500)}...`;
            } else {
                fileContentDisplay.textContent = `File "${uploadedFileName}" loaded successfully. Size: ${(file.size / 1024).toFixed(2)} KB.\n\nContent:\n${uploadedFileContent}`;
            }

            console.log('File content stored in uploadedFileContent:', uploadedFileContent);
            console.log('File Name:', uploadedFileName);
            console.log('File Type:', uploadedFileType);

            // You can now access uploadedFileContent, uploadedFileName, uploadedFileType globally
            // For example, in a later step, you would hash `uploadedFileContent`
            // and then use the wallet to sign that hash.
        };

        // Read the file as text. For binary files, you might use readAsArrayBuffer.
        // For signing, regardless of file type, you'll hash its binary representation.
        // For simplicity here, we read as text.
        reader.readAsText(file);
    } else {
        fileNameDisplay.textContent = 'No file chosen';
        fileContentDisplay.textContent = 'File content will appear here after upload, or a confirmation message.';
        uploadedFileContent = null;
        uploadedFileName = null;
        uploadedFileType = null;
    }
});