<template>
  <header class="navbar">
    <a
      href="/"
      class="home-link"
      style="cursor: pointer"
      >
      <span class="site-name">Gauss Zhou</span></a
    >
  </header>
</template>

<style>
.navbar {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  color: #2c3e50;
  z-index: 20;
  right: 0;
  height: 3.6rem;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
}

.site-name {
  -webkit-font-smoothing: antialiased;
  line-height: 2.2rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
}
</style>
