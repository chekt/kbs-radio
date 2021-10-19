// FUNC - Open Quick Time
const { exec } = require('child_process')
let openQuickTime = function (src) {
  const cmd = `open -a "quicktime player" "${src}"`
  exec(cmd)
}

// GET - stream URL
const https = require('https')
const url = 'https://onair.kbs.co.kr/index.html?sname=onair&ch_type=radioList&stype=live&ch_code=25'
https.get(url, (resp) => {
  let data = ''
  resp.on('data', (chunk) => {
    data += chunk;
  })
  resp.on('end', () => {
    // PARSE
    // https://2fm.gscdn.kbs.co.kr/2fm_192_1.m3u8?Expires=1588210507&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cDovLzFmbS5nc2Nkbi5rYnMuY28ua3IvMWZtXzE5Ml8xLm0zdTgiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1ODgyMTA1MDd9fX1dfQ__&Signature=XYA3~Iz1iB8faqkG6K~ayQvGx-BpE7bJCbl0UKd1BDX6wBQ~IzFdGJm6G8UbK5D0xXFEkLbOHhMKXQ577hJFpFZwRxmR77QrJ6UOBt1zd2GCjzV0xIXs7TZeTcjRy8RJnFoX-B5d797VyoRbDFsC32c2lkDjfH6ugtOywcOAVJZ920C~ztbufPAIqA9PL5R3ljS1K3D46QCwjKAls5oK35qxMRsrS2pzEiH94ypWY8Z1DX0vhKz7ZhuPS8vI4GGGFlXQJEz8IO39pvVqTdNu2CzGcPLRq4z6zTMkc2Kt5Ap-841l5dh-KNV9wq9vgQfvTfouPVTvrxnj-cYQfiXeHg__&Key-Pair-Id=APKAICDSGT3Y7IXGJ3TA\"
    const sindex = data.indexOf('https://2fm.gscdn.kbs.co.kr/2fm_192_1.m3u8?')
    const eindex = sindex + data.slice(sindex, data.length).indexOf('\"') - 1
    const src = data.slice(sindex, eindex)
    openQuickTime(src)
  })

}).on("error", (err) => {
  console.log("Error: " + err.message)
})