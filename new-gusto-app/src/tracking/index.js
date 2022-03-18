export const pushToDataLayer = (data) => {
  (global.dataLayer || []).push({ ...data })
}
