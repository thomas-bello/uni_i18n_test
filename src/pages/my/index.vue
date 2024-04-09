<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ t('pages.my.title') }}</text>

      <text class="title">{{ t('pages.my.add') }}</text>
      <text class="title">{{ t('pages.my.post') }}</text>
    </view>

    <picker @change="bindLangPickerChange" :value="locale" range-key="label" :range="langs">
      <view class="uni-input">{{ currentLangLabel }}</view>
    </picker>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LocaleType } from '@/plugins/i18n'

const { t, locale } = useI18n({
  useScope: 'global',
  messages: {
    en: {
      'pages.my.add': 'Add',
      'pages.my.post': 'Post'
    },
    'zh-Hans': {
      'pages.my.add': '创建',
      'pages.my.post': '发布职'
    }
  }
})

const langs: { label: string; value: LocaleType }[] = [
  {
    label: 'English',
    value: 'en'
  },
  {
    label: '简体中文',
    value: 'zh-Hans' // 简体中文
  }
]

const currentLangLabel = computed(() => {
  return langs.find((item) => item.value === locale.value)?.label
})

const bindLangPickerChange = (e: any) => {
  const val = langs[e.detail.value].value

  console.log('bindLangPickerChange', e, e.detail.value, 'val', val)
  console.log('bindLangPickerChange val', val)

  locale.value = val
}

watch(
  () => locale.value,
  (val) => {
    console.log('locale changed:', val)

    uni.setLocale(val)
    uni.setStorageSync('locale', val)

    console.log('locale changed uni.getLocale()', uni.getLocale())

    uni.reLaunch({
      url: '/pages/my/index'
    })
  }
)
</script>
