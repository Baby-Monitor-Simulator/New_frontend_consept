<script setup></script>

<template>
  <div class="home">
    <div class="hero">
      <h1>Welcome to Vue WebSocket App</h1>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 16px;
  font-weight: bold;
}

.subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.content {
  padding: 0 20px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 40px;
}

.card h2 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 32px;
}

.card p {
  color: #666;
  font-size: 18px;
  margin-bottom: 24px;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.btn:hover {
  background-color: #359268;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 24px;
}

.feature p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .card {
    padding: 24px;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
