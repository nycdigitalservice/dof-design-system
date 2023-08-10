export default n => n.every((el, i) => {
  return n[i&1].nodeName == el.nodeName;
})
