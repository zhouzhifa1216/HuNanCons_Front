/**
 * API配置文件
 */

// API基础URL
export const API_BASE_URL = 'http://192.168.10.25:7999';

// 存储在localStorage中的键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  TOKEN_TYPE: 'token_type',
  IS_AUTHENTICATED: 'isAuthenticated'
};

/**
 * 获取存储的token
 */
export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

/**
 * 获取token类型
 */
export function getTokenType() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN_TYPE) || 'bearer';
}

/**
 * 检查用户是否已认证
 */
export function isAuthenticated() {
  const token = getToken();
  return token !== null && localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
}

/**
 * 保存登录信息
 */
export function saveAuth(data) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.access_token);
  localStorage.setItem(STORAGE_KEYS.TOKEN_TYPE, data.token_type);
  localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
}

/**
 * 清除登录信息
 */
export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
  localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
}

/**
 * 通用API请求函数
 * @param {string} url - 请求URL，不包含基础URL部分
 * @param {Object} options - fetch选项
 * @param {boolean} [authenticated=true] - 是否需要认证头
 * @returns {Promise} 返回Promise
 */
export async function request(url, options = {}, authenticated = true) {
  const headers = options.headers || {};
  
  // 如果需要认证且有token，添加Authorization头
  if (authenticated && getToken()) {
    headers.Authorization = `${getTokenType()} ${getToken()}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...headers
    }
  };
  
  // 发送请求
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    // 处理响应
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: '请求失败' }));
      throw new Error(errorData.detail || `请求失败，状态码: ${response.status}`);
    }
    
    // 如果是204状态码（No Content），直接返回null
    if (response.status === 204) {
      return null;
    }
    
    // 否则返回JSON数据
    return await response.json();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
} 