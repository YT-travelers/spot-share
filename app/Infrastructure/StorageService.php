<?php


namespace App\Infrastructure;


use Aws\S3\S3Client;
use Illuminate\Http\UploadedFile as File;

class StorageService
{
    private S3Client $s3Client;

    public function __construct()
    {
        $this->s3Client = app('aws')->createClient('s3');
    }

    public function store(File $file, string $key)
    {
        $this->s3Client->putObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $key,
            'SourceFile' => $file->getRealPath(),
        ]);
    }

    public function storeDataEncodedByBase64WithUUid(string $base64Data, string $prefix): string
    {
        list($metaData, $fileData) = explode(';', $base64Data);
        list(, $extension) = explode('/', $metaData);
        list(, $fileData) = explode(',', $fileData);
        $fileData = base64_decode($fileData);
        $_key = uniqid($prefix, true);
        $key = $_key. ".$extension";
        $this->s3Client->upload(
            env('AWS_BUCKET'),
            $key,
            $fileData
        );

        return $key;
    }

    public function storeWithUuid(File $file, string $prefix = ""): string
    {
        $_key = uniqid($prefix, true);
        $extension = $file->extension();
        $key = $_key. ".$extension";
        $this->store($file, $key);

        return $key;
    }

    public function delete(string $key)
    {
        $this->s3Client->deleteObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $key,
        ]);
    }

    public function createPreSignedUrl(string $key): string
    {
        $cmd = $this->s3Client->getCommand('GetObject', [
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $key
        ]);

        return $this
            ->s3Client
            ->createPresignedRequest($cmd, '+3 minutes')
            ->getUri();
    }

    public function listObjects(): array
    {
        $list = $this->s3Client->listObjects([
            'Bucket' => env('AWS_BUCKET')
        ]);

        foreach ($list['Contents'] as $img) {
            $result[] = $img['Key'];
        }

        return $result;
    }
}
