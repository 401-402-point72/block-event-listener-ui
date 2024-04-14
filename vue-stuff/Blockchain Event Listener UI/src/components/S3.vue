  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
  
  export default {
    setup() {
      const s3Objects = ref([]);
      const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
      const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
    
  
      onMounted(async () => {
        const s3Client = new S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId,
                secretAccessKey, 
            }
        });
        const bucketName = "rustbucketethereum";
  
        try {
          const response = await s3Client.send(
            new ListObjectsV2Command({ Bucket: bucketName })
          );
  
          if (response.Contents) {
            s3Objects.value = response.Contents;
          }
        } catch (error) {
          console.error("Error fetching S3 objects:", error);
        }
      });
  
      return {
        s3Objects,
      };
    },
  };
  </script>
  
<template>
<div>
    <ul>
    <li v-for="object in s3Objects" :key="object.Key">
        {{ object.Key }}
    </li>
    </ul>
</div>
</template>
