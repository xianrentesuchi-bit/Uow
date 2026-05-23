import axios, { AxiosError } from 'axios'

// 修正されたVercel EdgeプロキシサーバーのベースURL
const instances = [
  'https://uow-bakend12.vercel.app' // URL末尾の重複スラッシュを防ぐため、/ を削除しました
]

async function request(path: string) {
  // パスの先頭にスラッシュがない場合は自動で補完する安全策
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  for (const instance of instances) {
    try {
      // サーバーレス・Edge環境の応答速度を活かすため、5秒のタイムアウトを設定
      const res = await axios.get(`${instance}${cleanPath}`, {
        timeout: 5000
      })
      return res.data
    } catch (e) {
      const error = e as AxiosError
      console.warn(`Instance failed: ${instance}${cleanPath} | Reason: ${error.message}`)
    }
  }

  throw new Error('All instances failed to respond.')
}

// ==========================================
// 既存のAPI関数（しっかり取得できるように調整）
// ==========================================

export async function searchVideos(query: string) {
  return request(`/api/v1/search?q=${encodeURIComponent(query)}&type=video`)
}

export async function trendingVideos() {
  return request('/api/v1/trending')
}

export async function getVideo(id: string) {
  return request(`/api/v1/videos/${id}`)
}

export async function getComments(id: string) {
  return request(`/api/v1/comments/${id}`)
}

export async function getPopularVideos() {
  return request('/api/v1/popular')
}

export async function getChannel(channelId: string) {
  return request(`/api/v1/channels/${channelId}`)
}

export async function getChannelVideos(channelId: string) {
  return request(`/api/v1/channels/videos/${channelId}`)
}

export async function getPlaylist(playlistId: string) {
  return request(`/api/v1/playlists/${playlistId}`)
}
