const express = require('express');
const mysql = require('mysql');
const Minio = require('minio');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'exampleuser',
  password: process.env.DB_PASSWORD || 'examplepass',
  database: process.env.DB_NAME || 'exampledb'
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// MinIO 클라이언트 설정
const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'minio',
  secretKey: 'minio123'
});

const bucketName = 'uploads';

// 버킷 생성 및 권한 설정
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error('MinIO 버킷 확인 오류:', err);
    return;
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) {
        console.error('MinIO 버킷 생성 오류:', err);
        return;
      }
      console.log(`MinIO 버킷 '${bucketName}'이 생성되었습니다.`);

      // 버킷 정책 설정
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject", "s3:PutObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      };

      minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
        if (err) {
          console.error('MinIO 버킷 정책 설정 오류:', err);
          return;
        }
        console.log(`MinIO 버킷 '${bucketName}'에 대한 정책이 설정되었습니다.`);
      });
    });
  } else {
    console.log(`MinIO 버킷 '${bucketName}'이 이미 존재합니다.`);

    // 버킷 정책 설정
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: "*",
          Action: ["s3:GetObject", "s3:PutObject"],
          Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
      ]
    };

    minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
      if (err) {
        console.error('MinIO 버킷 정책 설정 오류:', err);
        return;
      }
      console.log(`MinIO 버킷 '${bucketName}'에 대한 정책이 설정되었습니다.`);
    });
  }
});

// Multer 설정
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 사전 서명된 URL 생성 라우트
app.get('/presignedUrl', async (req, res) => {

  await minioClient.presignedPutObject('uploads', req.query.name, 24 * 60 * 60, (err, url) => {
    if (err) throw err

    const fixedUrl = url.replace('http://minio:9000', 'http://localhost:9002');
    res.send(fixedUrl);
  })
});

// HTML 폼 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});