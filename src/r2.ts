import { S3Client } from "@aws-sdk/client-s3";

const r2ClientSingleton = () => {
    return new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT!,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
        requestStreamBufferSize: 32 * 1024,
        requestChecksumCalculation: "WHEN_REQUIRED",
        requestHandler: {
            requestTimeout: 30 * 60 * 1000, // 30 minutes
        }
    })
}

declare global {
    var r2ClientGlobal: undefined | ReturnType<typeof r2ClientSingleton>;
}

const r2 = globalThis.r2ClientGlobal ?? r2ClientSingleton();

export default r2;

if (process.env.NODE_ENV !== "production") globalThis.r2ClientGlobal = r2;