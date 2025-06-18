/**
 * 认证API模块
 * 对应后端 /api/v1/auth 端点
 */
import { request, saveAuth, clearAuth } from './config';

/**
 * 用户登录
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 * @returns {Promise} 返回Promise，包含token信息
 */
export async function login(email, password) {
  const formData = new URLSearchParams();
  formData.append('username', email); // 注意：参数名是username，但需要传入邮箱
  formData.append('password', password);
  
  const data = await request('/api/v1/system/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  }, false); // 登录不需要认证
  
  return data;
}

/**
 * 用户登出
 */
export function logout() {
  clearAuth();
  // 如果后端有登出接口，可以在这里调用
} 