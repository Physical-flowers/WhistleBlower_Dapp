# WhistleBlower Frontend

This is the frontend for the WhistleBlower project, located in the `next-frontend` directory. This project is built with Next.js and integrates Aptos Wallet and Google OAuth for authentication.

## Usage

### Clone the Repository

1. Open your terminal.
2. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/whistleblower.git
   ```

### Navigate to Frontend Directory

3. Navigate to the frontend directory:
   ```sh
   cd whistleblower/next-frontend
   ```

### Install Dependencies

4. Install the necessary packages:
   ```sh
   npm install
   ```

### Start the Development Server

5. Start the Next.js development server:
   ```sh
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Explanation

### Project Overview

The WhistleBlower project is designed to allow users to securely upload PDF files, specify email recipients, and manage access through wallet and email authentication. The frontend is built with Next.js, utilizing Radix UI for component styling and Axios for API requests. The authentication is handled by integrating Aptos Wallet for blockchain interactions and Google OAuth for verifying user identities.

### Key Functionalities

1. **Wallet Connection**: Users can connect their Aptos wallet using the wallet selector component.
2. **PDF Upload**: Users can upload a PDF file and specify the recipient's email.
3. **Link Generation**: A unique link with a token is generated for the uploaded PDF and sent to the specified email.
4. **Email Verification**: The recipient can access the link, log in with Google OAuth, and the system verifies their email against the specified email.
5. **PDF Access**: If the email is verified, the recipient can view or download the PDF.

### User Flow

1. **Upload**: The user connects their wallet, uploads a PDF, specifies the recipient's email, and submits the form.
2. **Email**: The backend processes the request, stores the information, and sends an email with a unique link to the recipient.
3. **Verification**: The recipient clicks the link, logs in with Google, and the system verifies their email.
4. **Access**: Upon successful verification, the recipient can view or download the PDF.

### Technologies Used

- **Next.js**: Framework for building the React application.
- **Radix UI**: Library for accessible and customizable UI components.
- **Axios**: HTTP client for making API requests.
- **Aptos Wallet**: Integration for blockchain interactions.
- **Google OAuth**: Authentication for verifying user identities.

---

For any issues or contributions, please refer to the [GitHub repository](https://github.com/arfiligol/whistleblower).