<template>
  <div class="app-container" :class="{ screenshot: isScreenshot }">
    <div class="app-home">
      <div class="app-header">
        <span class="app-icon-button" @click="toggle">
          <i class="icon red"></i>
          <i class="icon yellow"></i>
          <i class="icon green"></i>
        </span>
        <span v-if="!isScreenshot" class="app-tips-text">--ignore-certificate-errors --force-renderer-accessibility</span>
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tools } from "./config";
import editorConsoleInstance from "./editor/console";

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
  padding: 8px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
}

@media screen and (min-width: 960px) {
  .app-container {
    width: 800px;
    height: 450px;
  }
}

@media screen and (min-width: 1024px) {
  .app-container {
    width: 960px;
    height: 480px;
  }
}

@media screen and (min-width: 1280px) {
  .app-container {
    width: 1200px;
    height: 600px;
  }
}

@media screen and (min-width: 1366px) {
  .app-container {
    width: 1280px;
    height: 640px;
  }
}

@media screen and (min-width: 1536px) {
  .app-container {
    width: 1366px;
    height: 678px;
  }
}

@media screen and (min-width: 1600px) {
  .app-container {
    width: 1440px;
    height: 720px;
  }
}

@media screen and (min-width: 1920px) {
  .app-container {
    width: 1600px;
    height: 800px;
  }
}

.app-home {
  width: 100%;
  height: 100%;
  background-color: #272822;
  border-radius: 8px;
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
  left: 8px;
  bottom: 8px;
  right: 8px;
  height: var(--terminal-height);
  background-color: #1e1e1e;
  border-top: 1px solid #393939;
  border-radius: 0 0 8px 8px;
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
