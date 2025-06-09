/**
 * 用户API模块
 * 对应后端 /api/v1/users 端点
 */
import { request } from './config';

/**
 * 获取当前用户信息
 * @returns {Promise} 返回Promise，包含用户信息
 */
export function getCurrentUser() {
  return request('/api/v1/users/me');
}

/**
 * 更新当前用户信息
 * @param {Object} userData - 用户数据
 * @returns {Promise} 返回Promise，包含更新后的用户信息
 */
export function updateCurrentUser(userData) {
  return request('/api/v1/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
}

/**
 * 获取用户列表（仅限超级管理员）
 * @param {number} skip - 跳过的记录数，默认0
 * @param {number} limit - 返回的记录数，默认100
 * @returns {Promise} 返回Promise，包含用户列表
 */
export function getUsers(skip = 0, limit = 100) {
  return request(`/api/v1/users?skip=${skip}&limit=${limit}`);
}

/**
 * 创建新用户（仅限超级管理员）
 * @param {Object} userData - 用户数据
 * @returns {Promise} 返回Promise，包含创建的用户信息
 */
export function createUser(userData) {
  return request('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
}

/**
 * 获取指定用户信息
 * @param {number} userId - 用户ID
 * @returns {Promise} 返回Promise，包含用户信息
 */
export function getUserById(userId) {
  return request(`/api/v1/users/${userId}`);
}

/**
 * 更新指定用户信息（仅限超级管理员）
 * @param {number} userId - 用户ID
 * @param {Object} userData - 用户数据
 * @returns {Promise} 返回Promise，包含更新后的用户信息
 */
export function updateUser(userId, userData) {
  return request(`/api/v1/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
}

/**
 * 删除指定用户（仅限超级管理员）
 * @param {number} userId - 用户ID
 * @returns {Promise} 返回Promise
 */
export function deleteUser(userId) {
  return request(`/api/v1/users/${userId}`, {
    method: 'DELETE'
  });
} 