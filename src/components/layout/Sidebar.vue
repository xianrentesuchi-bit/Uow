<template>    
  <aside class="sidebar" :class="sidebarClass">    
    <nav class="sidebar-nav">    
      <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="sidebar-item">    
        <span class="material-symbols-outlined">{{ item.icon }}</span>    
    
        <span class="sidebar-label">    
          {{ item.label }}    
        </span>    
      </router-link>    
    
      <button type="button" class="sidebar-item sidebar-button" @click="$emit('open-settings')">    
        <span class="material-symbols-outlined">settings</span>    
    
        <span v-if="!isCompact" class="sidebar-label">    
          設定    
        </span>    
      </button>    
    </nav>    
  </aside>    
</template>    
    
<script setup>    
import { computed } from 'vue';    
    
const props = defineProps({    
  isOpen: { type: Boolean, default: true },    
  isCompact: { type: Boolean, default: false }    
});    
    
defineEmits(['open-settings']);    
    
const menuItems = [    
  { path: '/', label: 'ホーム', icon: 'home' },    
  { path: '/subscribers', label: '登録チャンネル', icon: 'subscriptions' },    
  { path: '/playlist', label: '再生リスト', icon: 'playlist_play' },    
  { path: '/history', label: '履歴', icon: 'history' }    
];    
    
const sidebarClass = computed(() => ({    
  'is-compact': props.isCompact,    
  'is-hidden': !props.isOpen    
}));    
</script>    
    
<style scoped>    
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0');    
    
.sidebar {    
  position: fixed;    
  top: 56px;    
  left: 0;    
  width: 240px;    
  height: calc(100vh - 56px);    
  background: #fff;    
  transition: width 0.15s ease-in-out;    
  overflow-y: auto;    
  z-index: 100;    
  user-select: none;    
}    
    
.sidebar.is-compact {    
  width: 72px;    
}    
    
.sidebar.is-hidden {    
  transform: translateX(-100%);    
}    
    
.sidebar-nav {    
  display: flex;    
  flex-direction: column;    
  padding: 12px 0;    
}    
    
.sidebar-item {    
  display: flex;    
  align-items: center;    
  height: 40px;    
  margin: 0 12px 4px 12px;    
  padding: 0 12px;    
  border-radius: 10px;    
  text-decoration: none;    
  color: #0f0f0f;    
  gap: 24px;    
  font-size: 14px;    
  transition: background-color 0.1s ease;    
}    
    
.sidebar-button {    
  background: none;    
  border: none;    
  cursor: pointer;    
  width: calc(100% - 24px);    
  text-align: left;    
}    
    
.is-compact .sidebar-item {    
  flex-direction: column;    
  justify-content: center;    
  height: 74px;    
  margin: 0 4px 4px 4px;    
  padding: 0;    
  border-radius: 10px;    
  gap: 6px;    
}    
    
.is-compact .sidebar-button {    
  width: calc(100% - 8px);    
  text-align: center;    
}    
    
.is-compact .material-symbols-outlined {    
  font-size: 24px;    
}    
    
.is-compact .sidebar-label {    
  font-size: 10px;    
  line-height: 14px;    
  width: 100%;    
  max-width: 64px;    
  text-align: center;    
  overflow: hidden;    
  white-space: nowrap;    
  text-overflow: ellipsis;    
}    
    
.sidebar-item:hover {    
  background: #f2f2f2;    
}    
    
.sidebar-item.router-link-active {    
  font-weight: 500;    
  color: #0f0f0f;    
  background: #f2f2f2;    
}    
    
.sidebar-item.router-link-active .material-symbols-outlined {    
  font-variation-settings: 'FILL' 1 !important;    
}    
    
.material-symbols-outlined {    
  font-size: 24px;    
  font-variation-settings: 'FILL' 0;    
  transition: font-variation-settings 0.1s ease;    
}    
</style>
