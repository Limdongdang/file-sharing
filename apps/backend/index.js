import express from 'express';
import * as Minio from 'minio';
import multer from 'multer';
import path from 'path';
import { sequelize } from './src/model/index.js';
import { fileURLToPath } from 'url';
import { File } from './src/model/file.model.js';
import { specs, swaggerUi } from './src/swagger.js';
import fileRoutes from './src/routes/file.js';

const app = express();
const port = 3000;

app.use(express.json());

// swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/file', fileRoutes);

// MySQL 연결
await sequelize.sync({ force: false })
  .then(() => {
    console.log('MySQL 연결 성공');
  })
  .catch((err) => {
    console.error('MySQL 연결 오류:', err);
  });


// MinIO 클라이언트 설정
const minioClient = new Minio.Client({
  endPoint: 'localhost',
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


// 파일 조회
// app.get('/uploadedFiles', (req, res) => {
//   // MySQL에서 파일 목록 조회
//   db.query('SELECT * FROM files', (err, results) => {
//     if (err) {
//       console.error('파일 조회 오류:', err);
//       res.status(500).send('파일 조회 오류');
//       return;
//     }
//     res.json(results);
//   });
// });

// 파일 정보 저장
// app.post('/saveFileInfo', (req, res) => {
//   const { name } = req.body;

//   const url = `http://localhost:9000/uploads/${name}`;

//   // MySQL에 파일 정보 저장
//   db.query('INSERT INTO files (filename, fileurl) VALUES (?, ?)', [name, url], (err) => {
//     if (err) {
//       console.error('파일 정보 저장 오류:', err);
//       res.status(500).send('파일 정보 저장 오류');
//       return;
//     }
//     res.send('파일 정보 저장 완료');
//   });
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML 폼 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});