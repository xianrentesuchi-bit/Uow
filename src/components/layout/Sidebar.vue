<template>
  <aside class="w-60 fixed top-14 left-0 bottom-0 overflow-y-auto bg-[#0f0f0f] border-r border-zinc-800">

    <nav class="p-2">
      <router-link
        to="/"
        class="block px-4 py-3 rounded-lg hover:bg-zinc-800"
      >
        Home
      </router-link>

      <router-link
        to="/shorts"
        class="block px-4 py-3 rounded-lg hover:bg-zinc-800"
      >
        Shorts
      </router-link>

      <div class="mt-6 border-t border-zinc-800 pt-4">
        <div class="px-4 py-2 text-zinc-400">
          Subscriptions
        </div>

        <div
          v-for="i in 10"
          :key="i"
          class="px-4 py-2 hover:bg-zinc-800 rounded-lg cursor-pointer"
        >
          Channel {{ i }}
        </div>
      </div>
    </nav>
  </aside>
</template>
