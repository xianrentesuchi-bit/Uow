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
    <div class="bg-white text-[#0f0f0f] min-h-screen antialiased">

      <!-- material icons -->
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      >

      <div class="max-w-[1700px] mx-auto px-6 py-8">

        <!-- header -->
        <div class="flex items-center justify-between mb-10">

          <div>
            <h1
              class="text-[36px] font-bold tracking-[-1px] text-[#0f0f0f]"
              style="font-family: Roboto, Arial, sans-serif;"
            >
              プレイリスト
            </h1>

            <div
              class="text-[#606060] mt-1 text-[14px]"
              style="font-family: Roboto, Arial, sans-serif;"
            >
              保存したプレイリスト
            </div>
          </div>

          <button
            class="h-10 px-5 rounded-full border border-[#d3d3d3] bg-white hover:bg-[#f2f2f2] text-[#0f0f0f] text-[14px] font-medium transition duration-150 flex items-center gap-2"
            style="font-family: Roboto, Arial, sans-serif;"
            @click="createPlaylist"
          >
            <span class="material-symbols-outlined text-[22px]">
              add
            </span>

            新しいプレイリスト
          </button>

        </div>

        <!-- playlist exists -->
        <div
          v-if="playlists.length"
          class="space-y-14"
        >

          <div
            v-for="playlist in playlists"
            :key="playlist.id"
          >

            <!-- playlist header -->
            <div class="flex items-center justify-between mb-6">

              <div>
                <div
                  class="text-[26px] font-bold text-[#0f0f0f] hover:text-black cursor-pointer transition"
                  style="font-family: Roboto, Arial, sans-serif;"
                >
                  {{ playlist.name }}
                </div>

                <div
                  class="text-[14px] text-[#606060] mt-1"
                  style="font-family: Roboto, Arial, sans-serif;"
                >
                  {{ playlist.videos.length }} 本の動画
                </div>
              </div>

              <button
                class="h-9 px-4 rounded-full hover:bg-[#f2f2f2] text-[#0f0f0f] text-[14px] font-medium flex items-center gap-2 transition"
                style="font-family: Roboto, Arial, sans-serif;"
                @click="deletePlaylist(playlist.id)"
              >
                <span class="material-symbols-outlined text-[20px]">
                  delete
                </span>

                削除
              </button>

            </div>

            <!-- videos -->
            <div
              v-if="playlist.videos.length"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10"
            >

              <RouterLink
                v-for="video in playlist.videos"
                :key="video.videoId"
                :to="`/watch/${video.videoId}`"
                class="group"
              >

                <!-- thumbnail -->
                <div
                  class="relative w-full aspect-video overflow-hidden rounded-xl bg-[#f2f2f2]"
                >

                  <img
                    :src="video.thumbnail"
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition duration-200"
                  >

                </div>

                <!-- meta -->
                <div class="flex gap-3 mt-3">

                  <div
                    class="w-9 h-9 rounded-full bg-[#e5e5e5] flex-shrink-0"
                  />

                  <div class="flex flex-col min-w-0">

                    <div
                      class="text-[16px] font-medium leading-[22px] line-clamp-2 text-[#0f0f0f]"
                      style="font-family: Roboto, Arial, sans-serif;"
                    >
                      {{ video.title }}
                    </div>

                    <div
                      class="text-[14px] text-[#606060] mt-1 truncate hover:text-[#0f0f0f]"
                      style="font-family: Roboto, Arial, sans-serif;"
                    >
                      {{ video.author }}
                    </div>

                  </div>

                </div>

              </RouterLink>

            </div>

            <!-- empty videos -->
            <div
              v-else
              class="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] py-14 flex flex-col items-center justify-center"
            >

              <span
                class="material-symbols-outlined text-[64px] text-[#909090]"
              >
                playlist_play
              </span>

              <div
                class="mt-5 text-[20px] font-medium text-[#0f0f0f]"
                style="font-family: Roboto, Arial, sans-serif;"
              >
                動画がありません
              </div>

              <div
                class="text-[#606060] text-[14px] mt-2"
                style="font-family: Roboto, Arial, sans-serif;"
              >
                このプレイリストにはまだ動画が保存されていません
              </div>

            </div>

          </div>

        </div>

        <!-- no playlists -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-36"
        >

          <div
            class="w-28 h-28 rounded-full bg-[#f2f2f2] flex items-center justify-center"
          >

            <span
              class="material-symbols-outlined text-[52px] text-[#606060]"
            >
              video_library
            </span>

          </div>

          <div
            class="mt-8 text-[28px] font-bold text-[#0f0f0f]"
            style="font-family: Roboto, Arial, sans-serif;"
          >
            プレイリストがありません
          </div>

          <div
            class="text-[#606060] mt-3 text-center max-w-md text-[15px] leading-[24px]"
            style="font-family: Roboto, Arial, sans-serif;"
          >
            お気に入りの動画を保存して<br>
            YouTube のようにプレイリストを整理できます
          </div>

          <button
            class="mt-8 h-10 px-5 rounded-full bg-[#0f0f0f] hover:bg-black text-white text-[14px] font-medium transition duration-150 flex items-center gap-2"
            style="font-family: Roboto, Arial, sans-serif;"
            @click="createPlaylist"
          >

            <span class="material-symbols-outlined text-[20px]">
              add
            </span>

            プレイリストを作成

          </button>

        </div>

      </div>

    </div>
  </Layout>
</template>
