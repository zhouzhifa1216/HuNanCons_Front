/**
 * API模块入口文件
 * 导出所有API和配置
 */

// 导出配置和公共函数
export {
  API_BASE_URL,
  getToken,
  getTokenType,
  isAuthenticated,
  saveAuth,
  clearAuth,
  request
} from './config';

// 导出认证API
export * as auth from './auth';

// 导出用户API
export * as users from './users'; 