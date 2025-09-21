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
            <div
              class="g-menu-item"
              tabindex="0"
              :class="{ 'is-active': item.value === route.name }"
              v-for="item in tools"
              :key="item.value"
              @click="onRadioClick(item.value)"
            >
              <span class="label">{{ item.label }}</span>
            </div>
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tools } from "./config";
import editorConsoleInstance from "./editor/console";
import GithubBadge from "./components/github-badge.vue";

const isScreenshot = ref(false);
const toggle = () => {
  isScreenshot.value = !isScreenshot.value;
};
onMounted(() => {
  const $parent = document.getElementById("console-container") as HTMLElement;
  editorConsoleInstance.mount($parent);
});

const route = useRoute();
const router = useRouter();
const onRadioClick = async (value: string) => {
  router.push({ name: value });
};
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
}

.app-home {
  width: 100%;
  height: 100%;
  background-color: #272822;
  overflow: hidden;
  box-shadow: 1px 1px 10px #1e1e1e;
  overflow: hidden;
}

.screenshot .app-home {
  box-shadow: 1px 1px 10px #1e1e1e;
}

.app-header {
  font-family: monospace;
  padding: 0 12px;
  line-height: 30px;
  height: 30px;
  color: #cccccc;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
}

.app-header .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.app-icon-button {
  display: flex;
  align-items: center;
}

.app-header .icon.red {
  background-color: #ff5f56;
}

.app-header .icon.yellow {
  background-color: #ffbd2e;
}

.app-header .icon.green {
  background-color: #27c93f;
}

.app-main {
  flex: 1;
  height: calc(100% - 30px);
  display: flex;
}

.menu-container {
  width: 150px;
  height: 100%;
}

.tool-container {
  height: 100%;
  width: calc(100% - 150px);
}

.menu-container .icon {
  display: inline-block;
  font-size: 14px;
  width: 24px;
}

#console-container {
  position: absolute;
  z-index: 9999;
  left: 0px;
  bottom: 0px;
  right: 0px;
  height: var(--terminal-height);
  background-color: #1e1e1e;
  border-top: 1px solid #393939;
  overflow: hidden;
}

:deep #console-container .container {
  width: 100%;
  height: 100%;
}

.screenshot .menu-container,
.screenshot #console-container {
  display: none;
}

.screenshot .tool-container {
  width: 100%;
}
</style>
