<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import youtubeLogoBase64 from '../img/youtubelogo.txt?raw'
import Voice from './voice.vue'
import Account from './account.vue' // アカウントコンポーネントのインポート

const emit = defineEmits(['toggle-sidebar'])

const query = ref('')
const router = useRouter()

// 通知関連の状態
const notifications = ref<any[]>([])
const showNotifications = ref(false)
const notificationRef = ref<HTMLElement | null>(null)

// アカウント関連の状態
const showAccount = ref(false)
const accountRef = ref<HTMLElement | null>(null)

// 音声入力関連
const showVoice = ref(false)
const recognition = ref<any>(null)

// 未読件数の計算
const unreadCount = () => notifications.value.filter(n => n.unread).length

onMounted(async () => {
  // Google Fonts読み込み
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  // 通知データの取得
  try {
    const response = await fetch('https://raw.githubusercontent.com/senninsugar/senninservice/refs/heads/main/blog/uowblog.json')
    notifications.value = await response.json()
  } catch (e) {
    console.error('通知の取得に失敗しました', e)
  }

  // 外側クリックで閉じる処理
  document.addEventListener('click', handleClickOutside)

  // 音声認識初期化
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition

  if (SpeechRecognition) {
    recognition.value = new SpeechRecognition()
    recognition.value.lang = 'ja-JP'
    recognition.value.interimResults = true
    recognition.value.continuous = false

    recognition.value.onresult = (event: any) => {
      let transcript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }

      query.value = transcript
    }

    recognition.value.onend = () => {
      showVoice.value = false
    }

    recognition.value.onerror = () => {
      showVoice.value = false
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)

  if (recognition.value) {
    recognition.value.stop()
  }
})

function handleClickOutside(event: MouseEvent) {
  // 通知の外側クリック判定
  if (notificationRef.value && !notificationRef.value.contains(event.target as Node)) {
    showNotifications.value = false
  }
  // アカウントの外側クリック判定
  if (accountRef.value && !accountRef.value.contains(event.target as Node)) {
    showAccount.value = false
  }
}

function search() {
  if (!query.value.trim()) return
  router.push(`/results?search_query=${encodeURIComponent(query.value)}`)
}

function startVoiceSearch() {
  if (!recognition.value) {
    alert('このブラウザは音声入力に対応していません')
    return
  }

  showVoice.value = true
  recognition.value.start()
}
</script>

<template>
  <header class="h-14 flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-white text-black z-50 select-none">
      
    <div class="flex items-center">
      <button
        @click="emit('toggle-sidebar')"
        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 active:bg-zinc-200 transition-colors mr-1"
      >
        <span class="material-symbols-outlined text-[24px]">menu</span>
      </button>
        
      <a href="/" class="flex items-center cursor-pointer pl-3" style="height: 30px;">
        <img 
          :src="youtubeLogoBase64.trim().startsWith('data:') ? youtubeLogoBase64.trim() : 'data:image/jpeg;base64,' + youtubeLogoBase64.replace(/\s/g, '')" 
          alt="YouTube Logo" 
          class="h-full object-contain"
        />
      </a>
    </div>

    <div class="flex flex-1 max-w-[732px] items-center justify-center mx-4">
      <div class="flex flex-1 items-center">
        <div class="flex flex-1 bg-white border border-[#ccc] rounded-l-full pl-4 pr-1 h-10 items-center focus-within:border-[#1c62b9] focus-within:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] focus-within:ml-[-1px] focus-within:pl-[17px]">
          <input
            v-model="query"
            class="w-full bg-transparent outline-none text-base text-black placeholder-zinc-400 font-normal"
            placeholder="検索"
            @keyup.enter="search"
          />
          <button 
            v-if="query" 
            @click="query = ''" 
            class="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-black rounded-full hover:bg-zinc-100"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <button
          @click="search"
          class="w-[64px] h-10 bg-[#f8f8f8] border border-l-0 border-[#ccc] rounded-r-full flex items-center justify-center hover:bg-[#f0f0f0] hover:shadow-[0_1px_1px_rgba(0,0,0,0.05)] hover:border-[#c6c6c6] transition-colors"
          title="検索"
        >
          <span class="material-symbols-outlined text-[22px] text-zinc-800">search</span>
        </button>
      </div>

      <button
        @click="startVoiceSearch"
        class="w-10 h-10 bg-[#f8f8f8] hover:bg-[#e5e5e5] active:bg-zinc-200 rounded-full flex items-center justify-center transition-colors ml-3 flex-shrink-0"
        title="音声で検索"
      >
        <span class="material-symbols-outlined text-[24px] text-zinc-800">mic</span>
      </button>
    </div>

    <div class="flex items-center gap-2 pr-2">
      <div ref="notificationRef" class="relative flex items-center">
        <button 
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 relative transition-colors" 
          title="通知"
          @click="showNotifications = !showNotifications; showAccount = false"
        >
          <span class="material-symbols-outlined text-[24px]">notifications</span>
          <span 
            v-if="unreadCount() > 0" 
            class="absolute top-1.5 right-1.5 bg-red-600 text-[10px] font-medium text-white px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center border border-white"
          >
            {{ unreadCount() > 9 ? '9+' : unreadCount() }}
          </span>
        </button>

        <div 
          v-if="showNotifications"
          class="absolute top-12 right-0 w-80 bg-white border border-zinc-200 shadow-lg rounded-xl overflow-hidden z-50"
        >
          <div class="p-4 border-b border-zinc-100 font-bold">通知</div>
          <div class="max-h-[400px] overflow-y-auto">
            <div 
              v-for="(item, index) in notifications" 
              :key="index"
              class="p-4 hover:bg-zinc-50 cursor-pointer border-b border-zinc-50"
            >
              <p class="text-sm text-zinc-800">{{ item.title }}</p>
              <p class="text-xs text-zinc-500 mt-1">{{ item.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div ref="accountRef" class="relative flex items-center">
        <button 
          class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors" 
          title="アカウント"
          @click="showAccount = !showAccount; showNotifications = false"
        >
          <span class="material-symbols-outlined text-[24px]">account_circle</span>
        </button>

        <Account v-if="showAccount" />
      </div>
    </div>

    <Voice v-if="showVoice" />
  </header>
</template>

<style scoped>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
</style>
