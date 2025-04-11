# Whistle Blower Project (Whisper Guard)

## 介紹

Whisper Guard 是一個 web2.0 用戶友善的去中心化應用（Dapp），旨在提供吹哨者向報社及主管機關匿名舉報並領取報酬的功能，在此應用中，吹哨者輸入受理機構之信箱後，本平台便會自動撰寫郵件通知受理機構，受理機構點入可信件內的連結即可透過 gmail 註冊錢包並查看吹哨者所傳遞之檔案，並在核實舉報內容後，透過平台發行之穩定幣向吹哨者發放獎金，此外，所有資料皆在客戶端進行加解密，因此沒有任何第三方機構(包含應用提供方)可以存取、串改、阻擋舉報者所傳遞之訊息，所有舉報紀錄皆會被鑄造成 NFT 並於區塊鏈上留下紀錄(詳細內容只有接授舉報方有權瀏覽)，可於日後吹哨者想打破匿名證明其身分時提供證明，在保障舉報者權益的同時，降低其受報復之可能性。此專案結合了前端、後端以及區塊鏈智能合約來實現完整的匿名舉報流程。

更詳細介紹以及 Data flow 請見:
- [Pitch 簡報 (新增QA的部分)](https://www.canva.com/design/DAGJNzpgac4/-lWnr2_bVHmX3Lf-EsgJvw/view?utm_content=DAGJNzpgac4&utm_campaign=designshare&utm_medium=link&utm_source=editor)
- [Pitch 影片](https://www.youtube.com/live/A6srD5fASdY?si=i3TF-iBj_FQaAc40&t=9877)

Demo 影片
- [Demo](https://www.youtube.com/watch?v=bmQuFdNiaA0)

我們提供了兩種語言版本的說明：
- [繁體中文](#繁體中文)
- [English](#English)

## 繁體中文

### 資料夾說明

- **next-frontend**: Dapp 的前端部分，使用 Next.js 構建，用戶可以通過此介面進行操作。
- **flask-backend**: 負責寄送電子郵件的後端服務，使用 Flask 框架實現。
- **typescript-backend**: 用來測試合約功能的後端服務，使用 Aptos Typescript SDK + Surf 快速實現與合約的互動。
- **Move**: 主要撰寫區塊鏈合約的地方，合約在此編寫並部署到 Aptos 區塊鏈。

### 使用流程

目前我們已實現的功能包括：
1. 前端 Gmail 登入獲得錢包
2. 上傳檔案並指定 email 對象 -> 提交
3. 加密檔案上傳至 IPFS，並通知後端寄送 email 給指定對象
4. 後端寄送 email，包含前端連結
5. 點擊連結跳轉回前端，開始進行 Gmail 登入流程
6. 登入後取得錢包
7. 可以 Transfer Token 給指定對象

### 流程外已實現的功能

1. 有一個介面可以從 IPFS 下載並解密檔案
2. Dapp 左邊有文件列表（預計要串接 NFT 合約）
3. GCP （Google Cloud Platform）有屬於我們 Dapp 自己的 OAuth 專案，非使用他人寫好的，實際使用 OAuth 2.0 的流程進行串接。
4. 發行穩定幣(智能合約)
5. 鑄造 NFT (智能合約)

### 未來預計實現的方向

1. 一般使用者登入與主管機關透過連結登入觸發不同函數（主管機關登入前端需與 Contract 及後端串接，使用者登入則不用）
2. 文件列表開啟時向 NFT Contract 獲取目前已有的文件
3. 實現點擊文件列表 Box 內 Button 可以下載舉報文件
4. 實現點擊文件列表 Box 內 Button 可以 Transfer Token
5. 實踐使用 ZK（零知識證明）來 Transfer Token，更加隱蔽舉報人
6. 使用授舉報方(報社、主管機關)錢包公私鑰對進行加解密

### 本地啟動 Dapp

#### 1. 部署合約

1. 進入 `Move` 資料夾，使用 Aptos CLI 初始化一個帳戶：
   ```bash
   cd Move
   aptos init
   ```
2. 選擇 DEVNET 作為連結的區塊鏈網路，接著透過此帳戶部署合約到 DEVNET 上：
   ```bash
   aptos move publish --package-dir .
   ```

#### 2. 啟動後端服務

1. 退回根目錄，進入 `flask-backend` 資料夾，創建並啟動虛擬環境：
   ```bash
   cd ../flask-backend
   python -m venv venv
   source venv/bin/activate  # 對於 Windows 使用 `venv\Scripts\activate`
   ```
2. 安裝必要的套件：
   ```bash
   pip install -r requirements.txt
   ```
3. 設定必要的環境變數（如 SMTP 相關資訊），然後啟動後端服務：
   ```bash
   export SMTP_SERVER=smtp.example.com
   export SMTP_PORT=587
   export SMTP_USERNAME=your_email@example.com
   export SMTP_PASSWORD=your_password
   python app.py
   ```

#### 3. 啟動前端

1. 退回根目錄，進入 `next-frontend` 資料夾，安裝必要的套件：
   ```bash
   cd ../next-frontend
   npm install
   ```
2. 啟動前端服務：
   ```bash
   npm run dev
   ```

#### 4. 測試合約

1. 進入 `typescript-backend` 資料夾並安裝必要的套件：
   ```bash
   cd ../typescript-backend
   npm install
   ```
2. 若要測試合約功能，請在 `src/contract/actions/<module_name>/<function_name>.ts` 中撰寫對應的功能。然後在 `src/index.ts` 中呼叫此功能：
   ```typescript
   // src/index.ts
   import { functionName } from './contract/actions/<module_name>/<function_name>';
   
   async function main() {
     await functionName();
   }
   
   main().catch(console.error);
   ```
3. 使用以下指令運行腳本：
   ```bash
   npx ts-node src/index.ts
   ```
完成上述步驟後，你就可以在本地運行和測試你的 Whistle Blower Dapp 了。

---

## English

### Folder Description

- **next-frontend**: The frontend part of the Dapp, built using Next.js, where users can interact with the interface.
- **flask-backend**: Backend service responsible for sending emails, implemented using the Flask framework.
- **typescript-backend**: Backend service for testing smart contracts, utilizing Aptos Typescript SDK + Surf to quickly interact with contracts and test their functionalities.
- **Move**: The main place where smart contracts are written and deployed to the Aptos blockchain.

### Usage Process

Currently, we have implemented the following features:
1. Gmail login on the frontend to obtain a wallet
2. Upload a file and specify an email recipient -> submit
3. Encrypt the file and upload it to IPFS, then notify the backend to send an email to the specified recipient
4. Backend sends an email containing a link to the frontend
5. Click the link to return to the frontend and start the Gmail login process
6. Log in to obtain the wallet
7. Transfer Token to the specified recipient

### Features Implemented Outside the Main Process

1. An interface for downloading and decrypting files from IPFS
2. A document list on the left side of the Dapp (planned to be connected to the NFT contract)
3. We have our own OAuth project on GCP (Google Cloud Platform), using the actual OAuth 2.0 process instead of pre-written solutions, which is part of Aptos Advanced.

### Future Directions

1. Different functions triggered by general user login and authority login via link (authority login frontend needs to interact with Contract and backend, while general user login does not)
2. When the document list is opened, retrieve the current documents from the NFT Contract
3. Implement the functionality to download whistleblower documents by clicking the button in the document list box
4. Implement the functionality to Transfer Token by clicking the button in the document list box
5. Use ZK (Zero-Knowledge Proof) to Transfer Token, making whistleblowers more anonymous

### Running the Dapp Locally

#### 1. Deploying the Contract

1. Navigate to the `Move` folder and initialize an account using the Aptos CLI:
   ```bash
   cd Move
   aptos init
   ```
2. Select DEVNET as the blockchain network to connect to, then deploy the contract to DEVNET using this account:
   ```bash
   aptos move publish --package-dir .
   ```

#### 2. Starting the Backend Service

1. Return to the root directory and navigate to the `flask-backend` folder. Create and activate a virtual environment:
   ```bash
   cd ../flask-backend
   python -m venv venv
   source venv/bin/activate  # For Windows, use `venv\Scripts\activate`
   ```
2. Install the necessary packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Set the necessary environment variables (such as SMTP-related information), then start the backend service:
   ```bash
   export SMTP_SERVER=smtp.example.com
   export SMTP_PORT=587
   export SMTP_USERNAME=your_email@example.com
   export SMTP_PASSWORD=your_password
   python app.py
   ```

#### 3. Starting the Frontend

1. Return to the root directory and navigate to the `next-frontend` folder. Install the necessary packages:
   ```bash
   cd ../next-frontend
   npm install
   ```
2. Start the frontend service:
   ```bash
   npm run dev
   ```

#### 4. Testing the Contract

1. Navigate to the `typescript-backend` folder and install the necessary packages:
   ```bash
   cd ../typescript-backend
   npm install
   ```
2. To test the contract functionality, write the corresponding function in `src/contract/actions/<module_name>/<function_name>.ts`. Then, call this function in `src/index.ts`:
   ```typescript
   // src/index.ts
   import { functionName } from './contract/actions/<module_name>/<function_name>';
   
   async function main() {
     await functionName();
   }
   
   main().catch(console.error);
   ```
3. Run the script using:
   ```bash
   npx ts-node src/index.ts
   ```
