<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  formats: any[]
}>()

const emit = defineEmits<{
  close: []
}>()

function closeModal() {
  emit('close')
}

// MP4フォーマットのフィルタリング
const mp4Formats = computed(() => {
  if (!props.formats) return []
  return props.formats.filter(format => {
    const type = (format.mimeType || format.type || '').toLowerCase()
    return type.includes('mp4')
  })
})

// WebMフォーマットのフィルタリング
const webmFormats = computed(() => {
  if (!props.formats) return []
  return props.formats.filter(format => {
    const type = (format.mimeType || format.type || '').toLowerCase()
    return type.includes('webm')
  })
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="closeModal"
      />

      <div
        class="relative w-full max-w-2xl mx-4 bg-white rounded-none overflow-hidden shadow-2xl"
      >

        <div class="px-6 h-16 border-b border-zinc-200 flex items-center justify-between">
          <div class="text-lg font-bold">
            Download Formats
          </div>

          <button
            class="w-10 h-10 rounded-full hover:bg-zinc-100 transition"
            @click="closeModal"
          >
            ✕
          </button>
        </div>

        <div class="p-6 max-h-[70vh] overflow-y-auto space-y-6">

          <div v-if="mp4Formats.length">
            <div class="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
              MP4 Formats
            </div>
            <div class="space-y-3">
              <a
                v-for="format in mp4Formats"
                :key="format.itag"
                :href="format.url"
                target="_blank"
                class="flex items-center justify-between p-4 rounded-none border border-zinc-200 hover:bg-zinc-50 transition"
              >
                <div>
                  <div class="font-semibold">
                    {{
                      format.qualityLabel ||
                      format.audioQuality ||
                      'Unknown Quality'
                    }}
                  </div>
                </div>

                <div
                  class="bg-black text-white px-4 h-10 rounded-none flex items-center justify-center text-sm font-semibold"
                >
                  Download
                </div>
              </a>
            </div>
          </div>

          <div v-if="webmFormats.length">
            <div class="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
              WebM Formats
            </div>
            <div class="space-y-3">
              <a
                v-for="format in webmFormats"
                :key="format.itag"
                :href="format.url"
                target="_blank"
                class="flex items-center justify-between p-4 rounded-none border border-zinc-200 hover:bg-zinc-50 transition"
              >
                <div>
                  <div class="font-semibold">
                    {{
                      format.qualityLabel ||
                      format.audioQuality ||
                      'Unknown Quality'
                    }}
                  </div>
                </div>

                <div
                  class="bg-black text-white px-4 h-10 rounded-none flex items-center justify-center text-sm font-semibold"
                >
                  Download
                </div>
              </a>
            </div>
          </div>

          <div
            v-if="!mp4Formats.length && !webmFormats.length"
            class="text-center text-zinc-500 py-16"
          >
            No downloadable formats found.
          </div>

        </div>

      </div>
    </div>
  </Teleport>
</template>
