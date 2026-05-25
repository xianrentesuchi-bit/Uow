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

    <!-- fonts -->
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Material+Symbols+Outlined"
      rel="stylesheet"
    >

    <div
      class="bg-white text-[#0f0f0f] min-h-screen antialiased"
      style="font-family: Roboto, Arial, sans-serif;"
    >

      <div class="max-w-[1800px] mx-auto px-6 py-8">

        <!-- header -->
        <div class="flex items-center justify-between mb-10">

          <div>

            <h1
              class="text-[36px] font-bold tracking-[-1px] leading-none"
            >
              プレイリスト
            </h1>

            <div
              class="text-[#606060] mt-2 text-[14px] font-normal"
            >
              保存したプレイリスト
            </div>

          </div>

          <button
            class="h-10 px-4 rounded-full border border-[#d3d3d3] bg-white hover:bg-[#f2f2f2] active:bg-[#e5e5e5] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium"
            @click="createPlaylist"
          >

            <span class="material-symbols-outlined text-[22px]">
              add
            </span>

            新しいプレイリスト

          </button>

        </div>

        <!-- playlists -->
        <div
          v-if="playlists.length"
          class="space-y-14"
        >

          <div
            v-for="playlist in playlists"
            :key="playlist.id"
          >

            <!-- playlist header -->
            <div
              class="flex items-center justify-between mb-6"
            >

              <div>

                <div
                  class="text-[28px] font-bold tracking-[-0.5px] text-[#0f0f0f]"
                >
                  {{ playlist.name }}
                </div>

                <div
                  class="text-[14px] text-[#606060] mt-1"
                >
                  {{ playlist.videos.length }} 本の動画
                </div>

              </div>

              <button
                class="h-10 px-4 rounded-full hover:bg-[#f2f2f2] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#0f0f0f]"
                @click="deletePlaylist(playlist.id)"
              >

                <span class="material-symbols-outlined text-[20px]">
                  delete
                </span>

                削除

              </button>

            </div>

            <!-- videos grid -->
            <div
              v-if="playlist.videos.length"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8"
            >

              <RouterLink
                v-for="video in playlist.videos"
                :key="video.videoId"
                :to="`/watch/${video.videoId}`"
                class="group"
              >

                <!-- thumbnail -->
                <div
                  class="relative aspect-video overflow-hidden rounded-xl bg-[#f2f2f2]"
                >

                  <img
                    :src="video.thumbnail"
                    class="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  >

                  <!-- playlist overlay -->
                  <div
                    class="absolute top-0 right-0 w-[40%] h-full bg-black/75 flex flex-col items-center justify-center text-white transition-all duration-150 group-hover:bg-black/90"
                  >

                    <span
                      class="text-[18px] font-medium leading-none"
                    >
                      {{ playlist.videos.length }}
                    </span>

                    <span
                      class="material-symbols-outlined text-[22px] mt-1"
                    >
                      playlist_play
                    </span>

                  </div>

                  <!-- hover layer -->
                  <div
                    class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center"
                  >

                    <div
                      class="flex items-center gap-2 text-white text-[14px] font-medium"
                    >

                      <span class="material-symbols-outlined text-[20px]">
                        play_arrow
                      </span>

                      すべて表示

                    </div>

                  </div>

                </div>

                <!-- meta -->
                <div class="flex gap-3 mt-3">

                  <!-- fake avatar -->
                  <div
                    class="w-9 h-9 rounded-full bg-[#e5e5e5] flex-shrink-0"
                  />

                  <div class="flex flex-col min-w-0">

                    <div
                      class="text-[15px] font-medium leading-[22px] line-clamp-2 text-[#0f0f0f]"
                    >
                      {{ video.title }}
                    </div>

                    <div
                      class="text-[14px] text-[#606060] mt-1 truncate hover:text-[#0f0f0f] transition-colors"
                    >
                      {{ video.author }}
                    </div>

                  </div>

                </div>

              </RouterLink>

            </div>

            <!-- empty playlist -->
            <div
              v-else
              class="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] py-16 flex flex-col items-center justify-center"
            >

              <div
                class="w-20 h-20 rounded-full bg-[#f1f1f1] flex items-center justify-center"
              >

                <span
                  class="material-symbols-outlined text-[42px] text-[#909090]"
                >
                  playlist_play
                </span>

              </div>

              <div
                class="mt-5 text-[20px] font-medium text-[#0f0f0f]"
              >
                動画がありません
              </div>

              <div
                class="text-[#606060] text-[14px] mt-2"
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
            class="w-32 h-32 rounded-full bg-[#f2f2f2] flex items-center justify-center"
          >

            <span
              class="material-symbols-outlined text-[56px] text-[#606060]"
            >
              video_library
            </span>

          </div>

          <div
            class="mt-8 text-[30px] font-bold tracking-[-0.5px]"
          >
            プレイリストがありません
          </div>

          <div
            class="text-[#606060] mt-3 text-center text-[15px] leading-[24px]"
          >
            お気に入りの動画を保存して<br>
            YouTube のようにプレイリストを整理できます
          </div>

          <button
            class="mt-8 h-10 px-5 rounded-full bg-[#0f0f0f] hover:bg-black active:bg-[#202020] transition-all duration-150 text-white text-[14px] font-medium flex items-center gap-2"
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
