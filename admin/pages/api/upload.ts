import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'ecommerce',
    format: 'jpg', // or extract from file.mimetype if needed
    public_id: file.originalname.split('.')[0],
  }),
});


const upload = multer({ storage });

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single('file'));

handler.post((req: any, res: NextApiResponse) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(200).json({
    message: 'File uploaded successfully',
    url: file.path,
    public_id: file.filename,
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
