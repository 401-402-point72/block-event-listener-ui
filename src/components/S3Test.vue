<template>
    <div class="s3-download-json">
      <h1>Download Readable S3 Bucket Data as JSON</h1>
      <p v-if="error">{{ error }}</p>
      <button @click="downloadReadableS3DataAsJson">Download Readable JSON</button>
    </div>
  </template>
  
  <script>
  import s3Client from "@/services/s3Client";
  import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
  
  export default {
    data() {
      return {
        s3Objects: [],
        error: null,
        bucketName: "rustbucketethereum",
      };
    },
    methods: {
      async fetchS3Objects() {
        try {
          const response = await s3Client.send(
            new ListObjectsV2Command({ Bucket: this.bucketName })
          );
          this.s3Objects = response.Contents || [];
        } catch (error) {
          this.error = `Error connecting to S3: ${error.message}`;
        }
      },
  
      async downloadReadableS3DataAsJson() {
        if (this.s3Objects.length === 0) {
          await this.fetchS3Objects(); 
        }
  
        const fullData = [];
        for (const object of this.s3Objects) {
          try {
            const getObjectParams = { Bucket: this.bucketName, Key: object.Key };
            const objectData = await s3Client.send(
              new GetObjectCommand(getObjectParams)
            );
  
            // Read object data and convert to a readable JSON format
            const data = await objectData.Body.transformToString();
            const jsonContent = JSON.parse(data); // Parse the raw data
            fullData.push({ key: object.Key, content: jsonContent });
          } catch (error) {
            this.error = `Error retrieving data for ${object.Key}: ${error.message}`;
          }
        }
  
        const formattedJson = JSON.stringify(fullData, null, 4); // Create readable JSON with indentation
        const blob = new Blob([formattedJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
  
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "s3-readable-data.json"; // Name of the downloadable file
        downloadLink.click();
  
        URL.revokeObjectURL(url); // Clean up the URL object
      },
    },
  };
  </script>
  
  <style scoped>
  .s3-download-json {
    color: gray;
  }
  </style>
  