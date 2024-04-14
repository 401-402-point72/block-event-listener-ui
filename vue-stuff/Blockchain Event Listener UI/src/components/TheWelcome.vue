<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import S3 from './S3.vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    AWS JS SDK
    <a href="https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_s3_code_examples.html" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.

    <br><br> <h3 style="color: white;">Dependenceis</h3>
    npm i @aws-sdk/client-s3<br>
    npm install --save-dev dotenv dotenv-webpack

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>

    <template #heading>Ethereum Objects</template>
    <!-- Insert S3 .vue component here -->
    <S3/>
   
  </WelcomeItem>
  
</template>
