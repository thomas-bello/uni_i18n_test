<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ t('pages.merchant.title') }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const title = ref('Hello')

const { t } = useI18n()
</script>
