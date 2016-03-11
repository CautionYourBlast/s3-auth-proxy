# S3 Authentication Proxy

Add BASIC authentication to an S3 bucket.

## Build / run

The easiest way to run the proxy is using docker. Build the image with `docker build -r s3-auth-proxy .` and then start,
specifying a fw environment variables to connect to the right bucket.

```
docker run -p 3000:3000 -e "USERNAME=user" -e "PASSWORD=password" -e "S3_BUCKET=your-bucket" -e "AWS_ACCESS_KEY=xxx" -e "AWS_SECRET_KEY=yyy" s3-auth-proxy
```

You can also run using nodejs after doing an `npm install` with `node  .`
