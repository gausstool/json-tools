<template>
  <div class="app-container" :class="{ screenshot: isScreenshot }">
    <div class="app-home">
      <div class="app-header">
        <span class="app-icon-button" @click="toggle">
          <i class="icon red"></i>
          <i class="icon yellow"></i>
          <i class="icon green"></i>
        </span>
      </div>
      <div class="app-main">
        <div class="menu-container">
          <div class="g-menu second-level">
            <template v-for="item in tools" :key="item.value">
              <div v-if="item.space" class="g-menu-item is-space"></div>
              <div
                v-else
                class="g-menu-item"
                :class="{ 'is-active': item.value === route.name }"
                @click="onRadioClick(item.value)"
              >
                <span class="label">{{ item.label }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="tool-container">
          <router-view></router-view>
        </div>
      </div>
      <div id="console-container"></div>
    </div>
  </div>
  <GithubBadge url="https://github.com/gausstool/json-tools"></GithubBadge>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { tools } from './config';
import editorConsoleInstance from './editor/console';
import GithubBadge from './components/github-badge.vue';

const isScreenshot = ref(false);
const toggle = () => {
  isScreenshot.value = !isScreenshot.value;
};
onMounted(() => {
  const $parent = document.getElementById('console-container') as HTMLElement;
  editorConsoleInstance.mount($parent);
});

const route = useRoute();
const router = useRouter();
const onRadioClick = async (value: string) => {
  router.push({ name: value });
};
</script>
