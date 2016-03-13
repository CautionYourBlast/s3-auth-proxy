# S3 Authentication Proxy

Add BASIC authentication to an S3 bucket.

## Build / run

The easiest way to run the proxy is using docker. Build the image with `docker build -t s3-auth-proxy .` and then start,
specifying a few environment variables to connect to the right bucket.

```
docker run -p 3000:3000 -e "USERNAME=user" -e "PASSWORD=password" -e "S3_BUCKET=your-bucket" -e "AWS_ACCESS_KEY=xxx" -e "AWS_SECRET_KEY=yyy" s3-auth-proxy
```

You can also run using node.js after doing an `npm install` with `node  .`. The environment variables will need to be set in your shell prior to executing.

After starting the application you can access your site at `http://localhost:3000`.
