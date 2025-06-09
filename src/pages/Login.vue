<template>
  <div class="login-page">
    <!-- 添加背景图案 -->
    <div class="background-pattern"></div>
    
    <div class="login-container">
      <div class="login-card-wrapper">
        <card class="modern-card">
          <template slot="header">
            <div class="card-header-content">
              <h2 class="card-title">欢迎回来</h2>
              <p class="card-subtitle">登录您的账户继续访问系统</p>
            </div>
          </template>

          <div class="card-body">
            <form @submit.prevent="handleLogin" class="login-form">
              <!-- 邮箱输入 -->
              <div class="form-group">
                <label class="form-label">邮箱</label>
                <div class="modern-input-group">
                  <div class="input-icon">
                    <i class="ti-email"></i>
                  </div>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="请输入您的邮箱地址"
                    class="modern-input"
                    required
                    autocomplete="email"
                  />
                  <div class="input-focus-effect"></div>
                </div>
              </div>

              <!-- 密码输入 -->
              <div class="form-group">
                <div class="password-header">
                  <label class="form-label">密码</label>
                  <a href="#" class="forgot-link">忘记密码?</a>
                </div>
                <div class="modern-input-group">
                  <div class="input-icon">
                    <i class="ti-lock"></i>
                  </div>
                  <input
                    v-model="password"
                    type="password"
                    placeholder="请输入您的密码"
                    class="modern-input"
                    required
                    autocomplete="current-password"
                  />
                  <div class="input-focus-effect"></div>
                </div>
              </div>

              <div class="form-actions">
                <p-button
                  native-type="submit"
                  type="primary"
                  class="modern-button"
                  :disabled="isLoading"
                  round
                >
                  <span v-if="isLoading" class="button-content">
                    <i class="ti-reload spinning-icon"></i>
                    登录中...
                  </span>
                  <span v-else class="button-content">
                    登录
                    <i class="ti-arrow-right arrow-icon"></i>
                  </span>
                </p-button>
              </div>
            </form>
          </div>

          <div slot="footer" class="card-footer">
            <div class="footer-links">
              <div class="register-link">
                还没有账号? <a href="#" class="modern-link">立即注册</a>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import Card from "../components/Cards/Card.vue";
import { Button as PButton } from "../components/";
// 引入API
import { auth, saveAuth } from "../api";

export default {
  name: "Login",
  components: {
    Card,
    PButton,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;

      try {
        // 使用API登录
        const data = await auth.login(this.email, this.password);

        // 保存认证信息
        saveAuth(data);

        // 显示登录成功通知
        this.$notify({
          message: "登录成功！欢迎回来。",
          icon: "ti-check",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });

        // 如果有重定向信息，登录后导航到用户之前尝试访问的页面
        const redirectPath = this.$route.query.redirect || "/dashboard";
        this.$router.push(redirectPath);
      } catch (error) {
        console.error("登录失败:", error.message);
        
        // 显示登录错误通知
        this.$notify({
          message: `登录失败: ${error.message}`,
          icon: "ti-alert",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger"
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

/* 背景图案 */
.background-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(66, 185, 131, 0.15) 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.4;
}

.login-container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.login-card-wrapper {
  transform: translateY(0);
  transition: transform 0.6s ease, box-shadow 0.3s ease;
  animation: cardFadeIn 0.7s ease-out forwards;
  backdrop-filter: blur(5px);
}

.login-card-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modern-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08),
              0 1px 3px rgba(0, 0, 0, 0.05),
              0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-header-content {
  padding: 2rem 0 1rem;
  text-align: center;
}

.card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  animation: fadeIn 0.8s ease forwards;
}

.card-subtitle {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 0;
  animation: fadeIn 0.8s ease 0.2s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-body {
  padding: 1.5rem 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 0;
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
  animation-delay: 0.3s;
}

.form-label {
  display: block;
  margin-bottom: 0.6rem;
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  font-size: 0.85rem;
  color: #42b983;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #3aa876;
  text-decoration: none;
}

.modern-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 1;
  transition: color 0.2s;
}

.modern-input {
  width: 100%;
  padding: 14px 16px 14px 45px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  background-color: rgba(248, 250, 252, 0.7);
  color: #334155;
  outline: none;
}

.modern-input:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.15);
  transform: translateY(-1px);
}

.modern-input:focus + .input-focus-effect {
  opacity: 1;
}

.modern-input:focus ~ .input-icon {
  color: #42b983;
}

.input-focus-effect {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(66, 185, 131, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 0 0 12px 12px;
  pointer-events: none;
}

.form-actions {
  margin-top: 1.5rem;
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
  animation-delay: 0.5s;
}

.modern-button {
  width: 100% !important;
  padding: 12px 0;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%) !important;
  border: none !important;
  transition: transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.25);
  position: relative;
  overflow: hidden;
}

.modern-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s;
}

.modern-button:hover {
  box-shadow: 0 6px 16px rgba(66, 185, 131, 0.3);
  transform: translateY(-2px);
}

.modern-button:hover:before {
  left: 100%;
}

.modern-button:active {
  transform: translateY(0);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.arrow-icon {
  transition: transform 0.3s;
}

.modern-button:hover .arrow-icon {
  transform: translateX(4px);
}

.spinning-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.card-footer {
  background-color: rgba(248, 250, 252, 0.7);
  border-top: none;
  padding: 1.5rem;
  position: relative;
}

.card-footer:before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
  animation-delay: 0.8s;
}

.modern-link {
  color: #42b983;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.modern-link:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #42b983;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s;
}

.modern-link:hover {
  color: #3aa876;
}

.modern-link:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

@media (max-width: 576px) {
  .card-body {
    padding: 1.25rem 1.5rem;
  }
  
  .card-title {
    font-size: 1.75rem;
  }
  
  .modern-input {
    padding: 12px 16px 12px 45px;
  }
  
  .login-container {
    max-width: 95%;
  }
}
</style>
