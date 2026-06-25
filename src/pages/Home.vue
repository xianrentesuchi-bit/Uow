<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../components/layout/Layout.vue'
import VideoGrid from '../components/video/VideoGrid.vue'

const videos = ref<any[]>([])
const loading = ref(true)
const router = useRouter()

const tags = [
  'すべて',
  'ゲーム',
  '音楽',
  'ライブ',
  'プログラミング',
  'アニメ',
  '料理',
  'ガジェット',
  'ニュース',
  'ペット',
  'フィットネス',
  'DIY'
]
const activeTag = ref('すべて')

const selectTag = (tag: string) => {
  activeTag.value = tag
  if (tag === 'すべて') {
    return
  }
  router.push(`/results?search_query=${encodeURIComponent(tag)}`)
}

onMounted(async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/ajgpw/youtubedata/refs/heads/main/trend-base64.json'
    )

    const data = await response.json()

    videos.value = data.trending.map((video: any) => ({
      videoId: video.id,

      title: video.title,

      author: video.channel,

      authorId: video.channelId,

      viewCount: video.viewCount,

      likeCount: video.likeCount,

      commentCount: video.commentCount,

      published: video.publishedAt,

      lengthSeconds: video.duration,

      videoThumbnails: [
        {
          url: video.thumbnails.standard.url,
          width: video.thumbnails.standard.width,
          height: video.thumbnails.standard.height,
        },
      ],

      authorThumbnails: [
        {
          url: video.channelIcon,
          width: 68,
          height: 68,
        },
      ],
    }))
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <Layout>
    <div class="main-content">
      <div class="tags-container">
        <div class="tags-inner">
          <button
            v-for="tag in tags"
            :key="tag"
            class="tag-item"
            :class="{ 'is-active': activeTag === tag }"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="skeleton-grid">
        <div v-for="i in 12" :key="i" class="skeleton-card">
          <div class="skeleton-thumbnail animate-pulse"></div>
          <div class="skeleton-details">
            <div class="skeleton-avatar animate-pulse"></div>
            <div class="skeleton-info">
              <div class="skeleton-line title animate-pulse"></div>
              <div class="skeleton-line title short animate-pulse"></div>
              <div class="skeleton-line meta animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <VideoGrid
        v-else
        :videos="videos"
      />
    </div>
  </Layout>
</template>

<style scoped>
.main-content {
  width: 100%;
  background-color: #fff;
}

.tags-container {
  position: sticky;
  top: 56px;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 12px 24px;
  z-index: 10;
  overflow: hidden;
}

.tags-inner {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}

.tags-inner::-webkit-scrollbar {
  display: none;
}

.tag-item {
  height: 32px;
  padding: 0 12px;
  background-color: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 8px;
  color: #0f0f0f;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.tag-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.tag-item.is-active {
  background-color: #0f0f0f;
  color: #fff;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px 16px;
  padding: 24px;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.skeleton-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #f2f2f2;
  border-radius: 12px;
  margin-bottom: 12px;
}

.skeleton-details {
  display: flex;
  gap: 12px;
}

.skeleton-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f2f2f2;
  flex-shrink: 0;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-line {
  background-color: #f2f2f2;
  border-radius: 4px;
}

.skeleton-line.title {
  height: 16px;
  width: 90%;
}

.skeleton-line.title.short {
  width: 60%;
}

.skeleton-line.meta {
  height: 12px;
  width: 40%;
  margin-top: 4px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
