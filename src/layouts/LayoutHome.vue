<template>
  <div class="layout-home">
    <div class="home-container">
      <div class="home-header">
        <MacIconButton></MacIconButton>
      </div>
      <div class="home-main">
        <div class="menu-container">
          <div class="g-menu second-level">
            <template v-for="item in tools" :key="item.value">
              <div v-if="item.space" class="g-menu-item is-space"></div>
              <div
                v-else
                class="g-menu-item"
                :class="{ 'is-active': item.value === route.name }"
                @click="onRadioClick(item)"
              >
                <span class="icon">{{ item.icon }}</span>
                <span class="label">{{ item.label }}</span>
              </div>
            </template>
          </div>
        </div>
        <div class="tool-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <GithubBadge url="https://github.com/gausstool/json-tools"></GithubBadge>
</template>

<script lang="ts" setup>
import GithubBadge from '@/components/github-badge.vue';
import { ITool, tools } from '@/config';
import { useRoute, useRouter } from 'vue-router';
import { useToolsStore } from '@/store';
import { EnumTools } from '@/types';
import MacIconButton from '@/components/mac-icon-button.vue';

const { addRecentTool } = useToolsStore();
const route = useRoute();
const router = useRouter();
const onRadioClick = async (tool: ITool) => {
  if (tool.value === route.name) {
    return;
  }
  if (tool.order !== 0) {
    addRecentTool(tool.value as EnumTools);
  }
  router.push({ name: tool.value });
};
</script>

<style lang="scss">
.layout-home {
  width: 100%;
  height: 100%;
  position: relative;

  .layout-console {
    height: 100%;
  }

  .layout-no-console {
    height: 100%;
  }
}

@media screen and (min-width: 960px) {
  .layout-home {
    width: 800px;
    height: 450px;
  }
}

@media screen and (min-width: 1024px) {
  .layout-home {
    width: 960px;
    height: 480px;
  }
}

@media screen and (min-width: 1280px) {
  .layout-home {
    width: 1200px;
    height: 600px;
  }
}

@media screen and (min-width: 1366px) {
  .layout-home {
    width: 1280px;
    height: 640px;
  }
}

@media screen and (min-width: 1536px) {
  .layout-home {
    width: 1366px;
    height: 678px;
  }
}

@media screen and (min-width: 1600px) {
  .layout-home {
    width: 1440px;
    height: 720px;
  }
}

@media screen and (min-width: 1920px) {
  .layout-home {
    width: 1600px;
    height: 800px;
  }
}

@media screen and (min-width: 2560px) {
  .layout-home {
    width: 1920px;
    height: 960px;
  }
}
</style>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  background-color: #272822;
  overflow: hidden;
  box-shadow: 1px 1px 10px #1e1e1e;
  overflow: hidden;
  border-radius: 8px;
}

.home-header {
  font-family: monospace;
  padding: 0 12px;
  line-height: 30px;
  height: 30px;
  color: #cccccc;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
}

.home-main {
  flex: 1;
  height: calc(100% - 30px);
  display: flex;
}

.menu-container {
  width: 150px;
  height: 100%;
  .icon {
    display: inline-block;
    font-size: 14px;
    width: 24px;
  }
}
.tool-container {
  height: 100%;
  width: calc(100% - 150px);
}
</style>
