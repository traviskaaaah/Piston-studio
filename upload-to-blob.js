const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Get token from environment variable
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN not found!');
  console.log('Set it with: set BLOB_READ_WRITE_TOKEN=your_token_here');
  process.exit(1);
}

async function uploadFile(filePath, blobPath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    console.log(`📤 Uploading: ${fileName}...`);
    
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
      token: BLOB_TOKEN,
    });
    
    console.log(`✅ Uploaded: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`❌ Failed to upload ${filePath}:`, error.message);
    return null;
  }
}

async function uploadDirectory(dirPath, prefix) {
  const files = fs.readdirSync(dirPath);
  const urls = {};
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const blobPath = `${prefix}/${file}`;
    const url = await uploadFile(filePath, blobPath);
    if (url) {
      urls[file] = url;
    }
  }
  
  return urls;
}

async function main() {
  console.log('🚀 Starting upload to Vercel Blob Storage...\n');
  
  const audioDir = path.join(__dirname, 'public', 'audio');
  const videoDir = path.join(__dirname, 'public', 'videos');
  
  // Upload audio files
  console.log('📁 Uploading audio files...');
  const audioUrls = await uploadDirectory(audioDir, 'audio');
  
  console.log('\n📁 Uploading video files...');
  const videoUrls = await uploadDirectory(videoDir, 'videos');
  
  // Save URLs to JSON file
  const urlsData = {
    audio: audioUrls,
    videos: videoUrls,
  };
  
  fs.writeFileSync(
    path.join(__dirname, 'blob-urls.json'),
    JSON.stringify(urlsData, null, 2)
  );
  
  console.log('\n✅ All uploads complete!');
  console.log('📄 URLs saved to blob-urls.json');
}

main().catch(console.error);
