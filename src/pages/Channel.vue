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
      class="max-w-[1600px] mx-auto"
    >

      <div class="relative h-[240px] bg-zinc-800">
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
            class="w-40 h-40 rounded-full object-cover"
          />

          <div class="flex-1">

            <h1 class="text-4xl font-bold">
              {{ channel?.author }}
            </h1>

            <div class="text-zinc-400 mt-3">
              @{{ channel?.author }}
            </div>

            <div class="text-zinc-400 mt-1">
              {{ channel?.subCount }} subscribers
            </div>

            <div class="mt-4 text-zinc-300 whitespace-pre-wrap">
              {{ channel?.description }}
            </div>

            <button
              class="mt-6 bg-white text-black px-6 h-10 rounded-full font-semibold"
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
