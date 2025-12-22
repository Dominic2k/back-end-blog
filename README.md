# Backend Mini Project - Source Base

Tài liệu này mô tả cấu trúc source base, các công nghệ sử dụng và quy trình khởi tạo dự án.

## 1. Tech Stack

-   **Runtime:** Node.js
-   **Language:** TypeScript
-   **Framework:** Express.js
-   **Database ORM:** Prisma
-   **Database:** PostgreSQL
-   **Validation:** class-validator, class-transformer
-   **Authentication:** JWT, bcryptjs
-   **Logging:** Winston

---

## 2. Quá trình Khởi tạo Source Base

Dưới đây là các bước chi tiết đã được thực hiện để xây dựng khung dự án này.

### Bước 1: Khởi tạo Dự án và Cài đặt TypeScript

1.  **Tạo thư mục và khởi tạo Node.js:**

    ```bash
    mkdir my-new-base
    cd my-new-base
    npm init -y
    ```

2.  **Cài đặt TypeScript và các công cụ hỗ trợ:**

    ```bash
    npm install --save-dev typescript ts-node nodemon @types/node
    ```

3.  **Cấu hình TypeScript (`tsconfig.json`):**
    Chạy lệnh `npx tsc --init` và cập nhật cấu hình để hỗ trợ Decorators (cho `class-validator`) và đường dẫn build:
    ```json
    {
        "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "rootDir": "./src",
            "outDir": "./dist",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true,
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true
        }
    }
    ```

### Bước 2: Cài đặt Dependencies

1.  **Express và Middleware (Cors, Helmet, Compression):**

    ```bash
    npm install express dotenv cors helmet compression
    npm install --save-dev @types/express @types/cors @types/compression
    ```

2.  **Database (Prisma & PostgreSQL):**

    ```bash
    npm install @prisma/client pg
    npm install --save-dev prisma
    ```

3.  **Authentication & Validation:**
    _Lưu ý: `reflect-metadata` cần được import ở file entry point._

    ```bash
    npm install bcryptjs jsonwebtoken class-validator class-transformer reflect-metadata
    npm install --save-dev @types/bcryptjs @types/jsonwebtoken
    ```

4.  **Logging:**
    ```bash
    npm install winston
    ```

### Bước 3: Thiết lập Cấu trúc Thư mục

Cấu trúc dự án được tổ chức như sau:

```plaintext
.
├── prisma/             # Chứa schema.prisma và migrations
├── src/
│   ├── config/         # Cấu hình môi trường, DB connection
│   ├── common/         # Các thành phần dùng chung (Constants, Enums)
│   │   └── dtos/       # Data Transfer Objects chung
│   ├── helpers/        # Các hàm tiện ích nhỏ
│   ├── middleware/     # Express middlewares (Auth, Error handling)
│   ├── modules/        # Logic nghiệp vụ chính (Controller, Service)
│   ├── routes/         # Định nghĩa API routes
│   ├── utils/          # Các tiện ích lớn (Logger, Response handler)
│   └── validators/     # Custom validators
├── .env                # Biến môi trường (Không push lên git)
├── .gitignore
├── package.json
└── tsconfig.json
```

Bước này không cần tạo file .env và folder prisma, lệnh dưới sẽ tạo giúp bạn

### Bước 4: Khởi tạo Prisma

Chạy lệnh sau để khởi tạo Prisma:

```
npx prisma init --datasource-provider postgresql

```

Lệnh này sẽ tạo thư mục prisma với file schema.prisma và file .env.

## 3. Hướng dẫn cho Developer (Getting Started)

1.  **Clone repository** về máy.
2.  Chạy `npm install` để cài đặt các thư viện.
3.  Copy file `.env.example` thành `.env` và điền thông tin Database.
4.  Chạy `npx prisma generate` để tạo Prisma Client.
5.  Bắt đầu code!
