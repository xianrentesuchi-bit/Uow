<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Layout from '../components/layout/Layout.vue'

const playlists = ref<any[]>([])

function loadPlaylists() {
  playlists.value = JSON.parse(
    localStorage.getItem('playlists') || '[]'
  )
}

function createPlaylist() {
  const name = prompt('プレイリスト名')

  if (!name) return

  const playlist = {
    id: crypto.randomUUID(),
    name,
    videos: [],
    createdAt: Date.now()
  }

  playlists.value.unshift(playlist)

  localStorage.setItem(
    'playlists',
    JSON.stringify(playlists.value)
  )
}

function deletePlaylist(id: string) {
  playlists.value = playlists.value.filter(
    (playlist) => playlist.id !== id
  )

  localStorage.setItem(
    'playlists',
    JSON.stringify(playlists.value)
  )
}

onMounted(() => {
  loadPlaylists()
})
</script>

<template>
  <Layout>
    <div class="bg-[#0f0f0f] text-[#f1f1f1] min-h-screen font-roboto antialiased">
      <div class="max-w-[1800px] mx-auto px-6 py-8">

        <div class="flex items-center justify-between mb-10">

          <div>
            <h1 class="text-[32px] font-bold tracking-tight text-[#f1f1f1]">
              プレイリスト
            </h1>

            <div class="text-[#aaa] mt-2 text-[15px]">
              保存したプレイリスト
            </div>
          </div>

          <button
            class="h-9 px-4 rounded-full bg-[#f1f1f1] text-[#0f0f0f] text-[14px] font-medium hover:bg-[#d9d9d9] transition duration-200 flex items-center justify-center gap-1"
            @click="createPlaylist"
          >
            <span class="text-lg font-light">+</span> 新しいプレイリスト
          </button>

        </div>

        <div
          v-if="playlists.length"
          class="space-y-12"
        >

          <div
            v-for="playlist in playlists"
            :key="playlist.id"
          >

            <div class="flex items-end justify-between mb-5 border-b border-[#272727] pb-4">

              <div>
                <div class="text-2xl font-bold text-[#f1f1f1] hover:text-white cursor-pointer inline-block">
                  {{ playlist.name }}
                </div>

                <div class="text-sm text-[#aaa] mt-1 font-normal">
                  {{ playlist.videos.length }} 本の動画
                </div>
              </div>

              <button
                class="h-9 px-4 rounded-full bg-[#272727] hover:bg-[#3f3f3f] text-[#f1f1f1] transition duration-200 text-[14px] font-medium"
                @click="deletePlaylist(playlist.id)"
              >
                削除
              </button>

            </div>

            <div
              v-if="playlist.videos.length"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >

              <RouterLink
                v-for="video in playlist.videos"
                :key="video.videoId"
                :to="`/watch/${video.videoId}`"
                class="group flex flex-col gap-y-2 cursor-pointer"
              >

                <div class="relative w-full aspect-video overflow-hidden rounded-xl bg-[#272727]">
                  <img
                    :src="video.thumbnail"
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-200"
                  >
                </div>

                <div class="flex flex-col pr-6">
                  <div
                    class="mt-1 font-medium text-[15px] leading-[22px] line-clamp-2 text-[#f1f1f1] break-all"
                  >
                    {{ video.title }}
                  </div>

                  <div class="text-[14px] text-[#aaa] mt-1 font-normal hover:text-[#f1f1f1] transition-colors">
                    {{ video.author }}
                  </div>
                </div>

              </RouterLink>

            </div>

            <div
              v-else
              class="text-[#aaa] text-[14px] py-4"
            >
              動画がありません
            </div>

          </div>

        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-32 text-center"
        >

          <div
            class="w-32 h-32 rounded-full bg-[#272727] flex items-center justify-center text-5xl mb-2"
          >
            📂
          </div>

          <div class="mt-6 text-[24px] font-normal text-[#f1f1f1]">
            プレイリストがありません
          </div>

          <div class="text-[#aaa] mt-2 text-center max-w-sm text-[14px] leading-[20px]">
            お気に入りの動画を保存して<br>自分だけのプレイリストを作成できます
          </div>

          <button
            class="mt-8 h-9 px-4 rounded-full bg-[#f1f1f1] text-[#0f0f0f] text-[14px] font-medium hover:bg-[#d9d9d9] transition duration-200"
            @click="createPlaylist"
          >
            プレイリストを作成
          </button>

        </div>

      </div>
    </div>
  </Layout>
</template>
