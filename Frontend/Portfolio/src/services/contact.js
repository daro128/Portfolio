import { apiPost } from "./apiClient.js";

export const sendMessage = ({ name, email, message }) =>
  apiPost("/contact", { name, email, message });

export const sendCommentNotification = ({ name, message }) =>
  apiPost("/comment", { name, message });
