import request from "./request";

/**
 * 用户相关的 api 都放在这里
 */

export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "GET",
  });
}

export function userIsExist(loginId) {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET",
  });
}

export function userRegister(data) {
  return request({
    url: "/api/user",
    method: "POST",
    data,
  });
}

export function userLogin(data) {
  return request({
    url: "/api/user/login",
    method: "POST",
    data,
  });
}

export function getUserById(id) {
  return request({
    url: `/api/user/${id}`,
    method: "GET",
  });
}

export function getInfo() {
  return request({
    url: "/api/user/whoami",
    method: "GET",
  });
}
