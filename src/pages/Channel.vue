<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import Layout from '../components/layout/Layout.vue'

import Loading from '../components/layout/Loading.vue'

import ChannelVideoCard from '../components/channel/ChannelVideoCard.vue'

import {
  getChannel,
  getChannelVideos
} from '../api/invidious'

const route = useRoute()

const loading = ref(true)

const channel = ref<any>(null)

const videos = ref<any[]>([])

onMounted(async () => {
  try {
    const id = route.params.id as string

    channel.value = await getChannel(id)

    videos.value = await getChannelVideos(id)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Layout>

    <Loading v-if="loading" />

    <div
      v-else
      class="max-w-[1600px] mx-auto bg-white min-h-screen"
    >

      <div class="relative h-[240px] bg-gray-200">
        <img
          v-if="channel?.authorBanners?.[0]?.url"
          :src="channel.authorBanners[0].url"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="px-10">

        <div class="flex gap-8 pt-8">

          <img
            :src="channel?.authorThumbnails?.[0]?.url"
            class="w-40 h-40 rounded-full object-cover border-4 border-white -mt-20 shadow-md"
          />

          <div class="flex-1">

            <h1 class="text-4xl font-bold text-black">
              {{ channel?.author }}
            </h1>

            <div class="text-gray-500 mt-3">
              @{{ channel?.author }}
            </div>

            <div class="text-gray-500 mt-1">
              {{ channel?.subCount }} subscribers
            </div>

            <div class="mt-4 text-gray-700 whitespace-pre-wrap">
              {{ channel?.description }}
            </div>

            <button
              class="mt-6 bg-black text-white px-6 h-10 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>

          </div>

        </div>

        <div class="mt-12 space-y-8 pb-20">

          <ChannelVideoCard
            v-for="video in videos"
            :key="video.videoId"
            :video="video"
          />

        </div>

      </div>

    </div>

  </Layout>
</template>
