# AarogyaID Take Home Project

## 📱 APK Download

[Download the APK](https://expo.dev/accounts/shuraih/projects/arogyaid/builds/29badd75-2b31-4342-ab2a-31ef35e3b5d2)

## 🌐 Hosted Solution

[Access the Live App](https://arogyaid-take-home.onrender.com)

**Note:** The backend is hosted on a free service on **Render**, which may cause an initial response delay of approximately **50 seconds**. Please be patient while the service starts up [while using the app].

## 🛠️ Tech Stack

- **Frontend:** Expo (React Native)
- **Backend:** NestJS (Hosted on Render)

## 📊 API Interaction

### 1. Retrieve Records

The frontend interacts with the backend to fetch medical records using the following API:

**Endpoint:** `GET /records`

**Request Example:**

```javascript
await axios.get("https://arogyaid-take-home.onrender.com/records");
```

**Response Example:**

```json
[
  {
    "_id": "67d4330b2fbcef209f5b43bd",
    "type": "Imaging",
    "title": "MRI : Brain",
    "dynamicFields": {
      "description": "The patient presented with occasional headaches and dizziness",
      "doctor": "Dr. Surabhi Anand",
      "findings": "This MRI of the brain reveals no significant abnormalities."
    }
  }
  //other records
]
```

These records are then rendered on the screen.

### 2. Download PDF

When the user clicks view report link, the frontend requests a PDF version of the medical records through:

**Endpoint:** `GET /records/${recordId}/download`

**Request Example:**

```javascript
const downloadPdf = async (recordId) => {
  const response = await axios.get(
    `https://arogyaid-take-home.onrender.com/records/${recordId}/download`,
    { responseType: "blob" }
  );

  const base64 = await blobToBase64(response.data);

  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }
};
```

Based on the recordId we request the resource from the backend. We store it locally on the device also an interface is opened to facilitate sharing to other apps which can be used to view the report(By sharing to pdf reader apps).

## 📂 Project Structure

```
├── backend/         # NestJS API
└── arogyaid/        # Expo React Native App

```

## 📌 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shuraih775/arogyaid-take-home
cd arogyaid-take-home

```

### 2. Run the Backend

```bash
cd backend
npm install
npm run start:dev

```

### 3. Run the Frontend

```bash
cd arogyaid
npm install
npx expo start
// for production build
eas build -p android --profile production


```
