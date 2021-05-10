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
